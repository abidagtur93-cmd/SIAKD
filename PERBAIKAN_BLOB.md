# Pembaruan v5.0.2 — konflik STORE_BUSY yang berulang

Pada tangkapan layar Anda, store sudah **Private**, berlokasi **SIN1**, folder `siakad-v5-production/` sudah ada, dan pemakaian masih jauh di bawah kuota yang ditampilkan. Gambar itu tidak menunjukkan error server atau koneksi environment, sehingga belum cukup untuk memastikan satu penyebab deployment.

Screenshot Runtime Logs berikutnya mengonfirmasi **release 5.0.1, status 409, kode STORE_BUSY, Production, Node 24, Singapore**. Artinya pembaruan sebelumnya sudah diterapkan, tetapi penulisan bersyarat tetap ditolak. Log itu belum mencatat penanda versi yang dibaca, sehingga penyebab persis di akun produksi belum dapat dipastikan.

## Perubahan v5.0.2

- Pembacaan meminta representasi asli (`Accept-Encoding: identity`) dan tetap memakai `useCache: false`.
- Setelah penolakan versi, aplikasi memeriksa metadata Blob **sebelum dan sesudah** membaca isi. Isi dan metadata harus menunjuk versi yang sama, lalu penyimpanan memakai ETag kuat dari metadata. Jika data berubah di tengah pembacaan, isi dibaca ulang. Aplikasi tidak menempelkan ETag baru ke isi lama dan tidak menonaktifkan `ifMatch`.
- Penanda respons lemah seperti `W/"versi"` hanya dapat dipulihkan bila metadata kuat yang cocok sudah diverifikasi. Simulasi kondisi ini menghasilkan STORE_BUSY pada kode 5.0.1 dan berhasil menyimpan pada 5.0.2. **Ini kemungkinan penyebab yang diuji, bukan bukti bahwa header produksi Anda demikian.**
- Konflik sementara mempertahankan draf dan tombol **Coba lagi**. Konflik perubahan pengguna yang memang bertabrakan tetap memerlukan rekonsiliasi.
- Log tambahan mencatat jumlah penolakan, perubahan metadata, ketidakcocokan versi, dan apakah ditemukan validator lemah. Log tidak memuat token, password, OTP, ETag mentah, atau isi akun.

**Untuk kasus STORE_BUSY ini, cukup perbarui file GitHub, deploy versi 5.0.2, lalu muat ulang.** Pertahankan store, BLOB_PREFIX, dan environment yang sudah digunakan. Pengecekan koneksi pada langkah berikut hanya diperlukan bila muncul kode akses/config yang sesuai.

Pemeriksaan metadata menambah operasi baca hanya pada jalur retry dan penghapusan. Pantau kuota operasi Blob; penanganan konflik tidak mengubah paket gratis menjadi tanpa batas.

## Perbaikan sebelumnya yang tetap disertakan

Kode v5.0.0 mengenali konflik dengan `error.name === 'BlobPreconditionFailedError'`. Pada SDK `@vercel/blob` 2.8.2, instance kelas tersebut memiliki `name` bernilai `Error`. Akibatnya, konflik ketika dua permintaan memperbarui dokumen yang sama bisa menjadi HTTP 503, padahal seharusnya dibaca ulang dan dicoba kembali.

Bug berhasil direproduksi pada uji penyimpanan bersamaan: kode lama menghasilkan 200 dan 503; sesudah perbaikan keduanya berhasil. Pengujian lama menggunakan exception simulasi dengan nama yang tidak sama dengan SDK asli. Fixture kini memakai kelas error asli, ditambah uji SDK asli dengan respons HTTP tiruan.

Pembaruan juga mengikuti prioritas autentikasi OIDC SDK, menolak kombinasi token dan store ID dari store berbeda, membedakan kegagalan akses/environment/pembatasan/waktu koneksi, serta menampilkan kode diagnosis dan nomor referensi untuk mencocokkan Runtime Logs. Pesan mentah provider, token, password, dan OTP tidak dicetak ke log.

## Langkah untuk instalasi yang sudah ada

1. Unduh dan ekstrak ZIP pembaruan. Unggah **isinya** ke root repository GitHub yang sudah terhubung dengan proyek Vercel, untuk memperbarui berkas dengan path yang sama. Pastikan file baru `lib/blob-errors.js` ikut terunggah. Jika ada modifikasi lain buatan Anda, gabungkan perubahan lebih dahulu.
2. Di Vercel, buka store **siakoperasidesa-blob → Projects**. Pastikan proyek aplikasi yang benar terhubung. Pada menu **⋯ → Update Project Connection**, aktifkan **Production** untuk domain utama. Jika membuka deployment Preview, koneksi dan environment variables untuk Preview juga harus tersedia.
3. Buka proyek aplikasi → **Settings → Environment Variables**. Pertahankan `BLOB_PREFIX=siakad-v5-production` yang sudah dipakai. Pastikan koneksi memakai prefix variabel **BLOB**, sehingga tersedia `BLOB_STORE_ID`. OIDC adalah jalur bawaan di Vercel; `VERCEL_OIDC_TOKEN` dikelola Vercel dan tidak perlu disalin manual.
4. Jika menggunakan `BLOB_READ_WRITE_TOKEN`, pastikan nilainya adalah token server untuk **store Private yang sama**, bukan nama store, URL, Store ID, atau webhook public key. Jangan menempelkan token ke GitHub atau percakapan. Dengan OIDC aktif, token statis tambahan tidak wajib.
5. Di **Deployments**, pastikan commit pembaruan berhasil diterapkan. Setelah mengubah koneksi atau environment variables, lakukan **Redeploy**. Buka domain deployment terbaru, lalu muat ulang penuh: Windows/Linux `Ctrl+Shift+R`, Mac `Cmd+Shift+R`.
6. Coba **Portal Admin Aplikasi** dan pengiriman OTP lagi. Kemudian uji akun yang sama dari dua perangkat.

