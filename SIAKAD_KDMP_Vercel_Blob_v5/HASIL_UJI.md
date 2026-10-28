# Hasil pemeriksaan paket SIAKAD-KDMP v5

Tanggal: 28 Oktober 2026. Pemeriksaan dilakukan pada salinan perbaikan kode yang disertakan dalam ZIP.

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

## Browser — 2 skenario terpadu

1. **Registrasi, OTP, dua konteks browser terpisah, sinkronisasi, offline/online, refresh, jurnal, ekspor Excel, login karyawan, dan logout.** Data identitas dari perangkat A terbaca di B; perubahan offline B tersimpan setelah online dan muncul di A. Jurnal dua baris seimbang tersimpan melalui API. Excel yang diunduh dibuka kembali dan berisi sedikitnya 10 lembar. Form jurnal mempertahankan 8 kolom setelah sanitasi HTML. Menu pengelolaan yang tidak diizinkan disembunyikan/dinonaktifkan untuk karyawan. API kembali menolak akses setelah logout.
2. **Tampilan login ponsel dan sanitasi input HTML berbahaya.** Viewport 390 × 844 tidak mengalami overflow horizontal; script dan event handler berbahaya pada template HTML dihapus.

Pemeriksaan visual dilakukan pada tangkapan tampilan desktop dan ponsel. Tangkapan pengujian internal tidak dimasukkan ke ZIP.

## Build dan dependensi

- `npm run build`: berhasil.
- `npm run check`: sintaks entry point server dan aplikasi browser valid.
- `npm test`: 12 lulus.
- `npm run test:browser`: 2 lulus menggunakan Chromium headless lokal.
- `npm audit`: tidak melaporkan kerentanan pada dependensi terkunci saat pemeriksaan. Ini bukan jaminan tidak adanya celah keamanan. Override Zod 4.6.7 diterapkan pada dependensi transitif Vercel yang sebelumnya memakai versi terdampak.
- SheetJS browser: versi resmi 0.20.3, disertakan lokal. Tidak menggunakan paket npm XLSX 0.18.5 yang lama.

## Batas pengujian

Pengujian backend/browser menggunakan adapter Blob dan mailer **tiruan** untuk meniru penyimpanan bersama, konflik ETag, kegagalan provider, serta email terkirim/gagal tanpa mengirim pesan nyata. Tidak ada token Blob atau App Password Gmail milik Anda dalam paket.

**Akses Blob akun Anda, pengiriman SMTP ke Gmail, penerimaan di Inbox/Spam, serta deployment publik Vercel belum diuji langsung.** Setelah mengisi environment dan menghubungkan Blob Private, jalankan `npm run check:connections` untuk memeriksa layanan asli dari komputer yang sudah dikonfigurasi, lalu lakukan uji login OTP dan uji dua perangkat melalui URL deployment. Script koneksi melakukan probe kecil write/read/delete Blob serta autentikasi TLS SMTP; script tersebut tidak mengirim email.

Pengujian ini memeriksa integrasi penyimpanan, autentikasi, OTP, sinkronisasi, serta beberapa alur antarmuka. Paket tidak menyatakan seluruh perhitungan akuntansi telah diaudit profesional, tidak menjanjikan bebas kesalahan, dan tidak menjamin uptime atau kuota gratis tanpa batas.
