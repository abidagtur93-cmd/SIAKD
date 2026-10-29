import { createBlobStore } from '../lib/blob-store.js';
import { createApplication } from '../lib/application.js';
import { BlobPreconditionFailedError, BlobNotFoundError } from '@vercel/blob';
export const testEnvironment = {
  NODE_ENV: 'test', SESSION_SECRET: 'test-session-secret-is-long-and-never-for-production',
  ADMIN_USERNAME: 'superadmin', ADMIN_PASSWORD: 'AdminPassword123!', ADMIN_EMAIL: 'admin@example.com',
  ADMIN_UNIQUE_CODE: 'AdminCode123!', BLOB_READ_WRITE_TOKEN: 'fake-test-credential', ALLOW_REGISTRATION: 'true'
};
export function fakeBlobSdk() {
  const records = new Map(); let sequence = 0; let failWrites = false; let writes = 0; let reads = 0;
  const sdk = {
    async head(key) {
      reads++;
      const record = records.get(key);
      if (!record) throw new BlobNotFoundError();
      return { pathname: key, etag: record.etag };
    },
    async get(key, options) {
      reads++; if (options.useCache !== false || options.access !== 'private') throw new Error('Expected consistent private read');
      const record = records.get(key); if (!record) return null;
      if (options.ifNoneMatch === record.etag) return {statusCode:304,stream:null,blob:{etag:record.etag}};
      // Snapshot before the asynchronous boundary reproduces separate-server read/write races.
      const snapshot = { ...record }; await new Promise(resolve=>setImmediate(resolve));
      return {statusCode:200,stream:new Response(snapshot.text).body,blob:{etag:snapshot.etag}};
    },
    async put(key, text, options) {
      if (failWrites) throw new Error('Simulated provider outage');
      if (options.access !== 'private') throw new Error('Expected private write');
      const current = records.get(key);
      if ((options.ifMatch && current?.etag !== options.ifMatch) || (!options.allowOverwrite && current)) {
        // Use the real SDK exception: its .name is "Error", not the class name.
        throw new BlobPreconditionFailedError();
      }
      const etag = '"revision-' + (++sequence) + '"'; records.set(key,{text,etag}); writes++;
      return {etag,pathname:key};
    },
    async del(key, options) {
      if (options.ifMatch && records.get(key)?.etag !== options.ifMatch) throw new BlobPreconditionFailedError();
      records.delete(key);
    }
  };
  return {sdk,records,setFailWrites:value=>{failWrites=value;},metrics:()=>({writes,reads})};
}
export function harness({env = {}, mailFailure = false} = {}) {
  const config={...testEnvironment,...env}, fake=fakeBlobSdk(), mailbox=[]; let clock=Date.now();
  const mail=async message=>{ if(mailFailure) { const {AppError}=await import('../lib/errors.js'); throw new AppError(502,'Pengiriman gagal','EMAIL_SEND_FAILED'); } mailbox.push({...message}); };
  const makeHandler=()=>createApplication({env:config,store:createBlobStore({sdk:fake.sdk,env:config}),sendMail:mail,now:()=>clock});
  let handler=makeHandler();
  function browser() {
    const jar={}; let csrf='';
    return {jar, get csrf(){return csrf;},
      async call(action, payload={}, method='POST', overrides={}) {
        const req={method,url:method==='GET'?'/api/cloud-sync?'+new URLSearchParams({action,...payload}):'/api/cloud-sync',
          body:method==='POST'?{action,...payload}:undefined, socket:{remoteAddress:'127.0.0.1'},
          headers:{host:'localhost:3000',origin:'http://localhost:3000','content-type':'application/json',
            cookie:Object.entries(jar).map(([k,v])=>k+'='+v).join('; '),...(csrf?{'x-csrf-token':csrf}:{}),...overrides}};
        const headers={}; const result={status:0,body:null,headers};
        const res={setHeader:(k,v)=>{headers[k]=v;},getHeader:k=>headers[k],status(status){result.status=status;return this;},json(body){result.body=structuredClone(body);return this;}};
        await handler(req,res);
        for(const value of headers['Set-Cookie']||[]) {const match=value.match(/^([^=]+)=([^;]*)/);if(match)jar[match[1]]=match[2];}
        if(result.body?.csrfToken)csrf=result.body.csrfToken;
        return result;
      }
    };
  }
  return {fake,mailbox,config,browser,makeHandler,advance:ms=>{clock+=ms;},newInstance:()=>{handler=makeHandler();},handler:()=>handler};
}
export async function register(h, client, username='koperasi_satu') {
  const result=await client.call('register_begin',{username,password:'BusinessPassword123!',adminEmail:username+'@example.com',fullName:'Admin '+username,coopName:'Koperasi '+username});
  if(result.status!==200)throw new Error(JSON.stringify(result));
  const sent=await client.call('send_otp'); if(sent.status!==200)throw new Error(JSON.stringify(sent));
  const verified=await client.call('verify_otp',{otp:h.mailbox.at(-1).otp}); if(verified.status!==200)throw new Error(JSON.stringify(verified));
  return (await client.call('session',{},'GET')).body;
}
