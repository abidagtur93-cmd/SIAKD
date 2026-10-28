import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHmac, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { AppError, requireValue } from './errors.js';
const scrypt = promisify(scryptCallback);
export const randomToken = () => randomBytes(32).toString('base64url');
export const digest = value => createHash('sha256').update(String(value)).digest('hex');
export function hmac(secret, value) { return createHmac('sha256', secret).update(String(value)).digest('hex'); }
export function safeEqual(a, b) {
  const left = Buffer.from(String(a || '')); const right = Buffer.from(String(b || ''));
  return left.length === right.length && timingSafeEqual(left, right);
}
export async function hashPassword(password) {
  requireValue(typeof password === 'string' && password.length >= 12 && password.length <= 128,
    'Kata sandi wajib 12–128 karakter.');
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt}$${hash.toString('hex')}`;
}
export async function verifyPassword(password, encoded) {
  if (typeof password !== 'string' || password.length > 128 || !encoded) return false;
  const [kind, salt, expected] = encoded.split('$');
  if (kind !== 'scrypt' || !salt || !expected) return false;
  const hash = await scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return safeEqual(hash.toString('hex'), expected);
}
export function checkConfiguration(env) {
  requireValue(typeof env.SESSION_SECRET === 'string' && env.SESSION_SECRET.length >= 32,
    'Atur SESSION_SECRET acak minimal 32 karakter di Vercel.', 503, 'CONFIG_REQUIRED');
  requireValue(!/GANTI_|CHANGE_ME|YOUR_SECRET|ISI_DISINI/i.test(env.SESSION_SECRET),
    'Ganti contoh SESSION_SECRET dengan nilai acak milik Anda.', 503, 'CONFIG_REQUIRED');
}
export function cookies(req) {
  const output = {};
  for (const pair of (req.headers.cookie || '').split(';')) {
    const i = pair.indexOf('=');
    if (i > 0) { try { output[pair.slice(0, i).trim()] = decodeURIComponent(pair.slice(i + 1)); } catch {} }
  }
  return output;
}
export function cookieNames(env) {
  return env.VERCEL === '1' || env.NODE_ENV === 'production'
    ? { session: '__Host-siakad_session', challenge: '__Host-siakad_challenge' }
    : { session: 'siakad_session', challenge: 'siakad_challenge' };
}
export function setCookie(res, name, value, env, maxAge = 8 * 3600) {
  const secure = env.VERCEL === '1' || env.NODE_ENV === 'production';
  const cookie = `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
  const previous = res.getHeader?.('Set-Cookie');
  res.setHeader('Set-Cookie', [...(Array.isArray(previous) ? previous : previous ? [previous] : []), cookie]);
}
export function checkRequestOrigin(req, env) {
  const origin = req.headers.origin;
  const host = req.headers.host;
  const trusted = new Set([`https://${host}`, ...(env.NODE_ENV !== 'production' && env.VERCEL !== '1' ? [`http://${host}`] : [])]);
  if (env.APP_ORIGIN) trusted.add(env.APP_ORIGIN.replace(/\/$/, ''));
  if (env.VERCEL_URL) trusted.add(`https://${env.VERCEL_URL}`);
  requireValue(origin && trusted.has(origin) && req.headers['sec-fetch-site'] !== 'cross-site',
    'Permintaan harus berasal dari aplikasi yang sama.', 403, 'INVALID_ORIGIN');
  requireValue((req.headers['content-type'] || '').split(';')[0].trim() === 'application/json',
    'Gunakan Content-Type application/json.', 415);
}
export function clientRateKey(req, secret) {
  // Vercel sets this header; the local dev server overwrites it using the socket address.
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  return hmac(secret, `rate:${ip}`).slice(0, 32);
}
export function rateLimit(doc, key, maximum, windowMs, now = Date.now()) {
  doc.limits ||= {};
  const bucket = doc.limits[key];
  const active = bucket && now - bucket.start < windowMs ? bucket : { start: now, count: 0 };
  if (active.count >= maximum) throw new AppError(429, 'Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi.', 'RATE_LIMITED');
  active.count++; doc.limits[key] = active;
}
export function cleanAuth(doc, now = Date.now()) {
  for (const [k, v] of Object.entries(doc.sessions || {})) if (v.expires <= now) delete doc.sessions[k];
  for (const [k, v] of Object.entries(doc.challenges || {})) if (v.expires <= now) delete doc.challenges[k];
  for (const [k, v] of Object.entries(doc.limits || {})) if (now - v.start > 3600000) delete doc.limits[k];
}
export const normalizeUsername = value => String(value || '').trim().toLowerCase();
export function validEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  requireValue(email.length <= 254 && /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(email), 'Alamat email tidak valid.');
  return email;
}
export function text(value, max = 200) {
  requireValue(typeof value === 'string' && value.trim().length > 0 && value.length <= max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value), 'Isian teks wajib diisi dan tidak boleh terlalu panjang.');
  return value.trim();
}
export function publicUser(account) {
  return { uid: account.uid, username: account.username, uHash: digest(account.username),
    fullName: account.fullName, coopName: account.coopName, role: account.role,
    adminEmail: account.adminEmail, isAdmin: account.isAdmin, createdAt: account.createdAt };
}
