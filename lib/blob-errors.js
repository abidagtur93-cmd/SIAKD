import * as blob from '@vercel/blob';
import { AppError } from './errors.js';

// SDK 2.8.2 exceptions inherit name === "Error". Match the actual classes.
export function isBlobConflict(error, creating = false) {
  return error instanceof blob.BlobPreconditionFailedError ||
    error?.constructor?.name === 'BlobPreconditionFailedError' ||
    (creating && /already exists|already_exists|precondition failed/i.test(error?.message || ''));
}

export function describeBlobFailure(error, operation) {
  if (error instanceof AppError) return error;
  const message = String(error?.message || '');
  const providerStatus = Number(message.match(/Failed to fetch blob:\s*(\d{3})\b/i)?.[1]) || undefined;
  const kind = error?.constructor?.name || 'Error';
  let code = 'BLOB_UNAVAILABLE';
  let explanation = 'Blob belum dapat diakses. Data belum dikonfirmasi tersimpan. Coba lagi dan periksa Runtime Logs di Vercel.';
  if (/OIDC.*environment/i.test(message) || kind === 'BlobOidcEnvironmentNotAllowedError') {
    code = 'BLOB_ENVIRONMENT_DENIED';
    explanation = 'Koneksi Blob belum mengizinkan environment deployment ini. Buka Blob → Projects → Update Project Connection, pilih Production atau Preview yang dipakai, lalu redeploy.';
  } else if (error instanceof blob.BlobAccessError || providerStatus === 401 || providerStatus === 403 || /access denied|token expired/i.test(message)) {
    code = 'BLOB_ACCESS_DENIED';
    explanation = 'Akses Blob ditolak. Periksa koneksi proyek dan environment; jika memakai BLOB_READ_WRITE_TOKEN, pastikan token masih berlaku untuk store Private yang benar. Setelah diperbaiki, redeploy.';
  } else if (/no blob credentials|invalid token|no storeId|unable to extract store ID/i.test(message)) {
    code = 'BLOB_CREDENTIAL_INVALID';
    explanation = 'Kredensial Blob tidak tersedia atau tidak valid. Hubungkan store Private ke proyek dengan prefix BLOB, pastikan variabel aktif pada environment ini, lalu redeploy.';
  } else if (error instanceof blob.BlobStoreNotFoundError) {
    code = 'BLOB_STORE_NOT_FOUND';
    explanation = 'Store Blob tidak ditemukan. Periksa BLOB_STORE_ID dan koneksi proyek ke store yang berisi data aplikasi.';
  } else if (error instanceof blob.BlobStoreSuspendedError) {
    code = 'BLOB_STORE_SUSPENDED';
    explanation = 'Vercel menangguhkan akses store Blob. Periksa status store dan Usage di dashboard Vercel.';
  } else if (error instanceof blob.BlobServiceRateLimited || providerStatus === 429) {
    code = 'BLOB_RATE_LIMITED';
    explanation = 'Permintaan Blob sedang dibatasi. Tunggu sebentar lalu coba lagi; periksa Usage jika berulang.';
  } else if (error instanceof blob.BlobRequestAbortedError || ['AbortError', 'TimeoutError'].includes(error?.name)) {
    code = 'BLOB_TIMEOUT';
    explanation = 'Koneksi ke Blob melewati batas waktu. Perubahan belum dikonfirmasi tersimpan; tunggu lalu coba lagi.';
  } else if (/access.*(?:private|public)|(?:private|public).*store/i.test(message)) {
    code = 'BLOB_ACCESS_TYPE_MISMATCH';
    explanation = 'Jenis akses Blob tidak sesuai. Aplikasi ini memerlukan koneksi ke store Private.';
  }
  const wrapped = new AppError(503, explanation, code);
  // Only allow-listed metadata reaches logs. Never copy SDK messages/URLs/tokens.
  wrapped.diagnostic = { operation, providerErrorType: /^[A-Za-z0-9_]{1,64}$/.test(kind) ? kind : 'Error',
    ...(providerStatus ? { providerStatus } : {}) };
  const networkCode = error?.cause?.code || error?.code;
  if (['ENOTFOUND', 'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_SOCKET'].includes(networkCode)) {
    wrapped.diagnostic.networkCode = networkCode;
  }
  return wrapped;
}
