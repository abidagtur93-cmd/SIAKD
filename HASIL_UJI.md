# Hasil pemeriksaan paket SIAKAD-KDMP v5.0.2

Pembaruan: 29 Oktober 2026 (WIB). Pemeriksaan dilakukan pada salinan perbaikan kode yang disertakan dalam ZIP.

**Koreksi pengujian v5.0.0:** exception simulasi lama tidak mencerminkan `name` pada kelas error SDK asli. Setelah fixture memakai `BlobPreconditionFailedError` asli, uji konkurensi gagal dengan HTTP 503 pada kode lama. Pemeriksaan kelas error diperbaiki, lalu seluruh suite di bawah dijalankan ulang dan lulus. Hasil ini tidak memastikan penyebab deployment tertentu tanpa Runtime Logs.

## Backend — 12 skenario

| Skenario | Hasil |
| --- | --- |
| Pengunjung tanpa sesi ditolak saat membaca/menulis/menghapus ruang kerja | Lulus |
| Registrasi baru aktif setelah verifikasi OTP; kode/hash/password tidak dikirim ke browser | Lulus |
| OTP kedaluwarsa, batas percobaan, jeda pengiriman, replay, dan dua verifikasi bersamaan | Lulus |
| Gagal kirim email tidak menyelesaikan login dan tidak mengirim kode simulasi | Lulus |
| Isolasi dua koperasi; penolakan CSRF/origin yang salah | Lulus |
| Data tetap tersedia pada instance server baru; pembacaan bersyarat | Lulus |
| Penulisan dua perangkat: perubahan berbeda digabung, jurnal bertabrakan ditolak | Lulus |
| Jurnal tidak seimbang ditolak; retry idempotent; provider gagal tidak dinyatakan berhasil | Lulus |
| Login karyawan dari hash server, pembatasan perubahan, pencabutan sesi setelah reset | Lulus |
| Penggantian password mencabut sesi perangkat lain | Lulus |
| Administrator membuka/reset/menghapus akun; pengguna biasa ditolak; logout mencabut sesi | Lulus |
| Penerima OTP terikat pada challenge, tidak dapat diarahkan melalui parameter email/URL pengguna | Lulus |

## Adapter dan SDK — 15 skenario tambahan

1. SDK `@vercel/blob` asli menerima HTTP 412 dari transport tiruan, membaca ETag terbaru, mencoba ulang, mempertahankan perubahan server lain, membaca tanpa cache, menerima conditional GET, dan menghapus dengan ETag.
2. HTTP 403 dari private GET menjadi diagnosis akses ditolak.
3. Kelas exception asli membedakan akses, store tidak ada/ditangguhkan, pembatasan, timeout, dan environment OIDC.
4. OIDC diserahkan ke jalur refresh SDK; spasi token dibersihkan; kombinasi store berbeda ditolak sebelum I/O.
5. Dokumen tanpa ETag tidak ditimpa.
6. Konflik berulang berhenti dengan STORE_BUSY setelah retry terbatas.
7. Referensi error API cocok dengan log tanpa membocorkan pesan mentah/token/URL provider.
8. Stream terputus dibedakan dari JSON rusak.
9. SDK asli menerima weak ETag dari GET dan strong ETag dari HEAD, lalu pulih dengan conditional write yang tetap aktif.
10. Adapter memulihkan validator lemah yang cocok dengan metadata kuat, termasuk penghapusan bersyarat.
11. Isi lama tidak ditulis menggunakan metadata baru yang berbeda.
12. Data yang berubah di antara dua pembacaan metadata dibaca ulang sebelum callback mutasi dijalankan.
13. Penolakan berulang atas versi metadata yang tetap sama memperoleh diagnosis BLOB_CONDITION_REJECTED tanpa data mentah.
14. Metadata lemah tidak otomatis diubah menjadi validator kuat.
15. Gagal akses metadata tidak mengaktifkan penulisan tanpa kondisi.

Tiga uji transport memakai Undici MockAgent dengan koneksi jaringan asli dinonaktifkan. Ini menguji perilaku SDK sebenarnya terhadap respons tiruan, bukan akses ke akun Vercel nyata.

