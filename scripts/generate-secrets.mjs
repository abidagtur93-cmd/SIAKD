import {randomBytes} from 'node:crypto';
console.log('SESSION_SECRET=' + randomBytes(48).toString('base64url'));
console.log('ADMIN_PASSWORD=' + randomBytes(18).toString('base64url'));
console.log('ADMIN_UNIQUE_CODE=' + randomBytes(12).toString('base64url'));
console.log('\nSimpan hasil ini di password manager dan Environment Variables Vercel. Jangan commit ke GitHub.');
