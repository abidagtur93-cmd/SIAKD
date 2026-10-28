# SIAKAD-KDMP v5 — Vercel Blob Private

Aplikasi akuntansi koperasi dari berkas yang Anda kirim, dengan penyimpanan bersama **Vercel Blob Private**, autentikasi di server, OTP email sungguhan melalui SMTP, serta sinkronisasi beberapa perangkat. Antarmuka dan modul akuntansi utama dipertahankan.

**Mulai dari `MULAI_DI_SINI.md`.** ZIP ini adalah kode sumber siap diunggah ke GitHub. Anda tetap harus menghubungkan Blob dan mengisi rahasia di Vercel sebelum aplikasi dapat dipakai. Tidak ada akun produksi, App Password, atau token storage yang ditanamkan di kode.

## Struktur proyek

```text
api/cloud-sync.js       Vercel Function: pintu masuk API
lib/                    Penyimpanan, sesi, OTP, otorisasi, dan penggabungan perubahan
public/                 HTML/JavaScript/CSS/aset yang boleh disajikan ke pengunjung
scripts/                Build, pemeriksaan koneksi, dan server lokal
test/                   Uji backend dan browser dengan layanan tiruan
vercel.json             Pengaturan deployment, region Singapore, dan header keamanan
package.json            Dependensi dan perintah
package-lock.json       Versi dependensi terkunci
.env.example            Contoh nama variabel; semua nilai rahasia harus diganti
```

Hanya `public/` yang menjadi direktori output statis. Kode server, pengujian, dan konfigurasi tidak ditempatkan di direktori publik. File PHP/MySQL serta wrapper PHPMailer lama digantikan oleh Vercel Function Node.js dan Nodemailer; jangan menambahkan file lama itu kembali sebagai aset publik.

## Pengaturan Vercel

1. Ekstrak ZIP. Unggah **isi folder proyek** ke root repository GitHub; jangan hanya mengunggah ZIP.
2. Import repository di Vercel. Framework: **Other**. Build: `npm run build`. Output: `public`. Node: **24.x**. Konfigurasi ini juga tersedia di `vercel.json`.
3. Buat/hubungkan **Blob**, region **Singapore / sin1**, akses **Private**, prefix variabel **BLOB**. Backend memakai autentikasi OIDC bawaan dari koneksi proyek. Token read-write tambahan boleh digunakan bila diperlukan; simpan hanya di environment server.
4. Masukkan variabel wajib di **Settings → Environment Variables** sebagaimana tabel di `MULAI_DI_SINI.md`. Aktifkan pada environment yang digunakan, lalu **Redeploy**.
5. Buka aplikasi. Pilih **Portal Admin Aplikasi**, masukkan username/password/kode admin yang Anda tetapkan. Terima OTP di `ADMIN_EMAIL`, lalu verifikasi.
6. Buat akun usaha melalui **Buat Akun Baru**. Akun aktif setelah email pendaftar diverifikasi. Login di perangkat lain memakai akun usaha yang sama dan OTP baru.

Untuk memisahkan pengujian dan produksi, gunakan **store Private terpisah untuk Preview**, atau set `BLOB_PREFIX=siakad-v5-preview` hanya pada Preview dan `BLOB_PREFIX=siakad-v5-production` pada Production. Namespace baru berarti instalasi/data baru; menggantinya tidak memindahkan data secara otomatis. Jangan memasang token dari store Public.

## OTP email