**Pertahankan store dan folder data lama.** Pembaruan tetap memakai schema 5. Tidak perlu menghapus `private/auth.json`, membuat Blob baru, mengganti `BLOB_PREFIX`, atau mengganti `SESSION_SECRET`. Tindakan tersebut bukan langkah perbaikan dan dapat membuat akun/data tampak hilang atau sesi tidak berlaku.

## Bila masih gagal

Pesan baru menyertakan kode seperti `[BLOB_ACCESS_DENIED; ref a1b2c3d4]`. Di proyek Vercel, buka **Logs**, ulangi satu kali tindakan yang gagal, lalu cari nomor `ref` tersebut atau `SIAKAD backend failure` pada request `/api/cloud-sync`. Gunakan Runtime Logs; Build Logs hanya memperlihatkan proses build.

| Kode | Tindakan |
| --- | --- |
| `BLOB_READ_VERSION_MISMATCH` | Isi yang dibaca dan metadata tidak menunjuk versi sama. Kirim baris log lengkap dengan `readMetadataMismatch` dan `metadataChanged`. Jangan hapus data. |
| `BLOB_CONDITION_REJECTED` | Penyimpanan berulang kali ditolak walaupun metadata stabil. Kirim baris log lengkap; jumlah `writesRejected` dan `distinctMetadataVersions` membedakan kasus ini dari perubahan bersamaan. |
| `BLOB_METADATA_INVALID` | Metadata tidak menyediakan validator kuat; aplikasi menghentikan penulisan. Kirim kode/ref untuk pemeriksaan. |
| `BLOB_NOT_CONFIGURED` / `BLOB_CREDENTIAL_INVALID` | Periksa koneksi proyek, nama variabel BLOB, environment aktif, kemudian redeploy. |
| `BLOB_ACCESS_DENIED` / `BLOB_ENVIRONMENT_DENIED` | Periksa izin koneksi Production/Preview dan kredensial ke store yang benar; redeploy. |
| `BLOB_CREDENTIAL_MISMATCH` | Store ID dan token menunjuk store berbeda. Samakan dengan store yang berisi data lama. |
| `BLOB_STORE_NOT_FOUND` / `BLOB_STORE_SUSPENDED` | Periksa keberadaan/status store di dashboard Vercel. |
| `BLOB_RATE_LIMITED` | Tunggu, kurangi percobaan berulang, lalu periksa Usage dan batas operasi. |
| `BLOB_TIMEOUT` / `BLOB_UNAVAILABLE` | Coba kembali setelah jeda; periksa kode dan operasi pada Runtime Logs jika berulang. |
| `STORE_BUSY` | Versi belum dapat distabilkan setelah retry terbatas. Tunggu lalu coba lagi; bila berulang, kirim log lengkap release 5.0.2. Kode ini tidak membuktikan ada pengguna lain. |
| `BLOB_ETAG_MISSING` / `CORRUPT_STORE` / `INVALID_STORE_SCHEMA` | Jangan hapus atau menimpa dokumen. Simpan kode error untuk pemeriksaan lebih lanjut. |
| `SMTP_NOT_CONFIGURED` / `EMAIL_SEND_FAILED` | Periksa SMTP_USER, SMTP_PASS/App Password, SMTP_HOST, dan SMTP_PORT. Ini tahap email, terpisah dari koneksi Blob. |

Untuk bantuan lanjutan, cukup kirim kode error dan baris log diagnosis terkait. Jangan kirim password, token, OTP, cookie, atau isi `auth.json`.

## Pemeriksaan opsional dari komputer

Jika environment lokal sudah diisi dengan kredensial asli, jalankan `npm run check:connections`. Script membuat file probe acak, membacanya, memperbaruinya dengan ETag, memeriksa versi terbaru dan conditional read, lalu menghapus probe tersebut. Setelah itu script memverifikasi koneksi SMTP tanpa mengirim email. Dokumen akun/ruang kerja tidak dijadikan probe.

Akses langsung ke Blob dan Gmail akun Anda belum diuji karena kredensial tidak tersedia dalam sesi ini. Lulus tes lokal tidak membuktikan bahwa environment deployment sudah terhubung benar.

Referensi resmi:

- [Vercel Blob: koneksi proyek, OIDC, dan prioritas kredensial](https://vercel.com/docs/vercel-blob/using-blob-sdk)
- [Vercel Runtime Logs](https://vercel.com/docs/logs/runtime)
