import nodemailer from 'nodemailer';
import { AppError } from './errors.js';
export function createMailer(env = process.env) {
  let transporter;
  return async ({ to, otp, name }) => {
    if (!env.SMTP_USER || !env.SMTP_PASS) throw new AppError(503, 'Email belum dikonfigurasi. Administrator perlu mengisi SMTP_USER dan SMTP_PASS di Vercel.', 'SMTP_NOT_CONFIGURED');
    const port = Number(env.SMTP_PORT || 465);
    if (![465, 587].includes(port)) throw new AppError(503, 'SMTP_PORT harus 465 atau 587.', 'SMTP_CONFIG_INVALID');
    transporter ||= nodemailer.createTransport({
      host: env.SMTP_HOST || 'smtp.gmail.com', port, secure: port === 465, requireTLS: port === 587,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS.replace(/\s+/g, '') },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
      tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
      disableFileAccess: true, disableUrlAccess: true
    });
    try {
      const info = await transporter.sendMail({
        from: { name: 'SIAKAD-KDMP', address: env.SMTP_USER }, to,
        subject: 'Kode verifikasi masuk SIAKAD-KDMP',
        text: `Halo ${String(name || 'Pengguna').replace(/[\r\n]/g, ' ')},\n\nKode OTP Anda: ${otp}\n\nBerlaku 2 menit dan hanya dapat dipakai sekali. Jangan berikan kode kepada orang lain. Jika Anda tidak meminta kode ini, abaikan email ini.\n\nSIAKAD-KDMP`,
        headers: { 'X-Auto-Response-Suppress': 'All' }
      });
      if (!info.accepted?.length || info.rejected?.length) throw new Error('Recipient was not accepted');
    } catch {
      // No credential, SMTP transcript, or OTP is returned/logged on failure.
      throw new AppError(502, 'Pengiriman OTP gagal. Periksa App Password Gmail/konfigurasi SMTP, lalu kirim ulang. Login belum diselesaikan.', 'EMAIL_SEND_FAILED');
    }
  };
}