- Pengiriman memakai **Nodemailer**, bukan emulasi PHPMailer atau `mail()` PHP.
- Gmail: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=email pengirim`, `SMTP_PASS=App Password Google`. Port 465 memakai TLS langsung; port 587 wajib STARTTLS. Verifikasi sertifikat tetap aktif.
- Aktifkan Verifikasi 2 Langkah Google pada akun pengirim, lalu buat App Password di <https://myaccount.google.com/apppasswords>. Gunakan App Password tersebut, bukan password login Gmail. Spasi pada App Password dibuang otomatis. Ketersediaan App Password bergantung pada jenis/pengaturan akun Google.
- `SMTP_USER` adalah pengirim; `ADMIN_EMAIL` adalah penerima OTP administrator aplikasi. OTP akun usaha dikirim ke email yang diverifikasi saat pendaftaran. Keduanya boleh berbeda.
- OTP acak enam digit, berlaku **120 detik sejak SMTP menerima pengiriman**, satu kali pakai, maksimal lima percobaan, jeda kirim ulang 60 detik, dan pembatasan tambahan per email/IP. Pemeriksaan kode dan konsumsi OTP berlangsung di server dengan penulisan bersyarat.
- Kode/hash OTP tidak dikirim dalam respons API dan tidak dicetak ke log. Jika SMTP gagal, API mengembalikan error; tidak ada OTP simulasi atau bypass login. Respons sukses SMTP berarti pesan diterima layanan pengirim, bukan jaminan sudah tiba di Inbox; periksa Spam dan kebijakan provider.
- Administrator aplikasi memakai username + password + kode admin **serta** OTP email. Admin usaha memakai password + OTP. Karyawan memakai username akun usaha + ID karyawan + password tersendiri; tidak memerlukan password admin.
- Rahasia SMTP tidak pernah diterima dari request pengguna dan tidak diteruskan ke endpoint PHP/URL lain.

## Sesi dan pembatasan akses

Password disimpan sebagai hash scrypt dengan salt acak. Password lama tidak bisa dilihat lagi, termasuk oleh administrator; gunakan fitur ganti/reset password. Cookie sesi `HttpOnly`, `SameSite=Strict`, dan `Secure` di Vercel. Sesi berlaku maksimal delapan jam dan dapat dipulihkan saat refresh. Logout mencabut sesi di server. Pergantian/reset password mencabut seluruh sesi akun itu; perubahan password/penghapusan karyawan mencabut akses karyawan terkait.

Semua baca/tulis ruang kerja memerlukan sesi valid. Mutasi juga memerlukan CSRF token dan origin yang sesuai. Admin usaha hanya mengakses ruang kerjanya; administrator aplikasi boleh membuka ruang kerja akun lain melalui panel admin. Karyawan tidak dapat mengubah identitas koperasi, COA, akun/password karyawan, atau pengaturan akun. Karyawan operasional masih dapat membaca data usaha dan bekerja pada jurnal, anggota, supplier, serta persediaan sesuai fungsi antarmuka lama. Pembatasan tambahan menurut jabatan perlu kebijakan tersendiri bila dibutuhkan.

Antarmuka lama yang menggunakan template HTML dilindungi sanitizer DOMPurify dan Content Security Policy. Dependensi browser disajikan lokal. XLSX hanya dipakai untuk ekspor laporan; kode SheetJS resmi yang lebih baru disertakan sebagai aset.

## Sinkronisasi dan data bersama

- Sumber data utama adalah Blob, bukan `/tmp`, memori instance, localStorage, Redis, atau GitHub Gist. Tidak ada fallback diam-diam yang mengaku berhasil ketika Blob gagal.
- Dokumen autentikasi berada di `<BLOB_PREFIX>/private/auth.json`; ruang kerja dipisahkan menjadi `<BLOB_PREFIX>/workspaces/<UID>.json`.
- Pembacaan memakai `useCache: false` untuk mengambil versi terbaru. Penulisan memakai ETag `ifMatch` dan retry terbatas; penciptaan dokumen tidak mengizinkan overwrite.
- Klien mengirim versi dasar terakhir yang dikonfirmasi dan perubahan yang diinginkan. Perubahan independen dapat digabung; perubahan yang bertabrakan ditolak dengan HTTP 409. Semua baris jurnal dengan nomor bukti yang sama diperlakukan sebagai satu transaksi. Jurnal harus seimbang dan menggunakan akun COA yang valid.
- Setiap penyimpanan memiliki mutation ID agar pengulangan setelah koneksi terputus tidak membuat transaksi ganda.
- Secara default perangkat aktif memeriksa pembaruan setiap **15 detik**, setelah kembali online, dan saat tab kembali aktif. Tombol **Sinkronkan sekarang** tersedia. Ini polling berkala, bukan jaminan push instan/WebSocket. Saat pengguna sedang mengetik di formulir atau ada draf belum tersimpan, pembaruan tidak menimpa isian tersebut.
- Saat offline, perubahan ditahan sebagai draf **di tab perangkat itu**. Draf tidak otomatis muncul di perangkat lain sebelum berhasil dikirim. Perhatikan badge **Tersinkron**. Jangan menutup tab sebelum sinkron; ada peringatan keluar serta pilihan unduh draf JSON. Password baru karyawan tidak dimasukkan ke cadangan draf; masukkan ulang jika tab terlanjur ditutup sebelum penyimpanan berhasil.
- Konflik menampilkan pilihan unduh draf dan muat versi cloud. Tindakan muat versi cloud mengunduh salinan draf terlebih dahulu. Periksa/masukkan ulang perubahan yang bertabrakan agar tetap sesuai maksud pengguna.
- Saat data diimpor dari JSON, pemeriksaan izin, keseimbangan jurnal, dan konflik tetap dilakukan di server. Impor tidak membuat akun atau menghidupkan kredensial lama.

## Batas operasional yang perlu diketahui

Blob adalah object storage, sehingga implementasi ini menyediakan kontrol versi di tingkat ruang kerja untuk penggunaan aplikasi ini. Versi ini membatasi satu ruang kerja hingga **1,3 MB JSON**, request hingga 3,2 MB, dan tiap daftar hingga kurang dari 20.000 baris. File besar/lampiran sebaiknya dipisah dari JSON ruang kerja. Belum ada layanan unggah lampiran baru di antarmuka; dokumen laporan dapat diunduh melalui fitur ekspor yang tersedia.

Penggabungan data tidak berarti semua aturan bisnis otomatis terselesaikan. Dua kasir yang memperebutkan stok/nomor bukti atau pengguna yang mengubah transaksi yang sama mungkin perlu mengulang setelah membaca data terbaru. Audit pembukuan, aturan stok, dan otorisasi menurut jabatan tetap perlu disesuaikan dengan kebijakan koperasi; paket ini tidak menyatakan seluruh perhitungan akuntansi telah diaudit profesional.

Paket gratis Vercel/Blob memiliki kuota kapasitas, operasi baca/tulis, transfer data, dan penggunaan Functions. Polling, login, OTP, serta penyimpanan transaksi memakai kuota; **1 GB penyimpanan tidak berarti operasi/transfer tanpa batas**. Pada Hobby, layanan dapat dibatasi ketika kuota habis. Atur `SYNC_INTERVAL_MS=60000` untuk mengurangi frekuensi polling bila perlu, dan pantau Usage. Sesuaikan paket Vercel dengan ketentuan penggunaan personal/nonkomersial atau bisnis yang berlaku. Tidak ada jaminan uptime 24/7 atau gratis tanpa batas.

## Penggunaan lokal dan pengujian

```bash
npm ci
npm run build
npm test
npm run check
```

Untuk menguji layanan asli di komputer sendiri, salin `.env.example` menjadi `.env.local`, isi rahasia yang benar serta token read-write Blob Private, lalu jalankan:

```bash
npm run check:connections
npm start
```

`check:connections` menulis/membaca/menghapus dokumen probe kecil di Blob dan memverifikasi koneksi TLS/autentikasi SMTP; tidak mengirim email. Lakukan login melalui UI untuk memeriksa penerimaan OTP nyata. Jalur ini menggunakan layanan asli dan kuotanya. Anda juga dapat menggunakan `vercel env pull` dan `vercel dev` agar kredensial proyek tersedia secara otomatis.

Uji browser lokal memakai data serta mailer tiruan yang tidak diimpor oleh deployment produksi:

```bash
npx playwright install chromium
npm run test:browser
```

Server pengujian hanya mendengarkan localhost. Tidak ada endpoint publik untuk membaca OTP. `npm test` meliputi penolakan tamu, OTP/kegagalan email/masa berlaku/replay, isolasi koperasi, CSRF/origin, penulisan bersamaan, kegagalan provider, idempotensi, dan pembatasan karyawan. Lihat `HASIL_UJI.md` untuk hasil yang benar-benar dijalankan saat paket disiapkan. SMTP/Gmail dan Blob akun Anda belum diuji langsung karena kredensialnya tidak disertakan.

## Migrasi dari versi lama

Gunakan store/namespace baru untuk versi ini. Data localStorage lama tidak otomatis dipercaya sebagai akun atau ditransfer ke server. Ekspor data dari versi lama terlebih dahulu; buat akun aman baru, lalu impor JSON ruang kerja melalui akun yang sesuai. Password/OTP lama tidak dibawa. Karyawan hasil impor tanpa password baru tidak bisa login sampai admin menetapkan password baru. Jangan menyalin hash admin/kode statis dari versi lama ke aplikasi baru.

`ADMIN_*` hanya dipakai untuk pembuatan administrator **pertama** pada namespace kosong. Mengganti env tidak menimpa password/admin yang sudah tersimpan. Gunakan menu Ganti Password untuk akun aktif. Cadangkan data sebelum mengganti prefix, menghapus store, mengubah `SESSION_SECRET`, atau melakukan deployment yang mengubah skema. Mengubah `SESSION_SECRET` juga memengaruhi HMAC OTP/CSRF; sesi/challenge lama perlu login baru.

## Sumber teknis

- Vercel Blob dan autentikasi: <https://vercel.com/docs/vercel-blob>
- SDK, pembacaan konsisten, conditional writes: <https://vercel.com/docs/vercel-blob/using-blob-sdk>
- Harga/kuota Blob: <https://vercel.com/docs/vercel-blob/usage-and-pricing>
- Node.js Functions: <https://vercel.com/docs/functions/runtimes/node-js>
- Google App Password: <https://support.google.com/accounts/answer/185833>
- SMTP Nodemailer: <https://nodemailer.com/smtp>
- SheetJS resmi: <https://docs.sheetjs.com/docs/getting-started/installation/standalone/>
