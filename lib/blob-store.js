import * as blob from '@vercel/blob';
import { setTimeout as pause } from 'node:timers/promises';
import { AppError } from './errors.js';

// No memory or /tmp fallback: a successful response always means a committed Blob write.
export function createBlobStore({ sdk = blob, env = process.env, retries = 7 } = {}) {
  const prefix = (env.BLOB_PREFIX || 'siakad-v5').replace(/^\/+|\/+$/g, '');
  if (!/^[a-zA-Z0-9_/-]+$/.test(prefix) || prefix.includes('..')) throw new Error('BLOB_PREFIX tidak valid');
  function configured() {
    if (!env.BLOB_READ_WRITE_TOKEN && !(env.BLOB_STORE_ID && (env.VERCEL || env.VERCEL_OIDC_TOKEN))) {
      throw new AppError(503, 'Hubungkan Vercel Blob Private ke proyek, lalu redeploy.', 'BLOB_NOT_CONFIGURED');
    }
  }
  function credentials() {
    // The SDK handles OIDC refresh. Explicit token is only used when deliberately configured.
    return env.BLOB_READ_WRITE_TOKEN ? { token: env.BLOB_READ_WRITE_TOKEN } : {};
  }
  const pathname = key => `${prefix}/${key}.json`;
  async function read(key, etag) {
    configured();
    const result = await sdk.get(pathname(key), {
      access: 'private', useCache: false, ...credentials(),
      ...(etag ? { ifNoneMatch: etag } : {}), abortSignal: AbortSignal.timeout(12000)
    });
    if (!result) return { value: null, etag: null };
    if (result.statusCode === 304) return { unchanged: true, etag: result.blob.etag || etag };
    let value;
    try { value = JSON.parse(await new Response(result.stream).text()); }
    catch { throw new AppError(503, 'Isi penyimpanan tidak valid. Data tidak ditimpa. Hubungi administrator.', 'CORRUPT_STORE'); }
    if (!value || value.schema !== 5) throw new AppError(503, 'Versi penyimpanan tidak sesuai.', 'INVALID_STORE_SCHEMA');
    return { value, etag: result.blob.etag };
  }
  async function mutate(key, initial, update) {
    for (let attempt = 0; attempt < retries; attempt++) {
      const loaded = await read(key);
      const doc = loaded.value || structuredClone(initial);
      const result = await update(doc);
      if (result?.noWrite) return { doc, result: result.value, etag: loaded.etag };
      doc.revision = (doc.revision || 0) + 1;
      doc.updatedAt = Date.now();
      try {
        const saved = await sdk.put(pathname(key), JSON.stringify(doc), {
          access: 'private', contentType: 'application/json; charset=utf-8', addRandomSuffix: false,
          cacheControlMaxAge: 60, allowOverwrite: Boolean(loaded.etag),
          ...(loaded.etag ? { ifMatch: loaded.etag } : {}),
          ...credentials(), abortSignal: AbortSignal.timeout(12000)
        });
        return { doc, result, etag: saved.etag };
      } catch (error) {
        const conflict = error?.name === 'BlobPreconditionFailedError' ||
          (!loaded.etag && /already exists|already_exists|overwrite|precondition/i.test(error?.message || ''));
        if (!conflict) throw error;
        if (attempt + 1 < retries) await pause(15 * (attempt + 1) + Math.random() * 35);
      }
    }
    throw new AppError(409, 'Penyimpanan sedang diperbarui perangkat lain. Coba simpan lagi.', 'STORE_BUSY');
  }
  async function remove(key) {
    const loaded = await read(key);
    if (loaded.etag) await sdk.del(pathname(key), { ...credentials(), ifMatch: loaded.etag });
  }
  return { read, mutate, remove };
}
