import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const PASSWORD='BusinessPassword123!';
async function mailboxCode(username) {
  let code;
  await expect.poll(async()=>{
    try { const messages=JSON.parse(await readFile('.dev-data/mailbox.json','utf8')); code=messages.filter(m=>m.to===username+'@example.com').at(-1)?.otp;return Boolean(code); }
    catch { return false; }
  }).toBe(true);
  return code;
}
async function finishOtp(page,username){
  await expect(page.locator('#otpSimulatedInboxBanner')).toBeVisible();
  const otp=await mailboxCode(username);
  await page.locator('#step2AdminOtpCodeInput').fill(otp);
  await page.locator('#adminUsahaOtpForm button[type="submit"]').click();
  await expect(page.locator('#authOverlay')).toBeHidden();
}
async function register(page,username){
  await page.goto('/');await expect(page.locator('#registerForm')).toBeHidden();await page.locator('#btnSwitchRegister').click();
  await page.locator('#regUsername').fill(username);await page.locator('#regPassword').fill(PASSWORD);
  await page.locator('#regAdminEmail').fill(username+'@example.com');await page.locator('#regFullName').fill('Admin Pengujian');
  await page.locator('#regCoopName').fill('Koperasi '+username);
  await page.locator('#registerForm button[type="submit"]').click();await finishOtp(page,username);
}
async function login(page,username){
  await page.goto('/');await page.locator('#loginUsername').fill(username);await page.locator('#loginPassword').fill(PASSWORD);
  await page.locator('#loginForm button[type="submit"]').click();await finishOtp(page,username);
}
async function openTab(page,name){
  const closed=(await page.locator('#navSidebarDrawer').getAttribute('class')).includes('-translate-x-full');
  if(closed)await page.locator('#btnOpenSidebarDrawer').click();
  await page.locator(`.tab-btn[data-tab="${name}"]`).first().click();
}
test('browser registration, two independent devices, offline draft, reload, employee access, and logout',async({browser})=>{
  test.setTimeout(90000);
  const username='ui_'+Date.now();const one=await browser.newContext(),two=await browser.newContext();
  const a=await one.newPage(),b=await two.newPage();const errors=[];
  for(const page of [a,b])page.on('pageerror',e=>{errors.push(e.message);console.error('Browser error:',e.message);});
  await register(a,username);await login(b,username);
  await openTab(a,'identitas');
  await a.locator('#idCoopName').fill('Koperasi Pengujian');
  await a.locator('#idCity').fill('Magelang');await a.locator('#identityForm button[type="submit"]').click();
  await expect(a.locator('#cloudSyncBadge')).toContainText('Tersinkron');
  await openTab(b,'identitas');await b.locator('#cloudSyncNow').click();await expect(b.locator('#idCity')).toHaveValue('Magelang');
  await two.setOffline(true);await b.locator('#idProvince').fill('Jawa Tengah');await b.locator('#identityForm button[type="submit"]').click();
  await expect(b.locator('#cloudSyncBadge')).not.toContainText('Tersinkron:');
  await two.setOffline(false);await b.locator('#cloudSyncNow').click();await expect(b.locator('#cloudSyncBadge')).toContainText('Tersinkron');
  await a.locator('#cloudSyncNow').click();await expect(a.locator('#idProvince')).toHaveValue('Jawa Tengah');
  await b.reload();await expect(b.locator('#authOverlay')).toBeHidden();await openTab(b,'identitas');await expect(b.locator('#idProvince')).toHaveValue('Jawa Tengah');
  await openTab(a,'karyawan');await a.locator('#btnOpenAddEmployeeModal').click();
  await a.locator('#empIdInput').fill('KAR-001');await a.locator('#empPasswordInput').fill('WorkerPassword123!');await a.locator('#empNameInput').fill('Rina Pengujian');
  await a.locator('#employeeMasterForm button[type="submit"]').click();await expect(a.locator('#cloudSyncBadge')).toContainText('Tersinkron');
  await openTab(a,'jurnal');
  await expect(a.locator('#journalFormLines tr').first().locator(':scope > td')).toHaveCount(8);
  await a.locator('#jDocNo').fill('001/UJI/2026');await a.locator('#jDesc').fill('Setoran modal pengujian');
  await a.locator('.jline-account-input').nth(0).fill('1.1.1.01 Kas Tunai');
  await a.locator('.jline-account-input').nth(1).fill('1.1.1.02 Kas di Bank BRI');
  await a.locator('.jline-debit').nth(0).fill('100000');await a.locator('.jline-kredit').nth(1).fill('100000');
  const savedJournal=a.waitForResponse(response=>response.url().endsWith('/api/cloud-sync')&&response.request().method()==='POST'&&response.request().postDataJSON()?.action==='workspace_save');
  await a.locator('#journalForm button[type="submit"]').click();expect((await savedJournal).status()).toBe(200);
  const ledger=await(await a.request.get('/api/cloud-sync?action=workspace')).json();expect(ledger.state.journals.length).toBe(2);
  const downloading=a.waitForEvent('download');await a.locator('#btnExportExcel').click();const file=await downloading;
  const exported='test-results/hasil-ekspor.xlsx';await file.saveAs(exported);
  const sandbox={Buffer,console};vm.runInNewContext(await readFile('public/vendor/xlsx.full.min.js','utf8'),sandbox);
  const book=sandbox.XLSX.read(await readFile(exported),{type:'buffer'});expect(book.SheetNames.length).toBeGreaterThanOrEqual(10);
  const worker=await browser.newContext(),w=await worker.newPage();w.on('pageerror',e=>{errors.push(e.message);console.error('Worker browser error:',e.message);});await w.goto('/');
  await w.locator('#btnSwitchKaryawanLogin').click();await w.locator('#karLoginCoopName').fill(username);await w.locator('#karLoginEmpUsername').fill('KAR-001');await w.locator('#karLoginEmpPassword').fill('WorkerPassword123!');
  await w.locator('#karyawanDirectLoginForm button[type="submit"]').click();await expect(w.locator('#authOverlay')).toBeHidden();
  await openTab(w,'karyawan');await expect(w.locator('#btnOpenAddEmployeeModal')).toBeHidden();
  await expect(w.locator('.tab-btn[data-tab="identitas"]')).toBeHidden();await expect(w.locator('#idCoopName')).toBeDisabled();
  await a.evaluate(()=>window.scrollTo(0,0));await a.screenshot({path:'test-results/desktop.png',fullPage:true});
  await a.locator('#btnLogoutUser').click();await expect(a.locator('#authOverlay')).toBeVisible();
  const response=await a.request.get('/api/cloud-sync?action=workspace');expect(response.status()).toBe(401);
  expect(errors).toEqual([]);
  await one.close();await two.close();await worker.close();
});
test('mobile login layout and hostile text are contained',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true});const page=await context.newPage();
  await page.goto('/');await expect(page.locator('#authOverlay')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  const safe=await page.evaluate(()=>{const el=document.createElement('div');el.innerHTML='<img src=x onerror="window.pwned=true"><script>window.pwned=true</script>';return !el.querySelector('script')&&!el.querySelector('[onerror]');});
  expect(safe).toBe(true);
  await page.screenshot({path:'test-results/mobile.png',fullPage:true});await context.close();
});
