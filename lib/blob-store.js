import * as blob from '@vercel/blob';
import { setTimeout as pause } from 'node:timers/promises';
import { AppError } from './errors.js';
import { describeBlobFailure, isBlobConflict } from './blob-errors.js';

// No memory or /tmp fallback: a successful response always means a committed Blob write.
export function createBlobStore({ sdk = blob, env = process.env, retries = 7 } = {}) {
  const prefix = (env.BLOB_PREFIX || 'siakad-v5').replace(/^\/+|\/+$/g, '');
  if (!/^[a-zA-Z0-9_/-]+$/.test(prefix) || prefix.includes('..')) throw new Error('BLOB_PREFIX tidak valid');
  function credentials() {
    const token = env.BLOB_READ_WRITE_TOKEN?.trim();
    const storeId = env.BLOB_STORE_ID?.trim();
    const hasOidc = storeId && (env.VERCEL === '1' || env.VERCEL_OIDC_TOKEN);
    if (!token && !hasOidc) {
      throw new AppError(503, 'Hubungkan Vercel Blob Private ke proyek, lalu redeploy.', 'BLOB_NOT_CONFIGURED');
    }
    // Refuse a mixed-store configuration rather than silently opening a different database.
    if (token && storeId) {
      const tokenStore = token.match(/^vercel_blob_rw_([^_]+)_/i)?.[1];
      if (tokenStore && tokenStore.toLowerCase() !== storeId.replace(/^store_/, '').toLowerCase()) {
        throw new AppError(503, 'BLOB_STORE_ID dan BLOB_READ_WRITE_TOKEN menunjuk store berbeda. Perbaiki koneksi agar keduanya memakai store Private yang berisi data Anda, lalu redeploy.', 'BLOB_CREDENTIAL_MISMATCH');
      }
    }
    // Let the SDK fetch/refresh OIDC; do not pin an old static token ahead of it.
    if (hasOidc) return { storeId };
    return { token };
  }
  const pathname = key => `${prefix}/${key}.json`;
  const strongTag = tag => typeof tag === 'string' && /^"[^"\r\n]+"$/.test(tag);
  const sameRepresentation = (readTag, originTag) => readTag === originTag || readTag === `W/${originTag}`;
  const documentKind = key => key === 'private/auth' ? 'authentication' : key.startsWith('workspaces/') ? 'workspace' : 'diagnostic';
  async function metadata(key) {
    try {
      const result = await sdk.head(pathname(key), { ...credentials(), abortSignal: AbortSignal.timeout(12000) });
      if (!strongTag(result?.etag)) throw new AppError(503, 'Metadata Blob tidak memberikan versi kuat yang dapat dipakai untuk menyimpan. Data tidak ditimpa.', 'BLOB_METADATA_INVALID');
      return result;
    } catch (error) {
      if (error instanceof blob.BlobNotFoundError) return null;
      throw describeBlobFailure(error, 'metadata');
    }
  }
  async function read(key, etag) {
    let result;
    try {
      result = await sdk.get(pathname(key), {
        access: 'private', useCache: false, ...credentials(),
        // Request the original representation so compressed delivery does not alter its validator.
        headers: { 'Accept-Encoding': 'identity', 'Cache-Control': 'no-cache' },
        ...(etag ? { ifNoneMatch: etag } : {}), abortSignal: AbortSignal.timeout(12000)
      });
    } catch (error) { throw describeBlobFailure(error, 'read'); }
    if (!result) return { value: null, etag: null };
    if (result.statusCode === 304) return { unchanged: true, etag: result.blob.etag || etag };
    if (!result.blob?.etag) throw new AppError(503, 'Blob tidak memberikan versi data (ETag). Pembaruan dihentikan agar data tidak tertimpa. Periksa Runtime Logs.', 'BLOB_ETAG_MISSING');
    let raw;
    try { raw = await new Response(result.stream).text(); }
    catch (error) { throw describeBlobFailure(error, 'read-body'); }
    let value;
    try { value = JSON.parse(raw); }
    catch { throw new AppError(503, 'Isi penyimpanan tidak valid. Data tidak ditimpa. Hubungi administrator.', 'CORRUPT_STORE'); }
    if (!value || value.schema !== 5) throw new AppError(503, 'Versi penyimpanan tidak sesuai.', 'INVALID_STORE_SCHEMA');
    return { value, etag: result.blob.etag };
  }
  async function readForWrite(key) {
    // Never attach a new metadata ETag to an old body. Bracket a consistent read
    // with metadata reads, and verify that its representation refers to that version.
    const before = await metadata(key);
    const loaded = await read(key);
    const after = await metadata(key);
    if ((before?.etag || null) !== (after?.etag || null)) return { retry: 'metadata_changed' };
    if (!before && !loaded.value) return loaded;
    if (!before || !loaded.value) return { retry: 'read_metadata_mismatch' };
    if (!sameRepresentation(loaded.etag, after.etag)) return { retry: 'read_metadata_mismatch' };
    // Use the authoritative SDK metadata verbatim; do not weaken/remove the write precondition.
    return { value: loaded.value, etag: after.etag, readEtagWeak: loaded.etag.startsWith('W/') };
  }
  async function mutate(key, initial, update) {
    let useMetadata = false, writesRejected = 0, metadataChanged = 0, readMetadataMismatch = 0;
    let metadataSnapshots = 0, weakReadSeen = false;
    const seenMetadataVersions = new Set();
    for (let attempt = 0; attempt < retries; attempt++) {
      const loaded = useMetadata ? await readForWrite(key) : await read(key);
      if (loaded.retry) {
        if (loaded.retry === 'metadata_changed') metadataChanged++;
        else readMetadataMismatch++;
        if (attempt + 1 < retries) await pause(50 * (attempt + 1) + Math.random() * 80);
        continue;
      }
      weakReadSeen ||= Boolean(loaded.readEtagWeak || loaded.etag?.startsWith('W/'));
      if (useMetadata) { metadataSnapshots++; seenMetadataVersions.add(loaded.etag); }
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
        if (!isBlobConflict(error, !loaded.etag)) throw describeBlobFailure(error, 'write');
        writesRejected++; useMetadata = true;
        if (attempt + 1 < retries) await pause(50 * (attempt + 1) + Math.random() * 80);
      }
    }
    const diagnosis = { operation: 'conditional-write', documentKind: documentKind(key), attempts: retries,
      writesRejected, metadataSnapshots, metadataChanged, readMetadataMismatch,
      distinctMetadataVersions: seenMetadataVersions.size, weakReadSeen };
    let error;
    if (readMetadataMismatch && !metadataChanged) {
      error = new AppError(503, 'Versi isi Blob tidak cocok dengan metadata penyimpanan. Pembaruan dihentikan agar data lama tidak menimpa data baru. Periksa Runtime Logs dengan nomor referensi ini.', 'BLOB_READ_VERSION_MISMATCH');
    } else if (metadataSnapshots >= 2 && seenMetadataVersions.size === 1 && !metadataChanged) {
      error = new AppError(503, 'Blob menolak penyimpanan meskipun versi metadata tetap sama. Data tidak ditimpa. Periksa Runtime Logs dengan nomor referensi ini.', 'BLOB_CONDITION_REJECTED');
    } else {
      error = new AppError(409, 'Penyimpanan belum berhasil karena konflik versi setelah beberapa percobaan. Tunggu sebentar lalu coba lagi.', 'STORE_BUSY');
    }
    error.diagnostic = diagnosis;
    throw error;
  }
  async function remove(key) {
    const loaded = await metadata(key);
    if (loaded?.etag) {
      try { await sdk.del(pathname(key), { ...credentials(), ifMatch: loaded.etag }); }
      catch (error) {
        if (isBlobConflict(error)) throw new AppError(409, 'Data berubah saat akan dihapus. Muat ulang dan coba lagi.', 'STORE_BUSY');
        throw describeBlobFailure(error, 'delete');
      }
    }
  }
  return { read, mutate, remove };
}
