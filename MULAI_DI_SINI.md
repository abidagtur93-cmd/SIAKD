# Langkah pemasangan singkat

**Sudah memasang v5 dan mendapat pesan “Layanan penyimpanan belum tersedia”?** Ikuti `PERBAIKAN_BLOB.md` untuk pembaruan v5.0.1. Pertahankan store, namespace, dan rahasia instalasi yang sudah ada.

1. **Ekstrak ZIP**, lalu upload seluruh isi folder proyek ke root repository GitHub. Pastikan ada `api/`, `lib/`, `public/`, `package.json`, dan `vercel.json` di root. Jangan upload `node_modules`, `.env.local`, atau ZIP sebagai satu-satunya file.
2. Import repository di **Vercel**. Pilih **Other**, build `npm run build`, output `public`, Node **24.x**.
3. Hubungkan **Blob → Private → Singapore/sin1 → prefix BLOB**. Koneksi otomatis OIDC didukung. Kotak read-write token tidak wajib untuk backend Vercel; bila memakai token, simpan sebagai variabel server, bukan di HTML/JavaScript browser.
4. Isi variabel berikut di **Settings → Environment Variables** untuk Production. Semua contoh rahasia harus diganti.

| Nama | Isi |
| --- | --- |
| `SESSION_SECRET` | Nilai acak minimal 32 karakter; buat dengan `npm run secrets` |
| `ADMIN_USERNAME` | Username administrator aplikasi, misalnya `admin_kdmp` |
| `ADMIN_PASSWORD` | Password administrator unik minimal 12 karakter |
| `ADMIN_EMAIL` | Email milik administrator yang benar-benar dapat menerima OTP |
| `ADMIN_UNIQUE_CODE` | Kode admin terpisah, minimal 8 karakter |
| `SMTP_USER` | Email pengirim OTP; dapat memakai `kkmmagelang@gmail.com` bila Anda menguasai akun itu |
| `SMTP_PASS` | App Password Google 16 karakter dari akun pengirim, **bukan password Gmail biasa** |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `BLOB_PREFIX` | `siakad-v5-production` untuk Production; gunakan nilai/store berbeda untuk Preview |
| `ALLOW_REGISTRATION` | `true` agar tab pendaftaran aktif; `false` untuk menutup pendaftaran mandiri |
| `SYNC_INTERVAL_MS` | `15000` (15 detik); `60000` mengurangi frekuensi pemeriksaan dan pemakaian kuota |

Variabel Blob dari koneksi proyek diisi oleh Vercel. Jangan membagikan token read-write. Preview yang mengakses namespace Production dapat mengubah data Production; pisahkan koneksi/prefix sesuai kebutuhan.

5. **Redeploy** setelah mengisi variabel dan menghubungkan Blob.
6. Buka **Portal Admin Aplikasi**, isi tiga kredensial administrator yang Anda tetapkan. OTP dikirim ke `ADMIN_EMAIL`. Verifikasi untuk masuk.
7. Buat akun usaha, verifikasi emailnya, lalu masuk dari laptop/HP lain menggunakan akun yang sama. Tambahkan karyawan lewat menu **Database Karyawan**; login karyawan memakai username akun usaha + ID karyawan + passwordnya sendiri.
8. Uji dua perangkat: ubah identitas/data pada perangkat A, tunggu badge **Tersinkron**, lalu tekan **Sinkronkan sekarang** di perangkat B. Periksa bahwa perubahan muncul. Uji OTP melalui Inbox dan Spam.

**Jika ada error:**

- “Hubungkan Blob Private”: periksa akses Private, koneksi proyek, environment, dan redeploy.
- “Email belum dikonfigurasi/Pengiriman OTP gagal”: periksa SMTP_USER, App Password, Verifikasi 2 Langkah, dan log deployment. Tidak ada kode simulasi pengganti.
- “Sesi berakhir”: login ulang; pergantian password dapat mencabut sesi perangkat lain.
- “Konflik”: unduh draf, muat versi cloud, lalu ulangi perubahan yang masih diperlukan.
- “Belum tersimpan”: jangan tutup tab; coba sinkronkan atau unduh draf JSON. Periksa koneksi dan kuota Vercel.

Kode dan pengujian disertakan; aktivasi layanan asli memerlukan pengaturan di akun Vercel/Gmail Anda. Paket gratis tetap memiliki kuota, sehingga layanan tidak dijanjikan gratis tanpa batas atau selalu tersedia ketika kuota habis.
