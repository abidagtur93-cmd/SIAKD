import nodemailer from 'nodemailer';
import {randomUUID} from 'node:crypto';
import {createBlobStore} from '../lib/blob-store.js';
import {checkConfiguration} from '../lib/security.js';
import {AppError} from '../lib/errors.js';
checkConfiguration(process.env);
const store=createBlobStore();const key='diagnostics/'+randomUUID();
try {
  await store.mutate(key,{schema:5,revision:0},doc=>{doc.probe='connection-check';});
  const read=await store.read(key);
  if(read.value?.probe!=='connection-check')throw new Error('Pembacaan Blob tidak sesuai');
  const changed=await store.mutate(key,{schema:5,revision:0},doc=>{doc.probe='overwrite-check';});
  const updated=await store.read(key);
  if(updated.value?.probe!=='overwrite-check'||updated.value.revision!==changed.doc.revision)throw new Error('Pembacaan setelah overwrite tidak sesuai');
  if(!(await store.read(key,updated.etag)).unchanged)throw new Error('Pembacaan bersyarat tidak sesuai');
  await store.remove(key);console.log('Blob Private: create/read/conditional overwrite/read terbaru/conditional read/delete berhasil.');
  if(!process.env.SMTP_USER||!process.env.SMTP_PASS)throw new Error('SMTP_USER / SMTP_PASS belum diisi');
  const port=Number(process.env.SMTP_PORT||465);
  const smtp=nodemailer.createTransport({host:process.env.SMTP_HOST||'smtp.gmail.com',port,secure:port===465,requireTLS:port===587,
    auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS.replace(/\s+/g,'')},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000,
    tls:{minVersion:'TLSv1.2',rejectUnauthorized:true}});
  await smtp.verify();smtp.close();console.log('SMTP: koneksi, TLS, dan autentikasi berhasil. Tidak ada email dikirim oleh pemeriksaan ini.');
  console.log('Lanjutkan uji login OTP melalui antarmuka untuk memastikan email benar-benar masuk ke Inbox/Spam.');
} catch(error) { console.error('Pemeriksaan gagal:',error.code||error.name);
  if(error instanceof AppError)console.error(error.message);
  if(error.diagnostic)console.error(JSON.stringify(error.diagnostic));
  process.exitCode=1; }