Kontrol pembanding memakai kode rilis 5.0.1 yang dikirim sebelumnya: simulasi weak ETag menghasilkan STORE_BUSY/409. Simulasi yang sama pada 5.0.2 berhasil menyimpan count=1. Kondisi weak ETag produksi pengguna belum terkonfirmasi; log lama hanya memuat kode, status, release, dan referensi.

## Browser — 4 skenario terpadu

1. **Registrasi, OTP, dua konteks browser terpisah, sinkronisasi, offline/online, refresh, jurnal, ekspor Excel, login karyawan, dan logout.** Data identitas dari perangkat A terbaca di B; perubahan offline B tersimpan setelah online dan muncul di A. Jurnal dua baris seimbang tersimpan melalui API. Excel yang diunduh dibuka kembali dan berisi sedikitnya 10 lembar. Form jurnal mempertahankan 8 kolom setelah sanitasi HTML. Menu pengelolaan yang tidak diizinkan disembunyikan/dinonaktifkan untuk karyawan. API kembali menolak akses setelah logout.
2. **Tampilan login ponsel dan sanitasi input HTML berbahaya.** Viewport 390 × 844 tidak mengalami overflow horizontal; script dan event handler berbahaya pada template HTML dihapus.
3. **Pesan diagnosis penyimpanan.** Halaman login menampilkan kode BLOB_ACCESS_DENIED beserta nomor referensi dari respons error API.
4. **Retry STORE_BUSY.** Penolakan penyimpanan sementara mempertahankan draf dan tombol coba lagi. Setelah provider tiruan kembali menerima permintaan, retry menyimpan perubahan yang sama. Skenario ini dijalankan ulang terpisah setelah melengkapi isian wajib dan mempertahankan error tiruan sampai tombol retry diuji.

Pemeriksaan visual dilakukan pada tangkapan tampilan desktop dan ponsel. Tangkapan pengujian internal tidak dimasukkan ke ZIP.

## Build dan dependensi

- `npm run build`: berhasil.
- `npm run check`: sintaks entry point server dan aplikasi browser valid.
- `npm test`: 27 lulus (12 alur backend + 15 adapter/SDK).
- `npm run test:browser`: keempat skenario lulus menggunakan Chromium headless lokal; tiga alur lama dalam suite, alur STORE_BUSY pada pengulangan terarah.
- `npm audit` pada rilis v5.0.0 tidak melaporkan kerentanan pada dependensi terkunci saat pemeriksaan. Versi dependensi 5.0.2 sama dengan 5.0.1. Ini bukan jaminan tidak adanya celah keamanan. Override Zod 4.6.7 tetap diterapkan.
- SheetJS browser: versi resmi 0.20.3, disertakan lokal. Tidak menggunakan paket npm XLSX 0.18.5 yang lama.

## Batas pengujian

Pengujian backend/browser menggunakan adapter Blob dan mailer **tiruan** untuk meniru penyimpanan bersama, konflik ETag, kegagalan provider, serta email terkirim/gagal tanpa mengirim pesan nyata. Tidak ada token Blob atau App Password Gmail milik Anda dalam paket.

**Akses Blob akun Anda, pengiriman SMTP ke Gmail, penerimaan di Inbox/Spam, serta deployment publik Vercel belum diuji langsung.** Setelah mengisi environment dan menghubungkan Blob Private, jalankan `npm run check:connections` untuk memeriksa layanan asli dari komputer yang sudah dikonfigurasi, lalu lakukan uji login OTP dan uji dua perangkat melalui URL deployment. Script koneksi melakukan probe kecil write/read/delete Blob serta autentikasi TLS SMTP; script tersebut tidak mengirim email.

Pengujian ini memeriksa integrasi penyimpanan, autentikasi, OTP, sinkronisasi, serta beberapa alur antarmuka. Paket tidak menyatakan seluruh perhitungan akuntansi telah diaudit profesional, tidak menjanjikan bebas kesalahan, dan tidak menjamin uptime atau kuota gratis tanpa batas.
