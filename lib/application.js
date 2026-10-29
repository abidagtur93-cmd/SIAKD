import { randomInt, randomUUID } from 'node:crypto';
import { AppError, requireValue } from './errors.js';
import { createBlobStore } from './blob-store.js';
import { createMailer } from './mailer.js';
import { checkConfiguration, cookieNames, cookies, setCookie, checkRequestOrigin, clientRateKey,
  rateLimit, cleanAuth, randomToken, digest, hmac, safeEqual, hashPassword, verifyPassword,
  normalizeUsername, validEmail, text, publicUser } from './security.js';
import { freshState, workspaceDocument, sanitizeState, publicWorkspace, mergeState, validateLedger, equal } from './workspace.js';

const AUTH_KEY = 'private/auth';
const initialAuth = () => ({ schema: 5, revision: 0, accounts: {}, sessions: {}, challenges: {}, limits: {} });
const SESSION_MS = 8 * 3600000;
const OTP_MS = 120000;
const allowedUserList = (doc, account) => Object.values(doc.accounts).filter(a => account.isAdmin || a.uid === account.uid).map(publicUser);
const noWrite = value => ({ noWrite: true, value });

export function createApplication({ env = process.env, store = createBlobStore({ env }), sendMail = createMailer(env), now = () => Date.now() } = {}) {
  const names = cookieNames(env);
  let bootstrapPromise;
  async function authDocument() {
    checkConfiguration(env);
    const read = await store.read(AUTH_KEY);
    if (read.value) return read.value;
    // Bootstrap credentials never ship to the browser, and env changes do not overwrite an existing administrator.
    bootstrapPromise ||= (async () => {
      const username = normalizeUsername(env.ADMIN_USERNAME);
      requireValue(/^[a-z0-9_.-]{3,64}$/.test(username), 'Atur ADMIN_USERNAME (3–64 karakter) di Vercel.', 503, 'CONFIG_REQUIRED');
      const email = validEmail(env.ADMIN_EMAIL || '');
      requireValue(String(env.ADMIN_UNIQUE_CODE || '').length >= 8, 'Atur ADMIN_UNIQUE_CODE minimal 8 karakter.', 503, 'CONFIG_REQUIRED');
      requireValue(!/GANTI_|CHANGE_ME|ISI_DISINI/i.test(`${env.ADMIN_PASSWORD} ${env.ADMIN_UNIQUE_CODE}`),
        'Ganti contoh password/kode administrator dengan rahasia milik Anda.', 503, 'CONFIG_REQUIRED');
      const passwordHash = await hashPassword(env.ADMIN_PASSWORD || '');
      return { uid: 'USR-SYS-ADMIN', username, passwordHash, uniqueCodeHash: hmac(env.SESSION_SECRET, env.ADMIN_UNIQUE_CODE),
        fullName: 'Administrator Aplikasi', role: 'Administrator Aplikasi', coopName: 'KDMP Pusat',
        adminEmail: email, isAdmin: true, version: 1, createdAt: now() };
    })().catch(error => { bootstrapPromise = null; throw error; });
    const bootstrap = await bootstrapPromise;
    const saved = await store.mutate(AUTH_KEY, initialAuth(), doc => {
      if (Object.keys(doc.accounts).length) return noWrite();
      doc.accounts[bootstrap.uid] = bootstrap;
    });
    return saved.doc;
  }
  async function mutateAuth(fn) {
    await authDocument();
    return store.mutate(AUTH_KEY, initialAuth(), doc => { cleanAuth(doc, now()); return fn(doc); });
  }
  function makeSession(doc, account, employee = null) {
    const raw = randomToken(), id = digest(raw);
    doc.sessions[id] = { uid: account.uid, role: employee ? 'employee' : account.isAdmin ? 'sysadmin' : 'owner',
      employeeId: employee?.id || null, employeeVersion: employee?.version || null,
      accountVersion: account.version, keyVersion: digest(env.SESSION_SECRET).slice(0,16), expires: now() + SESSION_MS };
    return raw;
  }
  async function session(req, mandatory = true) {
    const doc = await authDocument();
    const raw = cookies(req)[names.session] || '';
    const record = doc.sessions[digest(raw)];
    const account = record && doc.accounts[record.uid];
    if (!record || !account || record.expires <= now() || record.accountVersion !== account.version || record.keyVersion !== digest(env.SESSION_SECRET).slice(0,16)) {
      if (!mandatory) return { doc, authenticated: false };
      throw new AppError(401, 'Sesi telah berakhir. Silakan login kembali.', 'LOGIN_REQUIRED');
    }
    return { doc, raw, record, account, authenticated: true, csrfToken: hmac(env.SESSION_SECRET, `csrf:${raw}`) };
  }
  function csrf(req, ctx) {
    requireValue(safeEqual(req.headers['x-csrf-token'], ctx.csrfToken), 'Sesi keamanan tidak valid. Muat ulang aplikasi.', 403, 'INVALID_CSRF');
  }
  async function workspaceContext(ctx, target, etag) {
    const uid = String(target || ctx.account.uid);
    requireValue(Object.hasOwn(ctx.doc.accounts, uid) && (ctx.account.isAdmin || uid === ctx.account.uid), 'Ruang kerja tidak diizinkan.', 403, 'FORBIDDEN');
    const loaded = await store.read(`workspaces/${uid}`, ctx.record.role === 'employee' ? undefined : etag);
    if (loaded.unchanged) return { uid, unchanged: true, etag: loaded.etag, target: ctx.doc.accounts[uid] };
    const doc = loaded.value || workspaceDocument();
    if (ctx.record.role === 'employee') {
      const employee = doc.employeeAuth?.[ctx.record.employeeId];
      requireValue(employee && employee.version === ctx.record.employeeVersion && doc.state.employees.some(e => e.id === ctx.record.employeeId), 'Akses karyawan telah dicabut. Silakan login kembali.', 401, 'LOGIN_REQUIRED');
    }
    return { uid, doc, etag: loaded.etag, target: ctx.doc.accounts[uid] };
  }
  function sessionResponse(ctx) {
    return { ok: true, authenticated: true, user: publicUser(ctx.account), users: allowedUserList(ctx.doc, ctx.account),
      csrfToken: ctx.csrfToken, sessionExpires: ctx.record.expires, sessionRole: ctx.record.role,
      employeeId: ctx.record.employeeId, syncInterval: Math.max(15000, Math.min(120000, Number(env.SYNC_INTERVAL_MS) || 15000)) };
  }
  function challengeFrom(req, doc) {
    const id = digest(cookies(req)[names.challenge] || '');
    const challenge = doc.challenges[id];
    requireValue(challenge && challenge.expires > now(), 'Permintaan OTP berakhir. Ulangi login dari awal.', 401, 'CHALLENGE_EXPIRED');
    if (challenge.purpose === 'login') {
      const account = doc.accounts[challenge.uid];
      requireValue(account && account.version === challenge.accountVersion, 'Akun berubah. Ulangi login.', 401, 'CHALLENGE_EXPIRED');
    }
    return { id, challenge };
  }
  async function beginLogin(req, res, body) {
    const rate = clientRateKey(req, env.SESSION_SECRET);
    const username = normalizeUsername(body.username);
    const limited = await mutateAuth(doc => {
      rateLimit(doc, `login-ip:${rate}`, 30, 15 * 60000, now());
      rateLimit(doc, `login-user:${digest(username)}`, 15, 15 * 60000, now());
    });
    const account = Object.values(limited.doc.accounts).find(a => a.username === username);
    const pass = await verifyPassword(body.password, account?.passwordHash);
    const codeValid = !account?.isAdmin || safeEqual(hmac(env.SESSION_SECRET, body.uniqueCode || ''), account.uniqueCodeHash);
    requireValue(account && pass && codeValid, 'Username, kata sandi, atau kode admin tidak sesuai.', 401, 'INVALID_CREDENTIALS');
    const raw = randomToken(), id = digest(raw);
    await mutateAuth(doc => {
      requireValue(doc.accounts[account.uid]?.version === account.version, 'Akun berubah. Ulangi login.', 409);
      doc.challenges[id] = { purpose: 'login', uid: account.uid, accountVersion: account.version,
        email: account.adminEmail, fullName: account.fullName, expires: now() + 10 * 60000, otp: null };
      // Successful password verification resets only this account's password-attempt counter.
      delete doc.limits[`login-user:${digest(username)}`];
    });
    setCookie(res, names.challenge, raw, env, 600);
    return { ok: true, otpRequired: true, user: publicUser(account) };
  }
  async function beginRegistration(req, res, body) {
    requireValue(env.ALLOW_REGISTRATION !== 'false', 'Pendaftaran mandiri dinonaktifkan. Hubungi administrator.', 403);
    const rate = clientRateKey(req, env.SESSION_SECRET);
    const username = normalizeUsername(body.username);
    requireValue(/^[a-z0-9_.-]{3,64}$/.test(username) && username !== normalizeUsername(env.ADMIN_USERNAME), 'Username wajib 3–64 karakter: huruf kecil, angka, titik, garis bawah, atau tanda hubung.');
    const email = validEmail(body.adminEmail);
    const fullName = text(body.fullName), coopName = text(body.coopName);
    await mutateAuth(doc => {
      rateLimit(doc, `register:${rate}`, 5, 3600000, now());
      requireValue(!Object.values(doc.accounts).some(a => a.username === username), 'Username sudah digunakan.', 409);
    });
    const passwordHash = await hashPassword(body.password);
    const user = { uid: `USR-${randomToken().slice(0, 20)}`, username, passwordHash, fullName, coopName,
      role: 'Admin Utama Usaha', adminEmail: email, isAdmin: false, version: 1, createdAt: now() };
    const raw = randomToken(), id = digest(raw);
    await mutateAuth(doc => {
      requireValue(!Object.values(doc.accounts).some(a => a.username === username), 'Username sudah digunakan.', 409);
      doc.challenges[id] = { purpose: 'register', pendingUser: user, email, fullName, expires: now() + 10 * 60000, otp: null };
    });
    setCookie(res, names.challenge, raw, env, 600);
    return { ok: true, otpRequired: true, user: publicUser(user) };
  }
  async function sendOtp(req) {
    const raw = cookies(req)[names.challenge] || '', id = digest(raw);
    const otp = String(randomInt(100000, 1000000)), generation = randomToken();
    const reserved = await mutateAuth(doc => {
      const { challenge } = challengeFrom(req, doc);
      const last = challenge.lastSentAt || 0;
      requireValue(now() - last >= 60000, 'Tunggu 60 detik sebelum meminta kode baru.', 429, 'OTP_COOLDOWN');
      rateLimit(doc, `otp-mail:${digest(challenge.email)}`, 6, 15 * 60000, now());
      rateLimit(doc, `otp-ip:${clientRateKey(req, env.SESSION_SECRET)}`, 12, 15 * 60000, now());
      challenge.lastSentAt = now();
      challenge.otp = { generation, hash: hmac(env.SESSION_SECRET, `${id}:${otp}`), expires: now() + OTP_MS, attempts: 0, ready: false };
      return { email: challenge.email, name: challenge.fullName };
    });
    try { await sendMail({ to: reserved.result.email, name: reserved.result.name, otp }); }
    catch (error) {
      await mutateAuth(doc => {
        if (doc.challenges[id]?.otp?.generation === generation) doc.challenges[id].otp = null;
      });
      throw error;
    }
    const committed = await mutateAuth(doc => {
      const { challenge } = challengeFrom(req, doc);
      requireValue(challenge.otp?.generation === generation, 'Permintaan OTP diganti. Kirim kode baru.', 409);
      challenge.otp.ready = true; challenge.otp.expires = now() + OTP_MS;
      return { expires: challenge.otp.expires };
    });
    return { ok: true, sent: true, expires: committed.result.expires, remainingSeconds: 120, resendAfter: 60 };
  }
  async function verifyOtp(req, res, body) {
    const otp = String(body.otp || '').trim();
    requireValue(/^\d{6}$/.test(otp), 'Masukkan 6 digit OTP.');
    const verified = await mutateAuth(doc => {
      const { id, challenge } = challengeFrom(req, doc);
      const record = challenge.otp;
      if (!record?.ready || record.expires <= now()) return { error: 'Kode belum dikirim atau sudah kedaluwarsa.', code: 'OTP_EXPIRED' };
      if (record.attempts >= 5) return { error: 'Batas percobaan OTP tercapai. Minta kode baru.', code: 'OTP_LOCKED' };
      record.attempts++;
      if (!safeEqual(record.hash, hmac(env.SESSION_SECRET, `${id}:${otp}`))) return { error: 'Kode OTP tidak sesuai.', code: 'OTP_INVALID' };
      let account;
      if (challenge.purpose === 'register') {
        account = challenge.pendingUser;
        requireValue(!Object.values(doc.accounts).some(a => a.username === account.username), 'Username sudah digunakan. Ulangi pendaftaran.', 409);
        doc.accounts[account.uid] = account;
      } else account = doc.accounts[challenge.uid];
      const raw = makeSession(doc, account);
      delete doc.challenges[id]; // Same CAS write consumes OTP and creates the session: no replay race.
      return { raw };
    });
    if (verified.result.error) throw new AppError(400, verified.result.error, verified.result.code);
    setCookie(res, names.session, verified.result.raw, env);
    setCookie(res, names.challenge, '', env, 0);
    return { ok: true, authenticated: true };
  }
  async function employeeLogin(req, res, body) {
    const key = clientRateKey(req, env.SESSION_SECRET), cooperative = String(body.cooperative || '').trim().toLowerCase();
    const employeeId = String(body.employeeId || '').trim().toUpperCase();
    const limited = await mutateAuth(doc => { rateLimit(doc, `employee-login:${key}`, 25, 15 * 60000, now()); });
    const matches = Object.values(limited.doc.accounts).filter(a => !a.isAdmin && (a.username === cooperative || a.coopName.toLowerCase() === cooperative));
    requireValue(matches.length === 1, 'Gunakan username akun usaha yang tepat, ID karyawan, dan kata sandi.', 401, 'INVALID_CREDENTIALS');
    const account = matches[0], loaded = await store.read(`workspaces/${account.uid}`);
    const employee = loaded.value?.state?.employees?.find(e => e.id.toUpperCase() === employeeId);
    const credentials = employee && loaded.value.employeeAuth?.[employee.id];
    requireValue(credentials && await verifyPassword(body.password, credentials.passwordHash), 'Username usaha, ID karyawan, atau kata sandi tidak sesuai.', 401, 'INVALID_CREDENTIALS');
    const created = await mutateAuth(doc => {
      requireValue(doc.accounts[account.uid]?.version === account.version, 'Akun berubah. Ulangi login.', 401);
      return { raw: makeSession(doc, account, { id: employee.id, version: credentials.version }) };
    });
    setCookie(res, names.session, created.result.raw, env);
    return { ok: true, authenticated: true };
  }
  async function getWorkspace(req, ctx, query) {
    const target = query.get('uid') || ctx.account.uid;
    // Authentication is always rechecked, even for conditional requests.
    const workspace = await workspaceContext(ctx, target, query.get('etag'));
    if (workspace.unchanged || (query.get('etag') && workspace.etag === query.get('etag'))) {
      return { ok: true, unchanged: true, users: allowedUserList(ctx.doc, ctx.account), etag: workspace.etag };
    }
    const state = publicWorkspace(workspace.doc);
    const emp = ctx.record.employeeId && state.employees.find(e => e.id === ctx.record.employeeId);
    return { ok: true, state, revision: workspace.doc.revision, etag: workspace.etag, user: publicUser(workspace.target),
      users: allowedUserList(ctx.doc, ctx.account),
      operator: emp ? { type: 'KARYAWAN_USAHA', operatorId: emp.id, operatorName: emp.name, operatorPosition: emp.position || 'Karyawan' }
        : { type: ctx.account.isAdmin && workspace.target.isAdmin ? 'SYS_ADMIN' : 'ADMIN_USAHA', operatorId: ctx.account.uid, operatorName: ctx.account.fullName, operatorPosition: ctx.account.role } };
  }
  async function saveWorkspace(ctx, body) {
    const target = await workspaceContext(ctx, body.uid);
    requireValue(/^[a-zA-Z0-9_-]{12,100}$/.test(body.mutationId || ''), 'Identitas penyimpanan tidak valid.');
    const wanted = sanitizeState(body.state), base = sanitizeState(body.base);
    requireValue(Buffer.byteLength(JSON.stringify(wanted)) <= 1300000, 'Data melebihi batas 1,3 MB per ruang kerja versi ini. Ekspor arsip dan hubungi administrator.', 413);
    const credentials = [];
    if (ctx.record.role === 'employee') {
      for (const field of ['employees','identity','coa']) requireValue(equal(base[field], wanted[field]), 'Karyawan tidak diizinkan mengubah identitas, COA, atau akun karyawan.', 403);
      requireValue(!(body.state.employees || []).some(e => e.newPassword), 'Pengaturan password hanya untuk admin.', 403);
    } else {
      const changes = (body.state.employees || []).filter(e => e.newPassword);
      requireValue(changes.length <= 20, 'Maksimal 20 perubahan kata sandi per penyimpanan.');
      for (const employee of changes) credentials.push({ id: employee.id, hash: await hashPassword(employee.newPassword) });
    }
    const mutationKey = `${ctx.account.uid}:${ctx.record.employeeId || ''}:${body.mutationId}`;
    const payloadHash = digest(JSON.stringify({ base, wanted, credentials: credentials.map(e => ({ id: e.id, password: body.state.employees.find(x => x.id === e.id).newPassword })) }));
    const saved = await store.mutate(`workspaces/${target.uid}`, workspaceDocument(), doc => {
      if (doc.recentMutations[mutationKey]) {
        requireValue(doc.recentMutations[mutationKey] === payloadHash, 'Identitas penyimpanan sudah dipakai untuk data berbeda.', 409);
        return noWrite();
      }
      if (ctx.record.role === 'employee') requireValue(doc.employeeAuth[ctx.record.employeeId]?.version === ctx.record.employeeVersion, 'Hak akses karyawan berubah.', 401);
      const current = sanitizeState(doc.state);
      const merged = sanitizeState(mergeState(base, wanted, current));
      validateLedger(merged);
      for (const entry of credentials) {
        requireValue(merged.employees.some(e => e.id === entry.id), 'Karyawan tidak ditemukan.');
        doc.employeeAuth[entry.id] = { passwordHash: entry.hash, version: (doc.employeeAuth[entry.id]?.version || 0) + 1 };
      }
      for (const id of Object.keys(doc.employeeAuth)) if (!merged.employees.some(e => e.id === id)) delete doc.employeeAuth[id];
      doc.state = merged;
      doc.recentMutations[mutationKey] = payloadHash;
      const keys = Object.keys(doc.recentMutations);
      for (const id of keys.slice(0, Math.max(0, keys.length - 150))) delete doc.recentMutations[id];
    });
    return { ok: true, state: publicWorkspace(saved.doc), revision: saved.doc.revision, etag: saved.etag };
  }
  async function changeProfile(ctx, res, body) {
    requireValue(ctx.record.role !== 'employee', 'Pengaturan akun hanya untuk admin.', 403);
    requireValue(await verifyPassword(body.oldPassword, ctx.account.passwordHash), 'Kata sandi lama tidak sesuai.', 400);
    const passwordHash = await hashPassword(body.newPassword);
    const fullName = text(body.fullName), coopName = text(body.coopName);
    await mutateAuth(doc => {
      const account = doc.accounts[ctx.account.uid];
      requireValue(account?.version === ctx.account.version, 'Akun sudah berubah. Ulangi login.', 409);
      account.passwordHash = passwordHash; account.version++; account.fullName = fullName; account.coopName = coopName;
      for (const [id, record] of Object.entries(doc.sessions)) if (record.uid === account.uid) delete doc.sessions[id];
    });
    setCookie(res, names.session, '', env, 0);
    return { ok: true, reauthenticate: true };
  }
  async function adminAccountAction(ctx, body) {
    requireValue(ctx.account.isAdmin && ctx.record.role === 'sysadmin', 'Hanya administrator aplikasi yang diizinkan.', 403);
    const uid = String(body.uid || '');
    if (body.action === 'account_reset') {
      const hash = await hashPassword(body.password);
      await mutateAuth(doc => {
        const account = doc.accounts[uid]; requireValue(account, 'Akun tidak ditemukan.', 404);
        requireValue(!account.isAdmin, 'Gunakan menu Ganti Password untuk akun administrator sendiri.');
        account.passwordHash = hash; account.version++;
        for (const [id, record] of Object.entries(doc.sessions)) if (record.uid === uid) delete doc.sessions[id];
      });
    } else {
      await mutateAuth(doc => {
        const account = doc.accounts[uid]; requireValue(account && !account.isAdmin, 'Akun ini tidak dapat dihapus.');
        delete doc.accounts[uid];
        for (const [id, record] of Object.entries(doc.sessions)) if (record.uid === uid) delete doc.sessions[id];
        for (const [id, record] of Object.entries(doc.challenges)) if (record.uid === uid) delete doc.challenges[id];
      });
      // Identity/access is revoked first. An unsuccessful cleanup is reported explicitly.
      try { await store.remove(`workspaces/${uid}`); }
      catch { throw new AppError(503, 'Akses akun sudah dicabut, tetapi pembersihan file belum selesai. Hubungi administrator untuk menghapus file ruang kerja di Blob.', 'CLEANUP_REQUIRED'); }
    }
    return { ok: true };
  }
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'private, no-store, max-age=0');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Vary', 'Cookie');
    try {
      checkConfiguration(env);
      const query = new URL(req.url || '/', 'http://localhost').searchParams;
      if (req.method === 'GET') {
        const action = query.get('action') || 'session';
        if (action === 'session') {
          const ctx = await session(req, false);
          if (!ctx.authenticated) return res.status(200).json({ ok: true, authenticated: false, registrationEnabled: env.ALLOW_REGISTRATION !== 'false' });
          if (ctx.record.role === 'employee') await workspaceContext(ctx);
          return res.status(200).json(sessionResponse(ctx));
        }
        const ctx = await session(req);
        requireValue(action === 'workspace', 'Endpoint tidak ditemukan.', 404);
        return res.status(200).json(await getWorkspace(req, ctx, query));
      }
      requireValue(req.method === 'POST', 'Metode tidak diizinkan.', 405);
      checkRequestOrigin(req, env);
      requireValue(Number(req.headers['content-length'] || 0) <= 3200000, 'Permintaan terlalu besar.', 413);
      let body;
      try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
      catch { throw new AppError(400, 'JSON tidak valid.'); }
      requireValue(body && typeof body === 'object' && !Array.isArray(body), 'Permintaan tidak valid.');
      requireValue(Buffer.byteLength(JSON.stringify(body)) <= 3200000, 'Permintaan terlalu besar.', 413);
      let result;
      switch (body.action) {
        case 'login_begin': result = await beginLogin(req, res, body); break;
        case 'register_begin': result = await beginRegistration(req, res, body); break;
        case 'employee_login': result = await employeeLogin(req, res, body); break;
        case 'send_otp': result = await sendOtp(req); break;
        case 'verify_otp': result = await verifyOtp(req, res, body); break;
        default: {
          const ctx = await session(req); csrf(req, ctx);
          if (body.action === 'logout') {
            await mutateAuth(doc => { delete doc.sessions[digest(ctx.raw)]; });
            setCookie(res, names.session, '', env, 0); result = { ok: true };
          } else if (body.action === 'workspace_save') result = await saveWorkspace(ctx, body);
          else if (body.action === 'profile_update') result = await changeProfile(ctx, res, body);
          else if (['account_reset','account_delete'].includes(body.action)) result = await adminAccountAction(ctx, body);
          else throw new AppError(400, 'Aksi tidak dikenali.');
        }
      }
      return res.status(200).json(result);
    } catch (error) {
      const status = error instanceof AppError ? error.status : 503;
      const code = error instanceof AppError ? error.code : 'SERVICE_UNAVAILABLE';
      const reference = status >= 500 || code === 'STORE_BUSY' ? randomUUID().slice(0, 8) : undefined;
      if (reference) console.error('SIAKAD backend failure:', JSON.stringify({ reference, code, status,
        release: '5.0.2', ...(error.diagnostic || {}) }));
      return res.status(status).json({ ok: false, error: error instanceof AppError ? error.message : 'Layanan penyimpanan belum tersedia. Data belum dinyatakan tersimpan; coba lagi atau periksa konfigurasi dan kuota Blob.',
        code, ...(reference ? { reference } : {}), ...(error instanceof AppError && error.details ? { details: error.details } : {}) });
    }
  };
}
