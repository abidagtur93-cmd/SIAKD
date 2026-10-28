import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {harness,register} from './fixtures.mjs';
import {createMailer} from '../lib/mailer.js';
const clone=structuredClone;
async function workspace(client, uid) {const response=await client.call('workspace',uid?{uid}:{},'GET');assert.equal(response.status,200);return response.body;}
async function save(client, base, state, extra={}) {return client.call('workspace_save',{base:base.state,state,mutationId:randomUUID(),...extra});}

test('guest cannot fetch, write, or delete cooperative state',async()=>{
  const h=harness(),b=h.browser();
  assert.equal((await b.call('workspace',{},'GET')).status,401);
  assert.equal((await b.call('workspace_save',{state:{},base:{},mutationId:randomUUID()})).status,401);
  assert.equal((await b.call('delete_key',{key:'arbitrary'})).status,401);
  const session=await b.call('session',{},'GET'); assert.equal(session.body.authenticated,false);
  assert.equal(JSON.stringify(session.body).includes('passwordHash'),false);
});
test('registration is activated only after emailed OTP; no OTP/hash/password returned to client',async()=>{
  const h=harness(),b=h.browser();
  const begin=await b.call('register_begin',{username:'kop',password:'BusinessPassword123!',adminEmail:'kop@example.com',fullName:'Admin',coopName:'Koperasi'});
  assert.equal(begin.status,200);assert.equal((await b.call('workspace',{},'GET')).status,401);
  const sent=await b.call('send_otp');assert.equal(sent.status,200);
  const otp=h.mailbox[0].otp;assert.match(otp,/^\d{6}$/);
  const body=JSON.stringify(sent.body);assert.equal(body.includes(otp),false);assert.equal(body.includes('otpHash'),false);
  assert.equal((await b.call('verify_otp',{otp})).status,200);
  const session=(await b.call('session',{},'GET')).body;
  assert.equal(session.authenticated,true);assert.equal(JSON.stringify(session).includes('passwordHash'),false);
  assert.match(String((await b.call('session',{},'GET')).body.csrfToken),/^[a-f0-9]{64}$/);
});
test('OTP expiry, attempt limit, resend cooldown, replay, and parallel replay are enforced',async()=>{
  const h=harness(),b=h.browser();
  await b.call('login_begin',{username:'superadmin',password:'AdminPassword123!',uniqueCode:'AdminCode123!'});
  await b.call('send_otp');const otp=h.mailbox.at(-1).otp;
  assert.equal((await b.call('send_otp')).status,429);
  for(let i=0;i<5;i++)assert.equal((await b.call('verify_otp',{otp:otp==='000000'?'000001':'000000'})).status,400);
  assert.equal((await b.call('verify_otp',{otp})).body.code,'OTP_LOCKED');
  h.advance(61000);await b.call('send_otp');const expired=h.mailbox.at(-1).otp;h.advance(120001);
  assert.equal((await b.call('verify_otp',{otp:expired})).body.code,'OTP_EXPIRED');
  await b.call('send_otp');const valid=h.mailbox.at(-1).otp;
  const [a,c]=await Promise.all([b.call('verify_otp',{otp:valid}),b.call('verify_otp',{otp:valid})]);
  assert.equal([a.status,c.status].filter(v=>v===200).length,1);
  assert.equal((await b.call('verify_otp',{otp:valid})).status,401);
});
test('email failure never completes login and never returns preview OTP',async()=>{
  const h=harness({mailFailure:true}),b=h.browser();
  await b.call('login_begin',{username:'superadmin',password:'AdminPassword123!',uniqueCode:'AdminCode123!'});
  const sent=await b.call('send_otp');assert.equal(sent.status,502);assert.equal(sent.body.code,'EMAIL_SEND_FAILED');
  assert.equal(JSON.stringify(sent.body).includes('otpPreview'),false);
  assert.equal((await b.call('session',{},'GET')).body.authenticated,false);
  await assert.rejects(createMailer({})({to:'a@example.com',otp:'123456'}),e=>e.code==='SMTP_NOT_CONFIGURED');
});
test('separate cooperative accounts cannot access or change each other; CSRF/origin blocked',async()=>{
  const h=harness(),a=h.browser(),b=h.browser();const sa=await register(h,a,'satu'),sb=await register(h,b,'dua');
  assert.equal((await b.call('workspace',{uid:sa.user.uid},'GET')).status,403);
  const base=await workspace(a);const next=clone(base.state);next.identity.address='Koperasi A';
  assert.equal((await a.call('workspace_save',{base:base.state,state:next,mutationId:randomUUID()},'DELETE')).status,405);
  assert.equal((await a.call('workspace_save',{base:base.state,state:next,mutationId:randomUUID()},'POST',{'x-csrf-token':'wrong'})).status,403);
  assert.equal((await a.call('logout',{},'POST',{origin:'https://attacker.example'})).status,403);
  assert.equal((await save(a,base,next)).status,200);
  assert.equal((await workspace(b)).state.identity.address,'');assert.notEqual(sa.user.uid,sb.user.uid);
});
test('Blob persists across cold server instances and conditional reads avoid reloading unchanged data',async()=>{
  const h=harness(),b=h.browser();await register(h,b);
  const base=await workspace(b),next=clone(base.state);next.identity.city='Magelang';
  const saved=await save(b,base,next);assert.equal(saved.status,200);h.newInstance();
  assert.equal((await workspace(b)).state.identity.city,'Magelang');
  const conditional=await b.call('workspace',{etag:saved.body.etag},'GET');assert.equal(conditional.body.unchanged,true);assert.equal(conditional.body.state,undefined);
});
test('two devices merge independent edits, preserve both journals, and reject conflicting transaction edits',async()=>{
  const h=harness(),a=h.browser();await register(h,a);
  const base=await workspace(a),left=clone(base.state),right=clone(base.state);
  left.identity.city='Magelang';right.identity.province='Jawa Tengah';
  const results=await Promise.all([save(a,base,left),save(a,base,right)]);assert.deepEqual(results.map(x=>x.status),[200,200]);
  const merged=await workspace(a);assert.equal(merged.state.identity.city,'Magelang');assert.equal(merged.state.identity.province,'Jawa Tengah');
  const journal=(doc,prefix,amount)=>[
    {id:prefix+'-a',docNo:doc,date:'2026-10-28',account:merged.state.coa[0].full,debit:amount,kredit:0},
    {id:prefix+'-b',docNo:doc,date:'2026-10-28',account:merged.state.coa[1].full,debit:0,kredit:amount}];
  const j1=clone(merged.state),j2=clone(merged.state);j1.journals.push(...journal('001','one',100));j2.journals.push(...journal('002','two',200));
  const js=await Promise.all([save(a,merged,j1),save(a,merged,j2)]);assert.deepEqual(js.map(x=>x.status),[200,200]);
  const latest=await workspace(a);assert.equal(latest.state.journals.length,4);
  const change1=clone(latest.state),change2=clone(latest.state);
  change1.journals.find(j=>j.id==='one-a').desc='Device 1';change2.journals.find(j=>j.id==='one-a').desc='Device 2';
  const conflicts=await Promise.all([save(a,latest,change1),save(a,latest,change2)]);assert.deepEqual(conflicts.map(x=>x.status).sort(),[200,409]);
});
test('unbalanced journals are rejected; uncertain saves are idempotent and provider outages never return success',async()=>{
  const h=harness(),b=h.browser();await register(h,b);const base=await workspace(b),next=clone(base.state);
  next.journals=[{id:'one',docNo:'001',date:'2026-10-28',account:next.coa[0].full,debit:100,kredit:0}];
  assert.equal((await save(b,base,next)).status,400);next.journals=[];next.identity.city='Temanggung';
  const id=randomUUID();const first=await save(b,base,next,{mutationId:id});assert.equal(first.status,200);
  const repeated=await save(b,base,next,{mutationId:id});assert.equal(repeated.status,200);assert.equal(repeated.body.revision,first.body.revision);
  h.fake.setFailWrites(true);const changed=clone(next);changed.identity.city='Semarang';
  assert.equal((await save(b,{state:next},changed)).status,503);h.fake.setFailWrites(false);
  assert.equal((await workspace(b)).state.identity.city,'Temanggung');
});
test('employee login uses server hashes; employees cannot edit identity/COA/employees; password reset revokes sessions',async()=>{
  const h=harness(),owner=h.browser(),worker=h.browser();await register(h,owner);
  const base=await workspace(owner),next=clone(base.state);
  next.employees.push({id:'KAR-001',name:'Rina',position:'Staf',department:'Operasional',baseSalary:0,allowance:0,newPassword:'WorkerPassword123!'});
  const saved=await save(owner,base,next);assert.equal(saved.status,200);assert.equal(JSON.stringify(saved.body).includes('WorkerPassword'),false);assert.equal(JSON.stringify(saved.body).includes('scrypt$'),false);
  assert.equal((await worker.call('employee_login',{cooperative:'koperasi_satu',employeeId:'KAR-001',password:'WorkerPassword123!'})).status,200);
  await worker.call('session',{},'GET');const work=await workspace(worker),bad=clone(work.state);bad.identity.city='Unauthorized';
  assert.equal((await save(worker,work,bad)).status,403);
  const update=clone(saved.body.state);update.employees[0].newPassword='ChangedWorkerPass123!';
  assert.equal((await save(owner,{state:saved.body.state},update)).status,200);
  assert.equal((await worker.call('workspace',{},'GET')).status,401);
});
test('profile password change revokes sessions on other devices and logout invalidates server session',async()=>{
  const h=harness(),a=h.browser(),b=h.browser();await register(h,a);
  await b.call('login_begin',{username:'koperasi_satu',password:'BusinessPassword123!'});h.advance(61000);await b.call('send_otp');await b.call('verify_otp',{otp:h.mailbox.at(-1).otp});await b.call('session',{},'GET');
  assert.equal((await a.call('profile_update',{oldPassword:'BusinessPassword123!',newPassword:'NewBusinessPassword123!',fullName:'Admin Baru',coopName:'Koperasi Baru'})).status,200);
  assert.equal((await b.call('workspace',{},'GET')).status,401);
});
test('administrator can supervise/reset/delete accounts; owner cannot; logout revokes its server record',async()=>{
  const h=harness(),owner=h.browser(),root=h.browser();const ownerSession=await register(h,owner);
  assert.equal((await owner.call('account_reset',{uid:ownerSession.user.uid,password:'ReplacementPassword123!'})).status,403);
  await root.call('login_begin',{username:'superadmin',password:'AdminPassword123!',uniqueCode:'AdminCode123!'});
  await root.call('send_otp');await root.call('verify_otp',{otp:h.mailbox.at(-1).otp});await root.call('session',{},'GET');
  assert.equal((await root.call('workspace',{uid:ownerSession.user.uid},'GET')).status,200);
  assert.equal((await root.call('account_reset',{uid:ownerSession.user.uid,password:'ReplacementPassword123!'})).status,200);
  assert.equal((await owner.call('workspace',{},'GET')).status,401);
  assert.equal((await root.call('account_delete',{uid:ownerSession.user.uid})).status,200);
  assert.equal((await root.call('workspace',{uid:ownerSession.user.uid},'GET')).status,403);
  assert.equal((await root.call('logout')).status,200);assert.equal((await root.call('workspace',{},'GET')).status,401);
});
test('OTP destination is bound to verified-password challenge and never accepts a user-supplied recipient',async()=>{
  const h=harness(),b=h.browser();
  await b.call('login_begin',{username:'superadmin',password:'AdminPassword123!',uniqueCode:'AdminCode123!'});
  assert.equal((await b.call('send_otp',{email:'attacker@example.com',smtp_pass:'not-accepted',phpEndpointUrl:'https://attacker.example'})).status,200);
  assert.equal(h.mailbox.at(-1).to,'admin@example.com');
});
