import { equal, mergeState } from './shared-merge.js';
// ==================== DATA AWAL: COA 152 AKUN STANDAR KOPERASI (TERMASUK 3.4.2.01 LABA DITAHAN) ====================
    const INITIAL_COA = [{"no": 1, "full": "1.1.1.01 Kas Tunai", "code": "1.1.1.01", "name": "Kas Tunai", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 2, "full": "1.1.1.02 Kas di Bank BRI", "code": "1.1.1.02", "name": "Kas di Bank BRI", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 3, "full": "1.1.1.03 Kas di Bank Mandiri", "code": "1.1.1.03", "name": "Kas di Bank Mandiri", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 4, "full": "1.1.1.04 Kas di Bank BNI", "code": "1.1.1.04", "name": "Kas di Bank BNI", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 5, "full": "1.1.1.05 Kas di Bank BTN", "code": "1.1.1.05", "name": "Kas di Bank BTN", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 6, "full": "1.1.1.06 Kas di Bank BPD", "code": "1.1.1.06", "name": "Kas di Bank BPD", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 7, "full": "1.1.1.07 Kas di Bank BSI", "code": "1.1.1.07", "name": "Kas di Bank BSI", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 8, "full": "1.1.1.10 Kas Kecil (Petty Cash)", "code": "1.1.1.10", "name": "Kas Kecil (Petty Cash)", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 9, "full": "1.1.1.11 Deposito (< 3 bulan)", "code": "1.1.1.11", "name": "Deposito (< 3 bulan)", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.1"}, {"no": 10, "full": "1.1.2.01 Piutang Usaha", "code": "1.1.2.01", "name": "Piutang Usaha", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.2"}, {"no": 11, "full": "1.1.2.02 Piutang kepada Pegawai", "code": "1.1.2.02", "name": "Piutang kepada Pegawai", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.2"}, {"no": 12, "full": "1.1.2.03 Piutang Simpanan Pokok Anggota", "code": "1.1.2.03", "name": "Piutang Simpanan Pokok Anggota", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.2"}, {"no": 13, "full": "1.1.2.04 Piutang Simpanan Wajib Anggota", "code": "1.1.2.04", "name": "Piutang Simpanan Wajib Anggota", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.2"}, {"no": 14, "full": "1.1.2.05 Piutang Anggota", "code": "1.1.2.05", "name": "Piutang Anggota", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.2"}, {"no": 15, "full": "1.1.3.01 Penyisihan Piutang Usaha Tak Tertagih", "code": "1.1.3.01", "name": "Penyisihan Piutang Usaha Tak Tertagih", "normal": "Kredit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.3"}, {"no": 16, "full": "1.1.3.02 Penyisihan Piutang kepada Pegawai Tak Tertagih", "code": "1.1.3.02", "name": "Penyisihan Piutang kepada Pegawai Tak Tertagih", "normal": "Kredit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.3"}, {"no": 17, "full": "1.1.3.03 Penyisihan Piutang Simpanan Pokok Anggota Tak Tertagih", "code": "1.1.3.03", "name": "Penyisihan Piutang Simpanan Pokok Anggota Tak Tertagih", "normal": "Kredit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.3"}, {"no": 18, "full": "1.1.3.04 Penyisihan Piutang Simpanan Wajib Anggota Tak Tertagih", "code": "1.1.3.04", "name": "Penyisihan Piutang Simpanan Wajib Anggota Tak Tertagih", "normal": "Kredit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.3"}, {"no": 19, "full": "1.1.4.01 Persediaan Barang Dagangan", "code": "1.1.4.01", "name": "Persediaan Barang Dagangan", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.4"}, {"no": 20, "full": "1.1.4.02 Persediaan ATK", "code": "1.1.4.02", "name": "Persediaan ATK", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.4"}, {"no": 21, "full": "1.1.4.03 Perlengkapan", "code": "1.1.4.03", "name": "Perlengkapan", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.4"}, {"no": 22, "full": "1.1.5.01 Sewa Dibayar Dimuka", "code": "1.1.5.01", "name": "Sewa Dibayar Dimuka", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.5"}, {"no": 23, "full": "1.1.5.02 Asuransi Dibayar Dimuka", "code": "1.1.5.02", "name": "Asuransi Dibayar Dimuka", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.5"}, {"no": 24, "full": "1.1.5.03 PPh 25", "code": "1.1.5.03", "name": "PPh 25", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.5"}, {"no": 25, "full": "1.1.5.04 PPN Masukan", "code": "1.1.5.04", "name": "PPN Masukan", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.5"}, {"no": 26, "full": "1.1.8.99 Aset Lancar Lainnya", "code": "1.1.8.99", "name": "Aset Lancar Lainnya", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.8"}, {"no": 27, "full": "1.1.9.01 RK Pusat", "code": "1.1.9.01", "name": "RK Pusat", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.9"}, {"no": 28, "full": "1.1.9.02 RK Unit Toko", "code": "1.1.9.02", "name": "RK Unit Toko", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.9"}, {"no": 29, "full": "1.1.9.03 RK Pusat Unit Apotek", "code": "1.1.9.03", "name": "RK Pusat Unit Apotek", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.9"}, {"no": 30, "full": "1.1.9.04 RK Unit Simpan Pinjam", "code": "1.1.9.04", "name": "RK Unit Simpan Pinjam", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.9"}, {"no": 31, "full": "1.1.9.05 RK Unit Klinik", "code": "1.1.9.05", "name": "RK Unit Klinik", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.9"}, {"no": 32, "full": "1.1.9.06 RK Unit Gudang", "code": "1.1.9.06", "name": "RK Unit Gudang", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.9"}, {"no": 33, "full": "1.1.9.07 RK Unit Logistik", "code": "1.1.9.07", "name": "RK Unit Logistik", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.1", "lvl3": "1.1.9"}, {"no": 34, "full": "1.2.1.01 Investasi dalam Deposito", "code": "1.2.1.01", "name": "Investasi dalam Deposito", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.2", "lvl3": "1.2.1"}, {"no": 35, "full": "1.2.1.99 Investasi Lainnya", "code": "1.2.1.99", "name": "Investasi Lainnya", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.2", "lvl3": "1.2.1"}, {"no": 36, "full": "1.3.1.01 Tanah", "code": "1.3.1.01", "name": "Tanah", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.3", "lvl3": "1.3.1"}, {"no": 37, "full": "1.3.2.01 Gedung dan Bangunan", "code": "1.3.2.01", "name": "Gedung dan Bangunan", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.3", "lvl3": "1.3.2"}, {"no": 38, "full": "1.3.3.01 Peralatan dan Meubelair", "code": "1.3.3.01", "name": "Peralatan dan Meubelair", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.3", "lvl3": "1.3.3"}, {"no": 39, "full": "1.3.4.01 Kendaraan", "code": "1.3.4.01", "name": "Kendaraan", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.3", "lvl3": "1.3.4"}, {"no": 40, "full": "1.3.5.01 Akumulasi Penyusutan Gedung dan Bangunan", "code": "1.3.5.01", "name": "Akumulasi Penyusutan Gedung dan Bangunan", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.3", "lvl3": "1.3.5"}, {"no": 41, "full": "1.3.5.02 Akumulasi Penyusutan Peralatan dan Meubelair", "code": "1.3.5.02", "name": "Akumulasi Penyusutan Peralatan dan Meubelair", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.3", "lvl3": "1.3.5"}, {"no": 42, "full": "1.3.5.03 Akumulasi Penyusutan Kendaraan", "code": "1.3.5.03", "name": "Akumulasi Penyusutan Kendaraan", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.3", "lvl3": "1.3.5"}, {"no": 43, "full": "1.3.9.99 Aset Tetap Lainnya", "code": "1.3.9.99", "name": "Aset Tetap Lainnya", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.3", "lvl3": "1.3.9"}, {"no": 44, "full": "1.4.1.01 Software", "code": "1.4.1.01", "name": "Software", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.4", "lvl3": "1.4.1"}, {"no": 45, "full": "1.4.2.01 Amortisasi Aset Tidak Berwujud", "code": "1.4.2.01", "name": "Amortisasi Aset Tidak Berwujud", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.4", "lvl3": "1.4.2"}, {"no": 46, "full": "1.5.1.01 Investasi Jangka Panjang", "code": "1.5.1.01", "name": "Investasi Jangka Panjang", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.5", "lvl3": "1.5.1"}, {"no": 47, "full": "1.9.1.99 Aset Lain-lain lainnya", "code": "1.9.1.99", "name": "Aset Lain-lain lainnya", "normal": "Debit", "budget": 0, "lvl1": "1", "lvl2": "1.9", "lvl3": "1.9.1"}, {"no": 48, "full": "2.1.1.01 Utang Simpanan Pokok", "code": "2.1.1.01", "name": "Utang Simpanan Pokok", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.1"}, {"no": 49, "full": "2.1.1.02 Utang Simpanan Wajib", "code": "2.1.1.02", "name": "Utang Simpanan Wajib", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.1"}, {"no": 50, "full": "2.1.1.03 Utang Simpanan Sukarela", "code": "2.1.1.03", "name": "Utang Simpanan Sukarela", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.1"}, {"no": 51, "full": "2.1.2.01 Utang SHU", "code": "2.1.2.01", "name": "Utang SHU", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.2"}, {"no": 52, "full": "2.1.3.01 Utang Usaha", "code": "2.1.3.01", "name": "Utang Usaha", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.3"}, {"no": 53, "full": "2.1.3.02 Utang Dana Bergulir", "code": "2.1.3.02", "name": "Utang Dana Bergulir", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.3"}, {"no": 54, "full": "2.1.4.01 PPN Keluaran", "code": "2.1.4.01", "name": "PPN Keluaran", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.4"}, {"no": 55, "full": "2.1.4.02 PPh 21", "code": "2.1.4.02", "name": "PPh 21", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.4"}, {"no": 56, "full": "2.1.4.03 PPh 23", "code": "2.1.4.03", "name": "PPh 23", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.4"}, {"no": 57, "full": "2.1.4.04 PPh 29", "code": "2.1.4.04", "name": "PPh 29", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.4"}, {"no": 58, "full": "2.1.5.01 Utang Gaji dan Tunjangan", "code": "2.1.5.01", "name": "Utang Gaji dan Tunjangan", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.5"}, {"no": 59, "full": "2.1.6.01 Utang Listrik", "code": "2.1.6.01", "name": "Utang Listrik", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.6"}, {"no": 60, "full": "2.1.6.02 Utang Telepon", "code": "2.1.6.02", "name": "Utang Telepon", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.6"}, {"no": 61, "full": "2.1.6.99 Utang Utilitas Lainnya", "code": "2.1.6.99", "name": "Utang Utilitas Lainnya", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.6"}, {"no": 62, "full": "2.1.7.01 Pendapatan Sewa Diterima Dimuka", "code": "2.1.7.01", "name": "Pendapatan Sewa Diterima Dimuka", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.7"}, {"no": 63, "full": "2.1.8.01 Utang kepada Pihak Ketiga Jk. Pendek", "code": "2.1.8.01", "name": "Utang kepada Pihak Ketiga Jk. Pendek", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.8"}, {"no": 64, "full": "2.1.8.99 Utang kepada Pihak Ketiga Jk. Pendek Lainnya", "code": "2.1.8.99", "name": "Utang kepada Pihak Ketiga Jk. Pendek Lainnya", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.8"}, {"no": 65, "full": "2.1.9.99 Utang Jangka Pendek Lainnya", "code": "2.1.9.99", "name": "Utang Jangka Pendek Lainnya", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.1", "lvl3": "2.1.9"}, {"no": 66, "full": "2.2.1.01 Utang kepada Pihak Ketiga Jk. Panjang", "code": "2.2.1.01", "name": "Utang kepada Pihak Ketiga Jk. Panjang", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.2", "lvl3": "2.2.1"}, {"no": 67, "full": "2.2.2.01 Utang Ke Bank", "code": "2.2.2.01", "name": "Utang Ke Bank", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.2", "lvl3": "2.2.2"}, {"no": 68, "full": "2.2.9.99 Utang Jangka Panjang Lainnya", "code": "2.2.9.99", "name": "Utang Jangka Panjang Lainnya", "normal": "Kredit", "budget": 0, "lvl1": "2", "lvl2": "2.2", "lvl3": "2.2.9"}, {"no": 69, "full": "3.1.1.01 Simpanan Pokok", "code": "3.1.1.01", "name": "Simpanan Pokok", "normal": "Kredit", "budget": 0, "lvl1": "3", "lvl2": "3.1", "lvl3": "3.1.1"}, {"no": 70, "full": "3.1.2.01 Simpanan Wajib", "code": "3.1.2.01", "name": "Simpanan Wajib", "normal": "Kredit", "budget": 0, "lvl1": "3", "lvl2": "3.1", "lvl3": "3.1.2"}, {"no": 71, "full": "3.1.3.01 Simpanan Sukarela", "code": "3.1.3.01", "name": "Simpanan Sukarela", "normal": "Kredit", "budget": 0, "lvl1": "3", "lvl2": "3.1", "lvl3": "3.1.3"}, {"no": 72, "full": "3.2.1.01 Hibah", "code": "3.2.1.01", "name": "Hibah", "normal": "Kredit", "budget": 0, "lvl1": "3", "lvl2": "3.2", "lvl3": "3.2.1"}, {"no": 73, "full": "3.3.1.01 Cadangan", "code": "3.3.1.01", "name": "Cadangan", "normal": "Kredit", "budget": 0, "lvl1": "3", "lvl2": "3.3", "lvl3": "3.3.1"}, {"no": 74, "full": "3.4.1.01 Sisa Hasil Usaha Belum Dibagikan", "code": "3.4.1.01", "name": "Sisa Hasil Usaha Belum Dibagikan", "normal": "Kredit", "budget": 0, "lvl1": "3", "lvl2": "3.4", "lvl3": "3.4.1"}, {"no": 75, "full": "3.4.2.01 Laba Ditahan", "code": "3.4.2.01", "name": "Laba Ditahan", "normal": "Kredit", "budget": 0, "lvl1": "3", "lvl2": "3.4", "lvl3": "3.4.2"}, {"no": 76, "full": "3.9.1.01 Ikhtisar Sisa Hasil Usaha", "code": "3.9.1.01", "name": "Ikhtisar Sisa Hasil Usaha", "normal": "Kredit", "budget": 0, "lvl1": "3", "lvl2": "3.9", "lvl3": "3.9.1"}, {"no": 77, "full": "4.1.1.01 4.1.1.01 Pendapatan Penjualan Barang Dagangan (Anggota)", "code": "4.1.1.01", "name": "Pendapatan Penjualan Barang Dagangan (Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.1", "lvl3": "4.1.1"}, {"no": 78, "full": "4.1.1.02 4.1.1.02 Pendapatan Komisi Konsinyasi", "code": "4.1.1.02", "name": "Pendapatan Komisi Konsinyasi", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.1", "lvl3": "4.1.1"}, {"no": 79, "full": "4.1.2.01 Pendapatan Penjualan Barang Jadi Anggota", "code": "4.1.2.01", "name": "Pendapatan Penjualan Barang Jadi Anggota", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.1", "lvl3": "4.1.2"}, {"no": 80, "full": "4.1.3.01 Pendapatan Jasa Dokter (Anggota)", "code": "4.1.3.01", "name": "Pendapatan Jasa Dokter (Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.1", "lvl3": "4.1.3"}, {"no": 81, "full": "4.1.3.02 Pendapatan Jasa Pinjaman (Anggota)", "code": "4.1.3.02", "name": "Pendapatan Jasa Pinjaman (Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.1", "lvl3": "4.1.3"}, {"no": 82, "full": "4.1.3.03 Pendapatan Jasa Sewa (Anggota)", "code": "4.1.3.03", "name": "Pendapatan Jasa Sewa (Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.1", "lvl3": "4.1.3"}, {"no": 83, "full": "4.1.3.04 Pendapatan Jasa Pengiriman (Anggota)", "code": "4.1.3.04", "name": "Pendapatan Jasa Pengiriman (Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.1", "lvl3": "4.1.3"}, {"no": 84, "full": "4.1.9.01 Pendapatan Pelayanan Anggota Lainnya", "code": "4.1.9.01", "name": "Pendapatan Pelayanan Anggota Lainnya", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.1", "lvl3": "4.1.9"}, {"no": 85, "full": "4.2.1.01 4.2.1.01 Pendapatan Penjualan Barang Dagangan (Non-Anggota)", "code": "4.2.1.01", "name": "Pendapatan Penjualan Barang Dagangan (Non-Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.2", "lvl3": "4.2.1"}, {"no": 86, "full": "4.2.2.01 Pendapatan Penjualan Barang Jadi (Non-Anggota)", "code": "4.2.2.01", "name": "Pendapatan Penjualan Barang Jadi (Non-Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.2", "lvl3": "4.2.2"}, {"no": 87, "full": "4.2.3.01 Pendapatan Jasa Dokter (Non-Anggota)", "code": "4.2.3.01", "name": "Pendapatan Jasa Dokter (Non-Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.2", "lvl3": "4.2.3"}, {"no": 88, "full": "4.2.3.02 Pendapatan Jasa Pinjaman (Non-Anggota)", "code": "4.2.3.02", "name": "Pendapatan Jasa Pinjaman (Non-Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.2", "lvl3": "4.2.3"}, {"no": 89, "full": "4.2.3.03 Pendapatan Jasa Sewa (Non-Anggota)", "code": "4.2.3.03", "name": "Pendapatan Jasa Sewa (Non-Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.2", "lvl3": "4.2.3"}, {"no": 90, "full": "4.2.3.04 Pendapatan Jasa Pengiriman (Non-Anggota)", "code": "4.2.3.04", "name": "Pendapatan Jasa Pengiriman (Non-Anggota)", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.2", "lvl3": "4.2.3"}, {"no": 91, "full": "4.2.9.01 Pendapatan Pelayanan Non-Anggota Lainnya", "code": "4.2.9.01", "name": "Pendapatan Pelayanan Non-Anggota Lainnya", "normal": "Kredit", "budget": 0, "lvl1": "4", "lvl2": "4.2", "lvl3": "4.2.9"}, {"no": 92, "full": "5.1.1.01 5.1.1.01 Harga Pokok Penjualan Barang Dagangan", "code": "5.1.1.01", "name": "Harga Pokok Penjualan Barang Dagangan", "normal": "Debit", "budget": 0, "lvl1": "5", "lvl2": "5.1", "lvl3": "5.1.1"}, {"no": 93, "full": "5.1.1.02 Harga Pokok Penjualan Barang Jadi", "code": "5.1.1.02", "name": "Harga Pokok Penjualan Barang Jadi", "normal": "Debit", "budget": 0, "lvl1": "5", "lvl2": "5.1", "lvl3": "5.1.1"}, {"no": 94, "full": "5.2.1.01 Harga Pokok Produksi", "code": "5.2.1.01", "name": "Harga Pokok Produksi", "normal": "Debit", "budget": 0, "lvl1": "5", "lvl2": "5.2", "lvl3": "5.2.1"}, {"no": 95, "full": "6.1.1.01 Beban Gaji dan Tunjangan Pegawai", "code": "6.1.1.01", "name": "Beban Gaji dan Tunjangan Pegawai", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.1"}, {"no": 96, "full": "6.1.1.02 Beban Gaji dan Tunjangan Pengawas", "code": "6.1.1.02", "name": "Beban Gaji dan Tunjangan Pengawas", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.1"}, {"no": 97, "full": "6.1.1.03 Beban Honor Lembur", "code": "6.1.1.03", "name": "Beban Honor Lembur", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.1"}, {"no": 98, "full": "6.1.1.04 Beban Insentif (Bonus)", "code": "6.1.1.04", "name": "Beban Insentif (Bonus)", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.1"}, {"no": 99, "full": "6.1.1.05 Beban Komisi", "code": "6.1.1.05", "name": "Beban Komisi", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.1"}, {"no": 100, "full": "6.1.1.06 Beban Seragam Pegawai", "code": "6.1.1.06", "name": "Beban Seragam Pegawai", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.1"}, {"no": 101, "full": "6.1.1.07 Beban Penguatan SDM", "code": "6.1.1.07", "name": "Beban Penguatan SDM", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.1"}, {"no": 102, "full": "6.1.1.99 Beban Pegawai  Lainnya", "code": "6.1.1.99", "name": "Beban Pegawai  Lainnya", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.1"}, {"no": 103, "full": "6.1.2.01 6.1.2.01 Beban ATK", "code": "6.1.2.01", "name": "Beban ATK", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.2"}, {"no": 104, "full": "6.1.2.02 Beban Foto Copy", "code": "6.1.2.02", "name": "Beban Foto Copy", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.2"}, {"no": 105, "full": "6.1.2.03 Beban Konsumsi Rapat", "code": "6.1.2.03", "name": "Beban Konsumsi Rapat", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.2"}, {"no": 106, "full": "6.1.2.04 Beban Cetak dan Dekorasi", "code": "6.1.2.04", "name": "Beban Cetak dan Dekorasi", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.2"}, {"no": 107, "full": "6.1.2.99 Beban Perlengkapan Lainnya", "code": "6.1.2.99", "name": "Beban Perlengkapan Lainnya", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.2"}, {"no": 108, "full": "6.1.3.01 Beban Pemeliharaan dan Perbaikan", "code": "6.1.3.01", "name": "Beban Pemeliharaan dan Perbaikan", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.3"}, {"no": 109, "full": "6.1.4.01 Beban Listrik", "code": "6.1.4.01", "name": "Beban Listrik", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.4"}, {"no": 110, "full": "6.1.4.02 Beban Telepon dan Internet", "code": "6.1.4.02", "name": "Beban Telepon dan Internet", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.4"}, {"no": 111, "full": "6.1.4.99 Beban Utilitas Lainnya", "code": "6.1.4.99", "name": "Beban Utilitas Lainnya", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.4"}, {"no": 112, "full": "6.1.5.01 Beban Sewa", "code": "6.1.5.01", "name": "Beban Sewa", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.5"}, {"no": 113, "full": "6.1.5.02 Beban Asuransi", "code": "6.1.5.02", "name": "Beban Asuransi", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.5"}, {"no": 114, "full": "6.1.6.01 Beban Keamanan", "code": "6.1.6.01", "name": "Beban Keamanan", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.6"}, {"no": 115, "full": "6.1.6.02 Beban Kebersihan", "code": "6.1.6.02", "name": "Beban Kebersihan", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.6"}, {"no": 116, "full": "6.1.7.01 Beban Penyisihan Piutang Tak Tertagih", "code": "6.1.7.01", "name": "Beban Penyisihan Piutang Tak Tertagih", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.7"}, {"no": 117, "full": "6.1.8.02 Beban Penyusutan Gedung dan Bangunan", "code": "6.1.8.02", "name": "Beban Penyusutan Gedung dan Bangunan", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.8"}, {"no": 118, "full": "6.1.8.03 Beban Penyusutan Peralatan dan Meubelair", "code": "6.1.8.03", "name": "Beban Penyusutan Peralatan dan Meubelair", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.8"}, {"no": 119, "full": "6.1.8.04 Beban Penyusutan Kendaraan", "code": "6.1.8.04", "name": "Beban Penyusutan Kendaraan", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.8"}, {"no": 120, "full": "6.1.8.05 Beban Amortisasi Aset Tak Berwujud", "code": "6.1.8.05", "name": "Beban Amortisasi Aset Tak Berwujud", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.8"}, {"no": 121, "full": "6.1.9.01 Beban Parkir", "code": "6.1.9.01", "name": "Beban Parkir", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 122, "full": "6.1.9.02 Beban Laundry", "code": "6.1.9.02", "name": "Beban Laundry", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 123, "full": "6.1.9.03 Beban Pendamping", "code": "6.1.9.03", "name": "Beban Pendamping", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 124, "full": "6.1.9.04 Beban Pengawas", "code": "6.1.9.04", "name": "Beban Pengawas", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 125, "full": "6.1.9.05 Beban Audit", "code": "6.1.9.05", "name": "Beban Audit", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 126, "full": "6.1.9.06 Beban Perjalanan Dinas", "code": "6.1.9.06", "name": "Beban Perjalanan Dinas", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 127, "full": "6.1.9.07 Beban Transportasi", "code": "6.1.9.07", "name": "Beban Transportasi", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 128, "full": "6.1.9.08 Beban Jamuan Tamu", "code": "6.1.9.08", "name": "Beban Jamuan Tamu", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 129, "full": "6.1.9.99 Beban Administrasi dan Umum Lainnya", "code": "6.1.9.99", "name": "Beban Administrasi dan Umum Lainnya", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.1", "lvl3": "6.1.9"}, {"no": 130, "full": "6.2.1.01 Beban Gaji dan Tunjangan Bag. Pemasaran", "code": "6.2.1.01", "name": "Beban Gaji dan Tunjangan Bag. Pemasaran", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.2", "lvl3": "6.2.1"}, {"no": 131, "full": "6.2.2.01 Beban Iklan", "code": "6.2.2.01", "name": "Beban Iklan", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.2", "lvl3": "6.2.2"}, {"no": 132, "full": "6.2.2.02 Beban Promosi", "code": "6.2.2.02", "name": "Beban Promosi", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.2", "lvl3": "6.2.2"}, {"no": 133, "full": "6.2.2.03 Beban Dana Sosial", "code": "6.2.2.03", "name": "Beban Dana Sosial", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.2", "lvl3": "6.2.2"}, {"no": 134, "full": "6.2.3.99 Beban Pemasaran Lainnya", "code": "6.2.3.99", "name": "Beban Pemasaran Lainnya", "normal": "Debit", "budget": 0, "lvl1": "6", "lvl2": "6.2", "lvl3": "6.2.3"}, {"no": 135, "full": "9.1.1.01 Pendapatan Bunga", "code": "9.1.1.01", "name": "Pendapatan Bunga", "normal": "Kredit", "budget": 0, "lvl1": "9", "lvl2": "9.1", "lvl3": "9.1.1"}, {"no": 136, "full": "9.1.2.01 Pendapatan Sewa", "code": "9.1.2.01", "name": "Pendapatan Sewa", "normal": "Kredit", "budget": 0, "lvl1": "9", "lvl2": "9.1", "lvl3": "9.1.2"}, {"no": 137, "full": "9.1.3.01 Pendapatan Denda", "code": "9.1.3.01", "name": "Pendapatan Denda", "normal": "Kredit", "budget": 0, "lvl1": "9", "lvl2": "9.1", "lvl3": "9.1.3"}, {"no": 138, "full": "9.1.4.01 Pendapatan Iklan", "code": "9.1.4.01", "name": "Pendapatan Iklan", "normal": "Kredit", "budget": 0, "lvl1": "9", "lvl2": "9.1", "lvl3": "9.1.4"}, {"no": 139, "full": "9.1.9.99 Pendapatan Lain-lain lainnya", "code": "9.1.9.99", "name": "Pendapatan Lain-lain lainnya", "normal": "Kredit", "budget": 0, "lvl1": "9", "lvl2": "9.1", "lvl3": "9.1.9"}, {"no": 140, "full": "9.2.1.01 Beban Administrasi Bank", "code": "9.2.1.01", "name": "Beban Administrasi Bank", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.2", "lvl3": "9.2.1"}, {"no": 141, "full": "9.2.2.01 Beban Bunga", "code": "9.2.2.01", "name": "Beban Bunga", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.2", "lvl3": "9.2.2"}, {"no": 142, "full": "9.2.3.01 Beban Sewa", "code": "9.2.3.01", "name": "Beban Sewa", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.2", "lvl3": "9.2.3"}, {"no": 143, "full": "9.2.9.99 Beban Lain-lain lainnya", "code": "9.2.9.99", "name": "Beban Lain-lain lainnya", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.2", "lvl3": "9.2.9"}, {"no": 144, "full": "9.3.1.01 Beban Pajak Bunga Bank", "code": "9.3.1.01", "name": "Beban Pajak Bunga Bank", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}, {"no": 145, "full": "9.3.1.02 Beban Pajak Reklame", "code": "9.3.1.02", "name": "Beban Pajak Reklame", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}, {"no": 146, "full": "9.3.1.03 Beban PPh 21", "code": "9.3.1.03", "name": "Beban PPh 21", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}, {"no": 147, "full": "9.3.1.04 Beban PPh 23", "code": "9.3.1.04", "name": "Beban PPh 23", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}, {"no": 148, "full": "9.3.1.05 Beban PPh 25", "code": "9.3.1.05", "name": "Beban PPh 25", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}, {"no": 149, "full": "9.3.1.06 Beban PPh 29", "code": "9.3.1.06", "name": "Beban PPh 29", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}, {"no": 150, "full": "9.3.1.07 Beban PPh Final", "code": "9.3.1.07", "name": "Beban PPh Final", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}, {"no": 151, "full": "9.3.1.08 Beban PPh Koperasi", "code": "9.3.1.08", "name": "Beban PPh Koperasi", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}, {"no": 152, "full": "9.3.1.99 Beban Pajak Lainnya", "code": "9.3.1.99", "name": "Beban Pajak Lainnya", "normal": "Debit", "budget": 0, "lvl1": "9", "lvl2": "9.3", "lvl3": "9.3.1"}];

    const CASHFLOW_COMPONENTS = [
      "",
      "Penerimaan Kas dari Pelayanan kepada Anggota",
      "Penerimaan Kas dari Non Anggota",
      "Penerimaan Pendapatan Lain-lain",
      "Pembelian Harga Pokok Barang",
      "Pembayaran Beban Administrasi",
      "Pembayaran Beban Pemasaran",
      "Pengeluaran Beban Lain-lain",
      "Pembayaran Beban Telepon",
      "Pembayaran Pajak",
      "Penjualan Aset Tetap",
      "Penjualan Investasi",
      "Pembelian Aset Tetap",
      "Pengeluaran Investasi",
      "Simpanan Anggota",
      "Simpanan Lainnya",
      "Hibah",
      "Pinjaman Jangka Panjang",
      "Pembayaran Utang Jangka Panjang",
      "Pembagian SHU"
    ];

    const INITIAL_IDENTITY = {
      coopName: "",
      unitUsaha: "",
      province: "",
      city: "",
      address: "",
      startDate: "",
      endDate: "",
      chairmanName: "",
      chairmanNik: "",
      accountantName: "",
      accountantNik: ""
    };

    // Saat membuat Akun Usaha baru, Daftar Barang, Anggota, Karyawan, Supplier & Identitas dimulai kosong (0 data)
    const INITIAL_ITEMS = [];
    const INITIAL_MEMBERS = [];
    const INITIAL_EMPLOYEES = [];
    const INITIAL_SUPPLIERS = [];

    const INITIAL_JOURNALS = [];

    // ==================== ENGINE KRIPTOGRAFI SHA-256 & REVERSIBLE CIPHER (TERENKRIPSI DI F12 NAMUN TERBUKA BAGI ADMIN) ====================
    function sha256Hash(asciiInput) {
      let ascii = "KDMP_SEC_2026_" + String(asciiInput || "");
      function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
      }
      const mathPow = Math.pow;
      const maxWord = mathPow(2, 32);
      const lengthProperty = "length";
      let i, j;
      let result = "";
      const words = [];
      const asciiBitLength = ascii[lengthProperty] * 8;
      let hash = sha256Hash.h = sha256Hash.h || [];
      const k = sha256Hash.k = sha256Hash.k || [];
      let primeCounter = k[lengthProperty];
      const isComposite = {};
      for (let candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
          for (i = 0; i < 313; i += candidate) {
            isComposite[i] = candidate;
          }
          hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
          k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
      }
      ascii += "\x80";
      while (ascii[lengthProperty] % 64 - 56) ascii += "\x00";
      for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) j = j & 0xff;
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
      }
      words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
      words[words[lengthProperty]] = (asciiBitLength);
      for (j = 0; j < words[lengthProperty];) {
        const w = words.slice(j, j += 16);
        const oldHash = hash;
        hash = hash.slice(0, 8);
        for (i = 0; i < 64; i++) {
          const w15 = w[i - 15], w2 = w[i - 2];
          const a = hash[0], e = hash[4];
          const temp1 = hash[7]
            + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
            + ((e & hash[5]) ^ ((~e) & hash[6]))
            + k[i]
            + (w[i] = (i < 16) ? w[i] : (
                w[i - 16]
                + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
                + w[i - 7]
                + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
              ) | 0
            );
          const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
            + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
          hash = [(temp1 + temp2) | 0].concat(hash);
          hash[4] = (hash[4] + temp1) | 0;
        }
        for (i = 0; i < 8; i++) {
          hash[i] = (hash[i] + oldHash[i]) | 0;
        }
      }
      for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
          const b = (hash[i] >> (j * 8)) & 255;
          result += ((b < 16) ? 0 : "") + b.toString(16);
        }
      }
      return result;
    }

    
function encryptVaultPayload(value) { return JSON.stringify(value); }
function decryptVaultPayload(value) { try { return JSON.parse(value); } catch { return null; } }
function getPlainUsername(user) { return user?.username || ''; }
function getPlainPassword() { return 'Tidak dapat dilihat'; }
function getEmployeePlainPassword() { return ''; }

// ==================== MULTI-DEVICE CLOUD SYNC + LOCAL ENCRYPTED STATE MANAGEMENT ====================
    const USERS_STORAGE_KEY = 'siakad_v5_users';
const SESSION_STORAGE_KEY = 'siakad_v5_session';
const DATA_PREFIX_KEY = 'siakad_v5_draft_';
const CLOUD_API_ENDPOINT = '/api/cloud-sync';
let usersList = [];
let currentUser = null;
let isSupervisingFromSysAdmin = false;
let activeSubSession = { type: 'ADMIN_USAHA', operatorId: '', operatorName: '', operatorPosition: '' };
let pendingStep1BizUser = null;
let activeBookYear = String(new Date().getFullYear());
let availableYears = ['2023', '2024', '2025', '2026', '2027'];
let state = createFreshZeroState(null);
const cloud = { session: null, uid: null, base: null, etag: null, revision: 0, dirty: false,
  saving: false, blocked: false, lastError: null, employeeSecrets: {}, timer: null, pending: null,
  lastPoll: 0, interval: 15000, cache: new Map(), inFlight: null, actorUid: null };
const jsonClone = value => JSON.parse(JSON.stringify(value));
function cleanSnapshot(value) {
  const copy = jsonClone(value);
  delete copy.updatedAt;
  for (const e of copy.employees || []) for (const k of ['newPassword','pwdHash','pHash','pEnc','password','hasPassword']) delete e[k];
  return copy;
}
function draftKey() { return DATA_PREFIX_KEY + cloud.uid; }
function persistDraft() {
  if (!cloud.uid || !cloud.base) return;
  try { sessionStorage.setItem(draftKey(), JSON.stringify({ base: cleanSnapshot(cloud.base), state: cleanSnapshot(state), at: Date.now() })); }
  catch { cloudNotice('Draf belum dapat disimpan di perangkat. Jangan tutup halaman sebelum sinkronisasi selesai.'); }
}
function updateCloudSyncBadge(message, online = true) {
  const badge = document.getElementById('cloudSyncBadge');
  if (badge) { badge.textContent = message; badge.className = 'text-xs font-semibold px-2.5 py-0.5 rounded-full ' + (online ? 'bg-emerald-500/30 text-emerald-50' : 'bg-amber-500/30 text-amber-50'); }
}
function cloudNotice(message = '', conflict = false) {
  const box = document.getElementById('cloudNotice');
  if (!box) return;
  document.getElementById('cloudNoticeText').textContent = message;
  box.classList.toggle('hidden', !message);
  document.getElementById('cloudUseServer').classList.toggle('hidden', !cloud.dirty);
  document.getElementById('cloudRetry').classList.toggle('hidden', conflict);
}
async function cloudRequest(action, payload = {}, method = 'POST') {
  const query = new URLSearchParams({ action, ...payload });
  let response;
  try {
    response = await fetch(method === 'GET' ? `${CLOUD_API_ENDPOINT}?${query}` : CLOUD_API_ENDPOINT, {
      method, credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.timeout(30000),
      headers: method === 'GET' ? {} : { 'Content-Type': 'application/json', ...(cloud.session?.csrfToken ? { 'X-CSRF-Token': cloud.session.csrfToken } : {}) },
      ...(method === 'POST' ? { body: JSON.stringify({ action, ...payload }) } : {})
    });
  } catch { const error = new Error('Koneksi terputus. Perubahan belum tersimpan ke cloud. Draf tetap ada di tab ini.'); error.code = 'NETWORK_ERROR'; throw error; }
  let data;
  try { data = await response.json(); } catch { throw new Error('Respons server tidak valid. Periksa deployment /api/cloud-sync.'); }
  if (!response.ok || !data.ok) {
    const diagnosis = data.reference && /^[a-zA-Z0-9_-]{1,64}$/.test(data.code || '') && /^[a-f0-9]{8}$/.test(data.reference)
      ? ` [${data.code}; ref ${data.reference}]` : '';
    const error = new Error((data.error || 'Permintaan gagal.') + diagnosis); error.code = data.code; error.status = response.status;
    if (response.status === 401 && cloud.session && action !== 'login_begin') {
      cloud.session = null; showAuthModal();
    }
    throw error;
  }
  return data;
}
function isUserActivelyEditingForm() {
  return ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName) && !document.activeElement?.id?.startsWith('search');
}
function updateRegisteredCoopsDatalist() {
  const dl = document.getElementById('registeredCoopsDatalist');
  if (!dl) return;
  dl.replaceChildren(...usersList.filter(u => !u.isAdmin).map(u => { const o = document.createElement('option'); o.value = u.username; return o; }));
}
async function openCloudWorkspace(uid, supervising = false) {
  if (cloud.dirty && uid !== cloud.uid) {
    await flushCloudChanges();
    if (cloud.dirty) throw new Error('Selesaikan atau unduh draf ruang kerja ini sebelum berganti akun.');
  }
  const data = await cloudRequest('workspace', { uid }, 'GET');
  cloud.uid = uid; cloud.base = jsonClone(data.state); cloud.etag = data.etag; cloud.revision = data.revision;
  cloud.dirty = false; cloud.blocked = false; cloud.pending = null; cloud.employeeSecrets = {}; cloud.lastError = null;
  cloud.cache.set(uid, jsonClone(data.state)); usersList = data.users;
  loginWithUser(data.user, data.operator, supervising);
  try {
    const saved = JSON.parse(sessionStorage.getItem(draftKey()) || 'null');
    if (saved?.base && saved?.state && !equal(cleanSnapshot(saved.base), cleanSnapshot(saved.state))) {
      try { state = mergeState(cleanSnapshot(saved.base), cleanSnapshot(saved.state), cleanSnapshot(data.state)); }
      catch { state = saved.state; cloud.base = saved.base; cloud.blocked = true; }
      cloud.dirty = true; persistDraft(); renderAll();
      cloudNotice(cloud.blocked ? 'Draf perangkat ini bertabrakan dengan perubahan cloud. Unduh draf untuk menyimpan salinannya.' : 'Draf dari sesi sebelumnya ditemukan. Menunggu sinkronisasi.', cloud.blocked);
      if (!cloud.blocked) void flushCloudChanges();
    }
  } catch {}
  updateCloudSyncBadge(cloud.dirty ? 'Perubahan belum tersinkron' : 'Tersinkron dengan Blob Private', !cloud.dirty);
  updateRegisteredCoopsDatalist();
}
async function restoreCloudSession() {
  try {
    const data = await cloudRequest('session', {}, 'GET');
    if (!data.authenticated) {
      cloud.session = null;
      document.getElementById('btnSwitchRegister').classList.toggle('hidden', !data.registrationEnabled);
      updateCloudSyncBadge('Silakan login untuk sinkronisasi', false);
      return;
    }
    if (cloud.actorUid && cloud.actorUid !== data.user.uid) {
      if (cloud.dirty) persistDraft();
      cloud.uid = null; cloud.base = null; cloud.etag = null; cloud.pending = null;
      cloud.dirty = false; cloud.blocked = false; cloud.employeeSecrets = {}; cloud.cache.clear();
      currentUser = null; state = createFreshZeroState(null);
    }
    cloud.actorUid = data.user.uid; cloud.session = data; cloud.interval = data.syncInterval; usersList = data.users;
    await openCloudWorkspace(data.user.uid);
  } catch (error) { showAuthError(error); updateCloudSyncBadge('Cloud belum tersambung', false); }
}
function showAuthError(error) {
  const el = document.getElementById('authErrorBox'); el.textContent = error.message || String(error); el.classList.remove('hidden');
}
async function authTask(form, task) {
  const buttons = [...form.querySelectorAll('button[type="submit"]')];
  buttons.forEach(b => b.disabled = true); document.getElementById('authErrorBox').classList.add('hidden');
  try { await task(); } catch (error) { showAuthError(error); }
  finally { buttons.forEach(b => b.disabled = false); }
}
async function startCloudLogin(data) {
  openStep2BusinessRoleSelection(data.user);
  document.getElementById('step2AdminEmailInput').value = data.user.adminEmail;
  document.getElementById('step2AdminEmailInput').readOnly = true;
  document.getElementById('btnSendAdminOtp').click();
}
function saveState() {
  if (!cloud.session || !cloud.uid || !currentUser) { showToast('Login diperlukan sebelum menyimpan.', 'error'); return; }
  for (const employee of state.employees || []) {
    if (employee.newPassword) { cloud.employeeSecrets[employee.id] = employee.newPassword; delete employee.newPassword; }
  }
  cloud.dirty = true; cloud.lastError = null; persistDraft();
  updateCloudSyncBadge('Menunggu sinkronisasi ke cloud…', false);
  clearTimeout(cloud.timer);
  cloud.timer = setTimeout(() => void flushCloudChanges(), 600);
}
async function flushCloudChanges() {
  if (cloud.inFlight) { await cloud.inFlight; return; }
  if (!cloud.dirty || !cloud.session || cloud.blocked || !navigator.onLine) return;
  cloud.saving = true;
  cloud.inFlight = (async () => {
    let attempts = 0;
    while (cloud.dirty && !cloud.blocked && cloud.session && attempts++ < 4) {
      cloud.pending ||= { base: cleanSnapshot(cloud.base), state: cleanSnapshot(state), secrets: { ...cloud.employeeSecrets }, mutationId: crypto.randomUUID() };
      const sent = cloud.pending;
      const payload = jsonClone(sent.state);
      for (const employee of payload.employees) if (sent.secrets[employee.id]) employee.newPassword = sent.secrets[employee.id];
      try {
        updateCloudSyncBadge('Menyimpan ke Blob Private…', false);
        const response = await cloudRequest('workspace_save', { uid: cloud.uid, base: sent.base, state: payload, mutationId: sent.mutationId });
        const local = cleanSnapshot(state);
        const merged = mergeState(sent.state, local, cleanSnapshot(response.state));
        // Restore only non-secret password-status flags to the merged UI model.
        for (const employee of merged.employees) employee.hasPassword = response.state.employees.find(e => e.id === employee.id)?.hasPassword || false;
        for (const [id, password] of Object.entries(sent.secrets)) if (cloud.employeeSecrets[id] === password) delete cloud.employeeSecrets[id];
        cloud.base = jsonClone(response.state); cloud.etag = response.etag; cloud.revision = response.revision;
        state = merged; cloud.cache.set(cloud.uid, jsonClone(state)); cloud.pending = null;
        cloud.dirty = !equal(cleanSnapshot(state), cleanSnapshot(response.state)) || Object.keys(cloud.employeeSecrets).length > 0;
        cloud.lastError = null;
        if (cloud.dirty) persistDraft(); else { sessionStorage.removeItem(draftKey()); cloudNotice(); }
        if (!isUserActivelyEditingForm()) renderAll();
      } catch (error) {
        cloud.lastError = error;
        // Retry an uncertain network write with the SAME mutation id and payload.
        if (error.code !== 'NETWORK_ERROR' && error.status !== 503) cloud.pending = null;
        // A transient storage conflict may be retried; only a business edit conflict
        // requires the user to reconcile the draft with the cloud state.
        if ((error.status === 409 && error.code !== 'STORE_BUSY') || error.code === 'EDIT_CONFLICT') cloud.blocked = true;
        persistDraft(); cloudNotice(error.message, cloud.blocked); updateCloudSyncBadge('Belum tersimpan ke cloud', false);
        return;
      }
    }
    updateCloudSyncBadge(cloud.dirty ? 'Masih ada perubahan tertunda' : 'Tersinkron: ' + new Date().toLocaleTimeString('id-ID'), !cloud.dirty);
  })();
  try { await cloud.inFlight; }
  finally { cloud.inFlight = null; cloud.saving = false; }
}
async function pullAllFromCloud(background = false) {
  if (!cloud.session || !cloud.uid || cloud.saving) return false;
  if (cloud.dirty) { await flushCloudChanges(); return false; }
  if (background && (document.hidden || isUserActivelyEditingForm())) return false;
  try {
    const data = await cloudRequest('workspace', { uid: cloud.uid, ...(cloud.etag ? { etag: cloud.etag } : {}) }, 'GET');
    usersList = data.users || usersList;
    if (!data.unchanged) {
      cloud.base = jsonClone(data.state); cloud.etag = data.etag; cloud.revision = data.revision;
      cloud.cache.set(cloud.uid, jsonClone(data.state)); state = jsonClone(data.state); currentUser = data.user;
      activeSubSession = data.operator; ensureRetainedEarningsAccountInCoa(); syncAvailableYears(); renderAll();
    }
    cloud.lastPoll = Date.now(); updateCloudSyncBadge('Tersinkron: ' + new Date().toLocaleTimeString('id-ID'));
    cloudNotice(); return true;
  } catch (error) { updateCloudSyncBadge('Sinkronisasi tertunda', false); if (!background || error.status === 401) cloudNotice(error.message); return false; }
}
async function pushAllLocalToCloud() { return flushCloudChanges(); }
async function pushKeyToCloud() { return flushCloudChanges(); }
async function signOutCloud() {
  await flushCloudChanges();
  if (cloud.dirty && !confirm('Masih ada draf belum tersinkron. Draf tetap disimpan di tab ini. Keluar sekarang?')) return;
  if (cloud.session) await cloudRequest('logout');
  cloud.session = null; cloud.actorUid = null; cloud.uid = null; cloud.base = null; cloud.etag = null; cloud.pending = null;
  cloud.dirty = false; cloud.employeeSecrets = {}; cloud.cache.clear(); usersList = []; currentUser = null;
  state = createFreshZeroState(null); renderAll(); showAuthModal(); closeSidebarDrawer();
  updateCloudSyncBadge('Sudah keluar', false); cloudNotice();
}
function downloadCloudDraft() {
  const url = URL.createObjectURL(new Blob([JSON.stringify({ version: 5, workspace: cloud.uid, state: cleanSnapshot(state), exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a'); a.href = url; a.download = `draf-siakad-${cloud.uid || 'lokal'}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function installCloudControls() {
  document.getElementById('cloudExportButton').addEventListener('click', () => {
    if (!cloud.session || !cloud.uid) return showToast('Login terlebih dahulu untuk mengunduh data.', 'error');
    downloadCloudDraft();
  });
  document.getElementById('cloudRetry').addEventListener('click', () => { cloud.lastError = null; void flushCloudChanges(); });
  document.getElementById('cloudDownload').addEventListener('click', downloadCloudDraft);
  document.getElementById('cloudUseServer').addEventListener('click', async () => {
    if (!confirm('Unduh salinan draf terlebih dahulu. Muat data cloud dan batalkan perubahan lokal yang bertabrakan?')) return;
    downloadCloudDraft(); cloud.dirty = false; cloud.blocked = false; cloud.pending = null; cloud.employeeSecrets = {};
    sessionStorage.removeItem(draftKey()); await pullAllFromCloud(false);
  });
  document.getElementById('cloudSyncNow').addEventListener('click', async () => { if (cloud.dirty) await flushCloudChanges(); else await pullAllFromCloud(false); });
  document.getElementById('cloudImport').addEventListener('change', async event => {
    if (!isCurrentOperatorAdminUsaha() || !cloud.session) return;
    const file = event.target.files[0]; if (!file) return;
    try {
      if (file.size > 3200000) throw new Error('File JSON terlalu besar untuk ruang kerja versi ini.');
      const parsed = JSON.parse(await file.text()); const imported = parsed.state || parsed;
      if (!Array.isArray(imported.coa) || !Array.isArray(imported.journals)) throw new Error('File harus berisi ekspor JSON ruang kerja.');
      if (!confirm('Impor akan mengganti data ruang kerja ini. Pastikan Anda sudah mengunduh cadangan. Lanjutkan?')) return;
      state = cleanSnapshot(imported); saveState(); await flushCloudChanges(); renderAll();
    } catch (error) { showToast(error.message, 'error'); }
    finally { event.target.value = ''; }
  });
  setInterval(() => {
    if (!document.hidden && cloud.session && Date.now() - cloud.lastPoll >= cloud.interval) {
      cloud.lastPoll = Date.now(); void pullAllFromCloud(true);
    }
  }, 1000);
  window.addEventListener('online', () => { if (cloud.dirty) void flushCloudChanges(); else void pullAllFromCloud(true); });
  window.addEventListener('offline', () => { updateCloudSyncBadge('Offline — perubahan masih di perangkat', false); if (cloud.dirty) cloudNotice('Offline. Jangan tutup tab sebelum perubahan tersinkron.'); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) void pullAllFromCloud(true); });
  window.addEventListener('beforeunload', event => { if (cloud.dirty) { persistDraft(); event.preventDefault(); event.returnValue = ''; } });
}

function isUserAdmin(user) { return Boolean(user?.isAdmin); }

    function isCurrentOperatorAdminUsaha() {
      if (!currentUser) return false;
      if (isUserAdmin(currentUser)) return true;
      return activeSubSession.type === "ADMIN_USAHA";
    }

    // ==================== HELPER KODE USAHA & NOMOR TRANSAKSI OTOMATIS NAIK (POIN 3 & POIN 4) ====================
    function getBusinessShortCode() {
      const rawName = (state?.identity?.coopName || currentUser?.coopName || "KDMP").trim().toUpperCase();
      const words = rawName.replace(/[^A-Z0-9\s-]/g, "").split(/\s+/).filter(Boolean);
      if (words.length === 0) return "KDMP";
      if (words.length === 1) return words[0].substring(0, 12);
      return (words[0] + "-" + words[1]).substring(0, 16);
    }

    function pad3(n) {
      const s = String(Math.max(1, Number(n) || 1));
      return s.length >= 3 ? s : ("000" + s).slice(-3);
    }

    function pad2(n) {
      const s = String(Math.max(1, Number(n) || 1));
      return s.length >= 2 ? s : ("00" + s).slice(-2);
    }

    // Menghasilkan Nomor Transaksi Urut Berikutnya: 001/BB/KODE-USAHA/TAHUN (Otomatis naik jika sudah ada)
    function generateNextTransactionDocNo(dateStr, customMiddleTag = null) {
      const d = (dateStr && dateStr.length >= 7) ? dateStr : `${activeBookYear !== "ALL" ? activeBookYear : "2026"}-01-10`;
      const parts = d.split("-");
      const yr = parts[0] || (activeBookYear !== "ALL" ? activeBookYear : "2026");
      const mo = pad2(parseInt(parts[1] || "1", 10));
      const bizCode = getBusinessShortCode();

      let maxSeq = 0;
      const existingSet = new Set();
      (state.journals || []).forEach(j => {
        const doc = (j.docNo || "").trim();
        if (!doc) return;
        existingSet.add(doc.toLowerCase());
        const m = doc.match(/^(\d+)/);
        if (m) {
          const val = parseInt(m[1], 10);
          if (val > maxSeq) maxSeq = val;
        }
      });

      let nextNum = maxSeq + 1;
      let candidate = "";
      while (true) {
        const mid = customMiddleTag ? `${customMiddleTag}/${bizCode}` : `${mo}/${bizCode}`;
        candidate = `${pad3(nextNum)}/${mid}/${yr}`;
        if (!existingSet.has(candidate.toLowerCase())) break;
        nextNum++;
      }
      return candidate;
    }

    // Menghasilkan Kode Supplier / Transaksi Supplier: 001/SUP/KODE-USAHA/TAHUN (Otomatis naik jika sudah ada)
    function generateNextSupplierCode(yearStr = null) {
      const yr = yearStr || (activeBookYear !== "ALL" ? activeBookYear : "2026");
      const bizCode = getBusinessShortCode();
      let maxSeq = 0;
      const existingSet = new Set();

      (state.suppliers || []).forEach(s => {
        if (s.code) existingSet.add(s.code.trim().toLowerCase());
        if (s.docNo) existingSet.add(s.docNo.trim().toLowerCase());
        const m = (s.code || "").match(/^(\d+)/);
        if (m) {
          const v = parseInt(m[1], 10);
          if (v > maxSeq) maxSeq = v;
        }
      });
      (state.journals || []).forEach(j => {
        if (j.docNo) existingSet.add(j.docNo.trim().toLowerCase());
      });

      let nextNum = Math.max(maxSeq + 1, (state.suppliers || []).length + 1);
      let candidate = "";
      while (true) {
        candidate = `${pad3(nextNum)}/SUP/${bizCode}/${yr}`;
        if (!existingSet.has(candidate.toLowerCase())) break;
        nextNum++;
      }
      return candidate;
    }

    // Jika pengguna mengetik nomor bukti yang sudah terpakai, otomatis naikkan angka depannya (Poin 3 - Gambar 3)
    function autoIncrementDuplicateDocNo(rawVal, dateStr, customMiddleTag = null) {
      const trimmed = (rawVal || "").trim();
      if (!trimmed) return generateNextTransactionDocNo(dateStr, customMiddleTag);
      const existing = findExistingTransactionByDocNo(trimmed);
      if (!existing) return trimmed;

      const matchLeading = trimmed.match(/^(\d+)(.*)$/);
      let candidate = "";
      if (matchLeading) {
        let seq = parseInt(matchLeading[1], 10) + 1;
        const rest = matchLeading[2];
        while (true) {
          candidate = `${pad3(seq)}${rest}`;
          if (!findExistingTransactionByDocNo(candidate)) break;
          seq++;
        }
      } else {
        candidate = generateNextTransactionDocNo(dateStr, customMiddleTag);
      }
      return candidate;
    }

    function createFreshZeroState(userObj) {
      const coaCopy = JSON.parse(JSON.stringify(INITIAL_COA)).map(a => ({
        ...a,
        initBalance: 0
      }));
      return {
        identity: {
          coopName: "",
          unitUsaha: "",
          province: "",
          city: "",
          address: "",
          startDate: "",
          endDate: "",
          chairmanName: "",
          chairmanNik: "",
          accountantName: "",
          accountantNik: ""
        },
        coa: coaCopy,
        items: [],
        members: [],
        employees: [],
        suppliers: [],
        journals: [],
        customYears: []
      };
    }

    function ensureRetainedEarningsAccountInCoa() {
      if (!Array.isArray(state.coa)) return;
      const requiredAccounts = [
        {
          code: "1.1.4.04",
          name: "Persediaan Barang Konsinyasi (Titipan)",
          full: resolveCoaFull("1.1.4.04", "1.1.4.04 Persediaan Barang Konsinyasi (Titipan)"),
          normal: "Debit",
          lvl1: "1",
          lvl2: "1.1",
          lvl3: "1.1.4"
        },
        {
          code: "2.1.3.03",
          name: "Utang Konsinyasi (Titipan Mitra/Supplier)",
          full: resolveCoaFull("2.1.3.03", "2.1.3.03 Utang Konsinyasi (Titipan Mitra/Supplier)"),
          normal: "Kredit",
          lvl1: "2",
          lvl2: "2.1",
          lvl3: "2.1.3"
        },
        {
          code: "3.4.2.01",
          name: "Laba Ditahan (Retained Earnings)",
          full: "3.4.2.01 Laba Ditahan (Retained Earnings)",
          normal: "Kredit",
          lvl1: "3",
          lvl2: "3.4",
          lvl3: "3.4.2"
        },
        {
          code: "4.1.1.02",
          name: "Pendapatan Komisi Konsinyasi",
          full: resolveCoaFull("4.1.1.02", "4.1.1.02 Pendapatan Komisi Konsinyasi"),
          normal: "Kredit",
          lvl1: "4",
          lvl2: "4.1",
          lvl3: "4.1.1"
        },
        {
          code: "4.1.1.03",
          name: "Pendapatan Penjualan Barang Konsinyasi (Anggota)",
          full: resolveCoaFull("4.1.1.03", "4.1.1.03 Pendapatan Penjualan Barang Konsinyasi (Anggota)"),
          normal: "Kredit",
          lvl1: "4",
          lvl2: "4.1",
          lvl3: "4.1.1"
        },
        {
          code: "4.2.1.02",
          name: "Pendapatan Penjualan Barang Konsinyasi (Non-Anggota)",
          full: resolveCoaFull("4.2.1.02", "4.2.1.02 Pendapatan Penjualan Barang Konsinyasi (Non-Anggota)"),
          normal: "Kredit",
          lvl1: "4",
          lvl2: "4.2",
          lvl3: "4.2.1"
        },
        {
          code: "5.1.1.03",
          name: "Harga Pokok Penjualan (HPP) Barang Konsinyasi",
          full: resolveCoaFull("5.1.1.03", "5.1.1.03 Harga Pokok Penjualan (HPP) Barang Konsinyasi"),
          normal: "Debit",
          lvl1: "5",
          lvl2: "5.1",
          lvl3: "5.1.1"
        }
      ];

      let changed = false;
      requiredAccounts.forEach(req => {
        const existing = state.coa.find(a => a.code === req.code);
        if (!existing) {
          state.coa.push({
            no: state.coa.length + 1,
            full: req.full,
            code: req.code,
            name: req.name,
            normal: req.normal,
            budget: 0,
            initBalance: 0,
            lvl1: req.lvl1,
            lvl2: req.lvl2,
            lvl3: req.lvl3
          });
          changed = true;
        } else if (req.code === "3.4.2.01" && !existing.name.toLowerCase().includes("retained")) {
          existing.name = "Laba Ditahan (Retained Earnings)";
          existing.full = "3.4.2.01 Laba Ditahan (Retained Earnings)";
        }
      });

      if (changed) {
        state.coa.sort((a, b) => a.code.localeCompare(b.code));
      }
    }

    function ensureAdminUserExists() { /* Authoritative accounts are loaded only after server login. */ }

    function loadUsers() { usersList = []; }

    function saveUsers() { /* Profile and account changes use dedicated authenticated API actions. */ }

    function getUserStorageKey(user) { return DATA_PREFIX_KEY + (user?.uid || 'none'); }

    function loadStateForUser(user) {
    state = jsonClone(cloud.cache.get(user?.uid) || createFreshZeroState(user));
    ensureRetainedEarningsAccountInCoa(); syncAvailableYears();
  }

    

    function syncAvailableYears() {
      const setY = new Set(["2023", "2024", "2025", "2026", "2027"]);
      if (Array.isArray(state.customYears)) {
        state.customYears.forEach(y => setY.add(String(y)));
      }
      state.journals.forEach(j => {
        if (j.date && j.date.length >= 4) {
          setY.add(j.date.substring(0, 4));
        }
      });
      availableYears = Array.from(setY).sort();
      const sel = document.getElementById("activeYearSelect");
      if (sel) {
        const cur = activeBookYear;
        sel.innerHTML = `<option value="ALL">Semua Tahun (Akumulasi)</option>` +
          availableYears.map(y => `<option value="${y}">${y}</option>`).join("");
        sel.value = (cur === "ALL" || availableYears.includes(cur)) ? cur : "2026";
        activeBookYear = sel.value;
      }
    }

    // ==================== HELPER FORMATTING, PEMISAH RIBUAN (.) OTOMATIS & VALIDATION ====================
    function fmtRp(val) {
      const n = Number(val) || 0;
      const abs = Math.abs(Math.round(n));
      const formatted = abs.toLocaleString("id-ID");
      return n < 0 ? `(Rp ${formatted})` : `Rp ${formatted}`;
    }

    function fmtNum(val) {
      const n = Number(val) || 0;
      const abs = Math.abs(Math.round(n));
      const formatted = abs.toLocaleString("id-ID");
      return n < 0 ? `(${formatted})` : formatted;
    }

    // Mengubah string nominal berpemisah titik (contoh: "1.500.000") menjadi angka murni (1500000)
    function parseNominal(rawVal) {
      if (typeof rawVal === "number") return isNaN(rawVal) ? 0 : rawVal;
      const str = String(rawVal || "").trim();
      if (!str) return 0;
      const isNeg = str.startsWith("-");
      const digitsOnly = str.replace(/[^0-9]/g, "");
      if (!digitsOnly) return 0;
      const num = parseInt(digitsOnly, 10) || 0;
      return isNeg ? -num : num;
    }

    // Memformat angka atau string input menjadi string dengan pemisah ribuan titik (.) contoh: "1.500.000"
    function fmtNominalInput(val, allowNegative = false) {
      const num = parseNominal(val);
      if (num === 0) return "0";
      const isNeg = allowNegative && num < 0;
      const absVal = Math.abs(Math.round(num));
      const formatted = absVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return isNeg ? `-${formatted}` : formatted;
    }

    function formatLiveNominalInputElement(inp) {
      if (!inp) return;
      const allowNeg = inp.getAttribute("data-allow-negative") === "true";
      const raw = inp.value || "";
      const selStart = inp.selectionStart !== null ? inp.selectionStart : raw.length;
      const digitsAfterCursor = raw.slice(selStart).replace(/[^0-9]/g, "").length;

      const isNeg = allowNeg && raw.trim().startsWith("-");
      let digits = raw.replace(/[^0-9]/g, "").replace(/^0+(?=\d)/, "");
      if (!digits) {
        inp.value = isNeg ? "-" : "";
        return;
      }
      const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const finalStr = isNeg ? `-${formatted}` : formatted;
      inp.value = finalStr;

      try {
        if (document.activeElement === inp) {
          let newPos = finalStr.length;
          if (digitsAfterCursor > 0) {
            let seenDigits = 0;
            for (let i = finalStr.length - 1; i >= 0; i--) {
              if (/\d/.test(finalStr[i])) {
                seenDigits++;
                if (seenDigits === digitsAfterCursor) {
                  newPos = i;
                  break;
                }
              }
            }
          }
          inp.setSelectionRange(newPos, newPos);
        }
      } catch (e) {}
    }

    function isStrictNumericInput(el) {
      if (!el || !el.tagName || el.tagName.toUpperCase() !== "INPUT") return false;
      if (el.classList && (el.classList.contains("nominal-rp-input") || el.classList.contains("jline-qty") || el.classList.contains("otp-digit-box"))) return true;
      if (el.type === "number" || el.getAttribute("inputmode") === "numeric") return true;
      return false;
    }

    document.addEventListener("keydown", (e) => {
      const t = e.target;
      if (!isStrictNumericInput(t)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const allowedKeys = [
        "Backspace", "Delete", "Tab", "Enter", "Escape",
        "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"
      ];
      if (allowedKeys.includes(e.key)) return;
      const allowNeg = t.getAttribute("data-allow-negative") === "true";
      if (allowNeg && e.key === "-" && (t.selectionStart === 0 || !t.value) && !String(t.value || "").includes("-")) {
        return;
      }
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    }, true);

    document.addEventListener("input", (e) => {
      const t = e.target;
      if (!t) return;
      if (t.classList && t.classList.contains("nominal-rp-input")) {
        formatLiveNominalInputElement(t);
      } else if (isStrictNumericInput(t) && !(t.classList && t.classList.contains("otp-digit-box"))) {
        const cleanDigits = String(t.value || "").replace(/[^0-9]/g, "");
        if (t.value !== cleanDigits) {
          t.value = cleanDigits;
        }
      }
    }, true);

    document.addEventListener("focusin", (e) => {
      const t = e.target;
      if (t && t.classList && t.classList.contains("nominal-rp-input")) {
        if (t.value === "0") {
          t.value = "";
        } else {
          setTimeout(() => {
            try { t.select(); } catch (err) {}
          }, 10);
        }
      }
    });

    document.addEventListener("focusout", (e) => {
      const t = e.target;
      if (t && t.classList && t.classList.contains("nominal-rp-input")) {
        const allowNeg = t.getAttribute("data-allow-negative") === "true";
        t.value = fmtNominalInput(t.value, allowNeg);
      }
    });

    function showToast(msg, type = "success") {
      const container = document.getElementById("toastContainer");
      if(type !== 'error' && cloud.dirty) msg += ' (menunggu konfirmasi cloud)';
      const el = document.createElement("div");
      const bg = type === "error" ? "bg-rose-700 border-rose-500" : "bg-slate-900 border-emerald-500";
      el.className = `${bg} text-white text-xs font-medium px-4 py-3 rounded-xl shadow-lg border-l-4 flex items-center justify-between gap-3 pointer-events-auto transition duration-300`;
      el.innerHTML = `<span>${msg}</span><button type="button" class="text-white/70 hover:text-white font-bold">Tutup</button>`;
      el.querySelector("button").addEventListener("click", () => el.remove());
      container.appendChild(el);
      setTimeout(() => {
        if (el.parentNode) el.remove();
      }, 4500);
    }

    function getAccountObj(fullOrCode) {
      if (!fullOrCode) return null;
      const trimmed = fullOrCode.trim();
      const codePart = trimmed.split(" ")[0];
      return state.coa.find(a =>
        a.full.toLowerCase() === trimmed.toLowerCase() ||
        a.code.toLowerCase() === trimmed.toLowerCase() ||
        (codePart && codePart.includes(".") && a.code.toLowerCase() === codePart.toLowerCase())
      ) || null;
    }

    function resolveCoaFull(codeOrFull, fallbackFull = "") {
      const obj = getAccountObj(codeOrFull);
      if (obj) return obj.full;
      const prefix = String(codeOrFull || "").trim().split(" ")[0];
      if (prefix) {
        const byPrefix = (state.coa || []).find(a => a.code.startsWith(prefix));
        if (byPrefix) return byPrefix.full;
      }
      return fallbackFull || String(codeOrFull || "");
    }

    function findExistingTransactionByDocNo(docNo) {
      const norm = (docNo || "").trim().toLowerCase();
      if (!norm) return null;
      const matches = state.journals.filter(j => (j.docNo || "").trim().toLowerCase() === norm);
      if (matches.length === 0) return null;
      const first = matches[0];
      const totalDebit = matches.reduce((s, m) => s + (Number(m.debit) || 0), 0);
      const accountsInvolved = Array.from(new Set(matches.map(m => m.account))).join(", ");
      return {
        docNo: first.docNo,
        date: first.date,
        desc: first.desc || "(Tanpa keterangan)",
        totalDebit,
        accountsInvolved,
        lineCount: matches.length
      };
    }

    // Poin 3 (Gambar 3 & 4): Saat nomor bukti sudah pernah dipakai, tampilkan info singkat & otomatis naikkan kode awalnya!
    function updateDocNoWarningUI(inputId, warningBoxId, dateInputId = "jDate", customMidTag = null) {
      const inp = document.getElementById(inputId);
      const box = document.getElementById(warningBoxId);
      if (!inp || !box) return false;
      const rawVal = inp.value.trim();
      const existing = findExistingTransactionByDocNo(rawVal);
      if (existing) {
        const dateVal = document.getElementById(dateInputId)?.value || existing.date;
        const nextAvailable = autoIncrementDuplicateDocNo(rawVal, dateVal, customMidTag);
        inp.value = nextAvailable;
        box.classList.remove("hidden");
        box.className = "mt-1.5 p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-[11px] leading-relaxed";
        box.innerHTML = `<strong>OTOMATIS DINAIKKAN:</strong> Nomor transaksi <strong>"${existing.docNo}"</strong> sudah terpakai pada tanggal <strong>${existing.date}</strong> (${existing.desc}). Kode transaksi otomatis dinaikkan menjadi <strong>"${nextAvailable}"</strong>.`;
        inp.classList.remove("border-rose-500", "bg-rose-50");
        inp.classList.add("border-amber-500", "bg-amber-50/40");
        return false;
      } else {
        box.classList.add("hidden");
        box.innerHTML = "";
        inp.classList.remove("border-rose-500", "bg-rose-50", "border-amber-500", "bg-amber-50/40");
        return false;
      }
    }

    function syncAllTransactionDocNoInputs() {
      const jDateVal = document.getElementById("jDate")?.value || `${activeBookYear !== "ALL" ? activeBookYear : "2026"}-01-10`;
      const jInp = document.getElementById("jDocNo");
      if (jInp) jInp.value = generateNextTransactionDocNo(jDateVal, null);

      const qtDateVal = document.getElementById("qtDate")?.value || `${activeBookYear !== "ALL" ? activeBookYear : "2026"}-01-12`;
      const qtInp = document.getElementById("qtDocNo");
      if (qtInp) qtInp.value = generateNextTransactionDocNo(qtDateVal, null);

      const spDateVal = document.getElementById("spDate")?.value || `${activeBookYear !== "ALL" ? activeBookYear : "2026"}-01-15`;
      const spInp = document.getElementById("spDocNo");
      if (spInp) spInp.value = generateNextTransactionDocNo(spDateVal, "USP");
    }

    // ==================== ENGINE DATABASE ANGGOTA & SIMPAN PINJAM (LINK OTOMATIS KE JURNAL) ====================
    function computeMembersSummary() {
      const map = {};
      (state.members || []).forEach(m => {
        map[m.code] = {
          ...m,
          pokok: Number(m.initPokok) || 0,
          wajib: Number(m.initWajib) || 0,
          sukarela: Number(m.initSukarela) || 0,
          pinjaman: Number(m.initPinjaman) || 0,
          jasaPinjaman: 0,
          monthlyWajib: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          transactions: []
        };
      });

      const sortedJournals = [...state.journals].sort((a, b) => (a.date || "").localeCompare(b.date || ""));

      sortedJournals.forEach(j => {
        const jYear = j.date ? j.date.substring(0, 4) : "2026";
        if (activeBookYear !== "ALL" && jYear > activeBookYear) return;

        let mEntry = null;
        if (j.memberCode && map[j.memberCode]) {
          mEntry = map[j.memberCode];
        } else if (j.memberName) {
          mEntry = Object.values(map).find(x => x.name.toLowerCase() === j.memberName.toLowerCase());
        }
        if (!mEntry) return;

        const d = Number(j.debit) || 0;
        const k = Number(j.kredit) || 0;
        const resolvedAcc = getAccountObj(j.account);
        const accCode = resolvedAcc ? resolvedAcc.code : (j.account ? j.account.split(" ")[0] : "");
        const monthIdx = j.date ? (parseInt(j.date.split("-")[1], 10) - 1) : 0;

        if (accCode.startsWith("3.1.1") || accCode === "2.1.1.01") {
          mEntry.pokok += (k - d);
        } else if (accCode.startsWith("3.1.2") || accCode === "2.1.1.02") {
          const deltaWajib = (k - d);
          mEntry.wajib += deltaWajib;
          if (activeBookYear === "ALL" || jYear === activeBookYear) {
            if (monthIdx >= 0 && monthIdx < 12) {
              mEntry.monthlyWajib[monthIdx] += deltaWajib;
            }
          }
        } else if (accCode.startsWith("3.1.3") || accCode === "2.1.1.03") {
          mEntry.sukarela += (k - d);
        } else if (accCode === "1.1.2.05" || accCode === "1.1.2.03" || accCode === "1.1.2.04") {
          mEntry.pinjaman += (d - k);
        } else if (accCode === "4.1.3.02") {
          mEntry.jasaPinjaman += (k - d);
        }

        if (activeBookYear === "ALL" || jYear === activeBookYear) {
          mEntry.transactions.push({
            id: j.id,
            date: j.date,
            docNo: j.docNo,
            account: j.account,
            debit: d,
            kredit: k,
            desc: j.desc
          });
        }
      });

      return Object.values(map).map(m => ({
        ...m,
        totalSimpanan: m.pokok + m.wajib + m.sukarela
      }));
    }

    // ==================== ENGINE PERHITUNGAN STOK, SUPPLIER & AKUNTANSI MULTI-TAHUN (+ LABA DITAHAN 3.4.2.01) ====================
    function enrichAllJournals() {
      return state.journals.map(j => {
        const acc = getAccountObj(j.account);
        const normal = acc ? acc.normal : "Debit";
        const debit = Number(j.debit) || 0;
        const kredit = Number(j.kredit) || 0;
        const year = j.date ? j.date.substring(0, 4) : "2026";
        const month = j.date ? parseInt(j.date.split("-")[1], 10) : 1;
        const code = acc ? acc.code : (j.account ? j.account.split(" ")[0] : "");
        const lvl1 = code.substring(0, 1);
        const lvl2 = code.substring(0, 3);
        const lvl3 = code.substring(0, 5);
        const jumlah = normal === "Debit" ? (debit - kredit) : (kredit - debit);
        const isExplicitSaldoAwal = (j.desc || "").toLowerCase().trim() === "saldo awal";
        const isClosingEntry = Boolean(j.isClosingEntry || (j.docNo || "").toUpperCase().includes("/TUTUP-BUKU/"));
        return {
          ...j,
          debit,
          kredit,
          normal,
          year,
          month,
          code,
          lvl1,
          lvl2,
          lvl3,
          jumlah,
          isExplicitSaldoAwal,
          isClosingEntry
        };
      });
    }

    function computeInventorySummary() {
      const map = {};
      state.items.forEach(item => {
        const linkedSups = (state.suppliers || []).filter(s => s.itemCode === item.code || s.itemName === item.name);
        const supCodes = Array.from(new Set([
          ...(item.supplierCode ? [item.supplierCode] : []),
          ...linkedSups.map(s => s.code)
        ])).filter(Boolean);

        map[item.name] = {
          ...item,
          supplierCodes: supCodes.length > 0 ? supCodes : [generateNextSupplierCode()],
          effectiveInitQty: Number(item.initQty) || 0,
          qtyIn: 0,
          qtyOut: 0,
          valIn: 0,
          valOut: 0,
          mutations: []
        };
      });

      const sortedJournals = [...state.journals].sort((a, b) => (a.date || "").localeCompare(b.date || ""));

      sortedJournals.forEach(j => {
        if (j.itemName && map[j.itemName]) {
          const entry = map[j.itemName];
          const q = Number(j.qty) || 0;
          const d = Number(j.debit) || 0;
          const k = Number(j.kredit) || 0;
          const jYear = j.date ? j.date.substring(0, 4) : "2026";

          if (activeBookYear !== "ALL" && jYear > activeBookYear) {
            return;
          }

          if (activeBookYear !== "ALL" && jYear < activeBookYear) {
            if (d > 0 && k === 0) entry.effectiveInitQty += q;
            else if (k > 0) entry.effectiveInitQty -= q;
            return;
          }

          if (d > 0 && k === 0) {
            entry.qtyIn += q;
            entry.valIn += d;
            entry.mutations.push({
              date: j.date,
              docNo: j.docNo,
              type: "MASUK",
              qtyIn: q,
              qtyOut: 0,
              val: d,
              desc: j.desc,
              account: j.account
            });
          } else if (k > 0) {
            entry.qtyOut += q;
            entry.valOut += k;
            entry.mutations.push({
              date: j.date,
              docNo: j.docNo,
              type: "KELUAR",
              qtyIn: 0,
              qtyOut: q,
              val: k,
              desc: j.desc,
              account: j.account
            });
          }
        }
      });

      return Object.values(map).map(it => {
        const initQty = it.effectiveInitQty;
        const finalQty = initQty + it.qtyIn - it.qtyOut;
        const initVal = initQty * (Number(it.cost) || 0);
        const finalVal = finalQty * (Number(it.cost) || 0);
        let status = "AMAN";
        if (finalQty <= 0) status = "HABIS";
        else if (finalQty <= (Number(it.minQty) || 0)) status = "MENIPIS";
        return {
          ...it,
          initQty,
          finalQty,
          initVal,
          finalVal,
          status
        };
      });
    }

    function enrichJournals() {
      const all = enrichAllJournals();
      return all.filter(j => {
        if (activeBookYear === "ALL") return true;
        return j.year === activeBookYear;
      }).map(j => ({
        ...j,
        isSaldoAwal: j.isExplicitSaldoAwal
      }));
    }

    // Menghitung SHU tahun-tahun sebelumnya yang BELUM ditutup secara eksplisit ke 3.4.2.01 Laba Ditahan
    function computePriorYearsUnclosedSHU() {
      if (activeBookYear === "ALL") return 0;
      const all = enrichAllJournals().filter(j => j.year < activeBookYear);
      let rev = 0, hpp = 0, ops = 0, otherRev = 0, otherExp = 0, tax = 0;
      all.forEach(j => {
        if (j.lvl1 === "4") rev += j.jumlah;
        else if (j.lvl1 === "5") hpp += j.jumlah;
        else if (j.lvl1 === "6") ops += j.jumlah;
        else if (j.lvl2 === "9.1") otherRev += j.jumlah;
        else if (j.lvl2 === "9.2") otherExp += j.jumlah;
        else if (j.lvl2 === "9.3") tax += j.jumlah;
      });
      return (rev - hpp - ops) + (otherRev - otherExp) - tax;
    }

    function computeTrialBalance() {
      const all = enrichAllJournals();
      const priorUnclosedSHU = computePriorYearsUnclosedSHU();

      return state.coa.map(acc => {
        const manualInit = Number(acc.initBalance) || 0;
        let initDebit = 0;
        let initKredit = 0;
        if (manualInit > 0) {
          if (acc.normal === "Debit") initDebit = manualInit;
          else initKredit = manualInit;
        } else if (manualInit < 0) {
          if (acc.normal === "Debit") initKredit = Math.abs(manualInit);
          else initDebit = Math.abs(manualInit);
        }

        let jDebit = 0;
        let jKredit = 0;
        const isBalanceSheetAcc = ["1", "2", "3"].includes(acc.lvl1);

        all.forEach(j => {
          if (j.account === acc.full || j.code === acc.code) {
            if (activeBookYear === "ALL") {
              jDebit += j.debit;
              jKredit += j.kredit;
            } else {
              if (j.year === activeBookYear) {
                jDebit += j.debit;
                jKredit += j.kredit;
              } else if (j.year < activeBookYear && isBalanceSheetAcc) {
                jDebit += j.debit;
                jKredit += j.kredit;
              }
            }
          }
        });

        // Jika tahun sebelumnya belum ditutup dengan jurnal penutup, bawa otomatis ke 3.4.2.01 Laba Ditahan
        if (activeBookYear !== "ALL" && acc.code === "3.4.2.01" && priorUnclosedSHU !== 0) {
          if (priorUnclosedSHU > 0) jKredit += priorUnclosedSHU;
          else jDebit += Math.abs(priorUnclosedSHU);
        }

        const mutDebit = initDebit + jDebit;
        const mutKredit = initKredit + jKredit;
        const mutasiNetJurnal = acc.normal === "Debit" ? (jDebit - jKredit) : (jKredit - jDebit);

        const saldoDebit = mutDebit > mutKredit ? mutDebit - mutKredit : 0;
        const saldoKredit = mutKredit > mutDebit ? mutKredit - mutDebit : 0;
        const saldoAkhir = acc.normal === "Debit" ? (saldoDebit - saldoKredit) : (saldoKredit - saldoDebit);
        return {
          ...acc,
          initBalance: manualInit,
          jDebit,
          jKredit,
          mutasiNetJurnal,
          mutDebit,
          mutKredit,
          saldoDebit,
          saldoKredit,
          saldoAkhir
        };
      });
    }

    function sumByLvl3Month(ej, lvl3, maxMonth, exactMonth = null) {
      let total = 0;
      if (exactMonth === null) {
        state.coa.filter(a => a.lvl3 === lvl3).forEach(a => {
          total += (Number(a.initBalance) || 0);
        });
      }
      ej.forEach(j => {
        // Jangan hitung baris jurnal penutup akhir tahun pada laporan PHU agar rincian pendapatan/beban tetap tampil utuh
        if (j.isClosingEntry) return;
        if (j.lvl3 === lvl3) {
          if (exactMonth !== null) {
            if (j.month === exactMonth) total += j.jumlah;
          } else if (j.month <= maxMonth) {
            total += j.jumlah;
          }
        }
      });
      return total;
    }

    function computePHU(selectedMonth = 12) {
      const ej = enrichJournals();
      const m = Number(selectedMonth) || 12;
      const rowVal = (lvl3) => ({
        mVal: sumByLvl3Month(ej, lvl3, m, m),
        yVal: sumByLvl3Month(ej, lvl3, m, null)
      });

      const r411 = rowVal("4.1.1");
      const r412 = rowVal("4.1.2");
      const r413 = rowVal("4.1.3");
      const r419 = rowVal("4.1.9");
      const totPelayananAnggota = {
        mVal: r411.mVal + r412.mVal + r413.mVal + r419.mVal,
        yVal: r411.yVal + r412.yVal + r413.yVal + r419.yVal
      };

      const r421 = rowVal("4.2.1");
      const r422 = rowVal("4.2.2");
      const r423 = rowVal("4.2.3");
      const r429 = rowVal("4.2.9");
      const totNonAnggota = {
        mVal: r421.mVal + r422.mVal + r423.mVal + r429.mVal,
        yVal: r421.yVal + r422.yVal + r423.yVal + r429.yVal
      };

      const totPendapatan = {
        mVal: totPelayananAnggota.mVal + totNonAnggota.mVal,
        yVal: totPelayananAnggota.yVal + totNonAnggota.yVal
      };

      const r511 = rowVal("5.1.1");
      const r521 = rowVal("5.2.1");
      const totHPP = {
        mVal: r511.mVal + r521.mVal,
        yVal: r511.yVal + r521.yVal
      };

      const shuKotor = {
        mVal: totPendapatan.mVal - totHPP.mVal,
        yVal: totPendapatan.yVal - totHPP.yVal
      };

      const r611 = rowVal("6.1.1");
      const r612 = rowVal("6.1.2");
      const r613 = rowVal("6.1.3");
      const r614 = rowVal("6.1.4");
      const r615 = rowVal("6.1.5");
      const r616 = rowVal("6.1.6");
      const r617 = rowVal("6.1.7");
      const r618 = rowVal("6.1.8");
      const r619 = rowVal("6.1.9");
      const totBebanAdmin = {
        mVal: r611.mVal + r612.mVal + r613.mVal + r614.mVal + r615.mVal + r616.mVal + r617.mVal + r618.mVal + r619.mVal,
        yVal: r611.yVal + r612.yVal + r613.yVal + r614.yVal + r615.yVal + r616.yVal + r617.yVal + r618.yVal + r619.yVal
      };

      const r621 = rowVal("6.2.1");
      const r622 = rowVal("6.2.2");
      const r623 = rowVal("6.2.3");
      const totBebanPemasaran = {
        mVal: r621.mVal + r622.mVal + r623.mVal,
        yVal: r621.yVal + r622.yVal + r623.yVal
      };

      const totBebanOperasional = {
        mVal: totBebanAdmin.mVal + totBebanPemasaran.mVal,
        yVal: totBebanAdmin.yVal + totBebanPemasaran.yVal
      };

      const shuOperasional = {
        mVal: shuKotor.mVal - totBebanOperasional.mVal,
        yVal: shuKotor.yVal - totBebanOperasional.yVal
      };

      const r911 = rowVal("9.1.1");
      const r912 = rowVal("9.1.2");
      const r913 = rowVal("9.1.3");
      const r914 = rowVal("9.1.4");
      const r919 = rowVal("9.1.9");
      const totPendapatanLain = {
        mVal: r911.mVal + r912.mVal + r913.mVal + r914.mVal + r919.mVal,
        yVal: r911.yVal + r912.yVal + r913.yVal + r914.yVal + r919.yVal
      };

      const r921 = rowVal("9.2.1");
      const r922 = rowVal("9.2.2");
      const r923 = rowVal("9.2.3");
      const r929 = rowVal("9.2.9");
      const totBebanLain = {
        mVal: r921.mVal + r922.mVal + r923.mVal + r929.mVal,
        yVal: r921.yVal + r922.yVal + r923.yVal + r929.yVal
      };

      const totPendapatanBebanLain = {
        mVal: totPendapatanLain.mVal - totBebanLain.mVal,
        yVal: totPendapatanLain.yVal - totBebanLain.yVal
      };

      const shuSebelumPajak = {
        mVal: shuOperasional.mVal + totPendapatanBebanLain.mVal,
        yVal: shuOperasional.yVal + totPendapatanBebanLain.yVal
      };

      const r931 = rowVal("9.3.1");
      const shuSetelahPajak = {
        mVal: shuSebelumPajak.mVal - r931.mVal,
        yVal: shuSebelumPajak.yVal - r931.yVal
      };

      const rows = [
        { code: "4.0.0", no: 1, label: "PENDAPATAN OPERASIONAL", isHeader: true },
        { code: "4.1.0", no: 2, label: "Pendapatan Pelayanan Anggota", isSubHeader: true },
        { code: "4.1.1", no: 3, label: "Pendapatan Penjualan Barang Dagangan (Anggota)", ...r411 },
        { code: "4.1.2", no: 4, label: "Pendapatan Penjualan Barang Jadi (Anggota)", ...r412 },
        { code: "4.1.3", no: 5, label: "Pendapatan Jasa (Anggota)", ...r413 },
        { code: "4.1.9", no: 6, label: "Pendapatan Pelayanan Anggota Lainnya", ...r419 },
        { code: "", no: 7, label: "Total Pendapatan Pelayanan Anggota", ...totPelayananAnggota, isTotal: true },
        { code: "4.2.0", no: 8, label: "Pendapatan dari Non-Anggota", isSubHeader: true },
        { code: "4.2.1", no: 9, label: "Pendapatan Penjualan Barang Dagangan (Non-Anggota)", ...r421 },
        { code: "4.2.2", no: 10, label: "Pendapatan Penjualan Barang Jadi (Non-Anggota)", ...r422 },
        { code: "4.2.3", no: 11, label: "Pendapatan Jasa (Non-Anggota)", ...r423 },
        { code: "4.2.9", no: 12, label: "Pendapatan Pelayanan Non-Anggota Lainnya", ...r429 },
        { code: "", no: 13, label: "Total Pendapatan dari Non-Anggota", ...totNonAnggota, isTotal: true },
        { code: "", no: 14, label: "TOTAL PENDAPATAN OPERASIONAL", ...totPendapatan, isGrand: true },
        { code: "5.0.0", no: 15, label: "HARGA POKOK PRODUKSI DAN PENJUALAN", isHeader: true },
        { code: "5.1.1", no: 16, label: "Harga Pokok Penjualan Barang Dagangan & Barang Jadi", ...r511 },
        { code: "5.2.1", no: 17, label: "Harga Pokok Produksi", ...r521 },
        { code: "", no: 18, label: "TOTAL HARGA POKOK PRODUKSI DAN PENJUALAN", ...totHPP, isTotal: true },
        { code: "", no: 19, label: "SISA HASIL USAHA (SHU) KOTOR", ...shuKotor, isGrand: true },
        { code: "6.0.0", no: 20, label: "BEBAN OPERASIONAL", isHeader: true },
        { code: "6.1.0", no: 21, label: "Beban Administrasi dan Umum", isSubHeader: true },
        { code: "6.1.1", no: 22, label: "Beban Pegawai Administrasi dan Umum", ...r611 },
        { code: "6.1.2", no: 23, label: "Beban Perlengkapan & ATK", ...r612 },
        { code: "6.1.3", no: 24, label: "Beban Pemeliharaan dan Perbaikan", ...r613 },
        { code: "6.1.4", no: 25, label: "Beban Utilitas (Listrik, Telepon, Internet)", ...r614 },
        { code: "6.1.5", no: 26, label: "Beban Sewa dan Asuransi", ...r615 },
        { code: "6.1.6", no: 27, label: "Beban Keamanan dan Kebersihan", ...r616 },
        { code: "6.1.7", no: 28, label: "Beban Penyisihan Piutang Tak Tertagih", ...r617 },
        { code: "6.1.8", no: 29, label: "Beban Penyusutan dan Amortisasi", ...r618 },
        { code: "6.1.9", no: 30, label: "Beban Administrasi dan Umum Lainnya", ...r619 },
        { code: "", no: 31, label: "Total Beban Administrasi dan Umum", ...totBebanAdmin, isTotal: true },
        { code: "6.2.0", no: 32, label: "Beban Pemasaran", isSubHeader: true },
        { code: "6.2.1", no: 33, label: "Beban Pegawai Bagian Pemasaran", ...r621 },
        { code: "6.2.2", no: 34, label: "Beban Iklan, Promosi, dan Dana Sosial", ...r622 },
        { code: "6.2.3", no: 35, label: "Beban Pemasaran Lainnya", ...r623 },
        { code: "", no: 36, label: "Total Beban Pemasaran", ...totBebanPemasaran, isTotal: true },
        { code: "", no: 37, label: "TOTAL BEBAN OPERASIONAL", ...totBebanOperasional, isTotal: true },
        { code: "", no: 38, label: "SISA HASIL USAHA (SHU) OPERASIONAL", ...shuOperasional, isGrand: true },
        { code: "9.0.0", no: 39, label: "PENDAPATAN DAN BEBAN LAIN-LAIN", isHeader: true },
        { code: "9.1.1", no: 40, label: "Pendapatan Bunga Bank", ...r911 },
        { code: "9.1.2", no: 41, label: "Pendapatan Sewa / Bantuan / Lainnya", ...r912 },
        { code: "9.1.3", no: 42, label: "Pendapatan Denda", ...r913 },
        { code: "9.1.4", no: 43, label: "Pendapatan Iklan", ...r914 },
        { code: "9.1.9", no: 44, label: "Pendapatan Lain-lain Lainnya", ...r919 },
        { code: "", no: 45, label: "Total Pendapatan Lain-lain", ...totPendapatanLain, isTotal: true },
        { code: "9.2.1", no: 46, label: "Beban Administrasi Bank", ...r921 },
        { code: "9.2.2", no: 47, label: "Beban Bunga", ...r922 },
        { code: "9.2.3", no: 48, label: "Beban Sewa / Denda Lain-lain", ...r923 },
        { code: "9.2.9", no: 49, label: "Beban Lain-lain Lainnya", ...r929 },
        { code: "", no: 50, label: "Total Beban Lain-lain", ...totBebanLain, isTotal: true },
        { code: "", no: 51, label: "TOTAL PENDAPATAN DAN BEBAN LAIN-LAIN", ...totPendapatanBebanLain, isTotal: true },
        { code: "", no: 52, label: "SISA HASIL USAHA (SHU) SEBELUM PAJAK", ...shuSebelumPajak, isGrand: true },
        { code: "9.3.1", no: 53, label: "Beban Pajak Penghasilan (PPh)", ...r931 },
        { code: "", no: 54, label: "SISA HASIL USAHA (SHU) SETELAH PAJAK", ...shuSetelahPajak, isGrand: true }
      ];

      return {
        rows,
        totPendapatan: totPendapatan.yVal,
        totHPP: totHPP.yVal,
        shuKotor: shuKotor.yVal,
        totBebanOperasional: totBebanOperasional.yVal,
        shuSetelahPajak: shuSetelahPajak.yVal
      };
    }

    // Menghitung SHU Tahun Berjalan yang belum ditutup oleh Jurnal Penutup
    function computeCurrentYearUnclosedSHU() {
      const ej = enrichJournals();
      let rev = 0, hpp = 0, ops = 0, otherRev = 0, otherExp = 0, tax = 0;
      state.coa.forEach(a => {
        const ib = Number(a.initBalance) || 0;
        if (ib === 0) return;
        if (a.lvl1 === "4") rev += ib;
        else if (a.lvl1 === "5") hpp += ib;
        else if (a.lvl1 === "6") ops += ib;
        else if (a.lvl2 === "9.1") otherRev += ib;
        else if (a.lvl2 === "9.2") otherExp += ib;
        else if (a.lvl2 === "9.3") tax += ib;
      });
      ej.forEach(j => {
        if (j.lvl1 === "4") rev += j.jumlah;
        else if (j.lvl1 === "5") hpp += j.jumlah;
        else if (j.lvl1 === "6") ops += j.jumlah;
        else if (j.lvl2 === "9.1") otherRev += j.jumlah;
        else if (j.lvl2 === "9.2") otherExp += j.jumlah;
        else if (j.lvl2 === "9.3") tax += j.jumlah;
      });
      return (rev - hpp - ops) + (otherRev - otherExp) - tax;
    }

    function computeLPE() {
      const all = enrichAllJournals();
      const unclosedCurrentSHU = computeCurrentYearUnclosedSHU();
      const priorUnclosedSHU = computePriorYearsUnclosedSHU();
      const codes = ["3.1.1", "3.1.2", "3.1.3", "3.2.1", "3.3.1", "3.4.2", "3.4.1"];
      const awal = {};
      const mutasi = {};
      const akhir = {};

      codes.forEach(c => {
        let sa = state.coa.filter(a => a.lvl3 === c).reduce((s, a) => s + (Number(a.initBalance) || 0), 0);
        let mut = 0;
        all.forEach(j => {
          if (j.lvl3 === c) {
            if (activeBookYear === "ALL") {
              if (j.isExplicitSaldoAwal) sa += j.jumlah;
              else mut += j.jumlah;
            } else {
              if (j.year < activeBookYear) {
                sa += j.jumlah;
              } else if (j.year === activeBookYear) {
                if (j.isExplicitSaldoAwal) sa += j.jumlah;
                else mut += j.jumlah;
              }
            }
          }
        });
        if (activeBookYear !== "ALL" && c === "3.4.2") {
          sa += priorUnclosedSHU;
        }
        awal[c] = sa;
        if (c === "3.4.1") {
          mutasi[c] = mut + unclosedCurrentSHU;
        } else {
          mutasi[c] = mut;
        }
        akhir[c] = awal[c] + mutasi[c];
      });

      const sumObj = (obj) => codes.reduce((acc, c) => acc + (obj[c] || 0), 0);
      return {
        awal,
        mutasi,
        akhir,
        totAwal: sumObj(awal),
        totMutasi: sumObj(mutasi),
        totAkhir: sumObj(akhir)
      };
    }

    function computeNeraca() {
      const tb = computeTrialBalance();
      const all = enrichAllJournals();
      const lpe = computeLPE();

      const sumTbLvl3 = (lvl3) => tb.filter(a => a.lvl3 === lvl3).reduce((s, a) => s + a.saldoAkhir, 0);
      const sumAwalLvl3 = (lvl3) => {
        const manualSa = state.coa.filter(a => a.lvl3 === lvl3).reduce((s, a) => s + (Number(a.initBalance) || 0), 0);
        const journalSa = all.filter(j => {
          if (j.lvl3 !== lvl3) return false;
          if (activeBookYear === "ALL") return j.isExplicitSaldoAwal;
          return j.year < activeBookYear || (j.year === activeBookYear && j.isExplicitSaldoAwal);
        }).reduce((s, j) => s + j.jumlah, 0);
        return manualSa + journalSa;
      };

      // Aset Lancar
      const r111 = { end: sumTbLvl3("1.1.1"), start: sumAwalLvl3("1.1.1") };
      const r112 = { end: sumTbLvl3("1.1.2"), start: sumAwalLvl3("1.1.2") };
      const r113 = { end: -sumTbLvl3("1.1.3"), start: -sumAwalLvl3("1.1.3") };
      const r114 = { end: sumTbLvl3("1.1.4"), start: sumAwalLvl3("1.1.4") };
      const r115 = { end: sumTbLvl3("1.1.5"), start: sumAwalLvl3("1.1.5") };
      const r118 = { end: sumTbLvl3("1.1.8"), start: sumAwalLvl3("1.1.8") };
      const r119 = { end: sumTbLvl3("1.1.9"), start: sumAwalLvl3("1.1.9") };
      const totAsetLancar = {
        end: r111.end + r112.end + r113.end + r114.end + r115.end + r118.end + r119.end,
        start: r111.start + r112.start + r113.start + r114.start + r115.start + r118.start + r119.start
      };

      // Investasi
      const r121 = { end: sumTbLvl3("1.2.1"), start: sumAwalLvl3("1.2.1") };

      // Aset Tetap
      const r131 = { end: sumTbLvl3("1.3.1"), start: sumAwalLvl3("1.3.1") };
      const r132 = { end: sumTbLvl3("1.3.2"), start: sumAwalLvl3("1.3.2") };
      const r133 = { end: sumTbLvl3("1.3.3"), start: sumAwalLvl3("1.3.3") };
      const r134 = { end: sumTbLvl3("1.3.4"), start: sumAwalLvl3("1.3.4") };
      const r135 = { end: -Math.abs(sumTbLvl3("1.3.5")), start: -Math.abs(sumAwalLvl3("1.3.5")) };
      const r139 = { end: sumTbLvl3("1.3.9"), start: sumAwalLvl3("1.3.9") };
      const totAsetTetap = {
        end: r131.end + r132.end + r133.end + r134.end + r135.end + r139.end,
        start: r131.start + r132.start + r133.start + r134.start + r135.start + r139.start
      };

      // Aset Tak Berwujud & Lainnya
      const r141 = { end: sumTbLvl3("1.4.1"), start: sumAwalLvl3("1.4.1") };
      const r142 = { end: -Math.abs(sumTbLvl3("1.4.2")), start: -Math.abs(sumAwalLvl3("1.4.2")) };
      const totAsetTakBerwujud = { end: r141.end + r142.end, start: r141.start + r142.start };
      const r191 = { end: sumTbLvl3("1.5.1") + sumTbLvl3("1.9.1"), start: sumAwalLvl3("1.5.1") + sumAwalLvl3("1.9.1") };

      const totalAset = {
        end: totAsetLancar.end + r121.end + totAsetTetap.end + totAsetTakBerwujud.end + r191.end,
        start: totAsetLancar.start + r121.start + totAsetTetap.start + totAsetTakBerwujud.start + r191.start
      };

      // Kewajiban Jangka Pendek
      const r211 = { end: sumTbLvl3("2.1.1"), start: sumAwalLvl3("2.1.1") };
      const r212 = { end: sumTbLvl3("2.1.2"), start: sumAwalLvl3("2.1.2") };
      const r213 = { end: sumTbLvl3("2.1.3"), start: sumAwalLvl3("2.1.3") };
      const r214 = { end: sumTbLvl3("2.1.4"), start: sumAwalLvl3("2.1.4") };
      const r215 = { end: sumTbLvl3("2.1.5"), start: sumAwalLvl3("2.1.5") };
      const r216 = { end: sumTbLvl3("2.1.6"), start: sumAwalLvl3("2.1.6") };
      const r217 = { end: sumTbLvl3("2.1.7"), start: sumAwalLvl3("2.1.7") };
      const r218 = { end: sumTbLvl3("2.1.8"), start: sumAwalLvl3("2.1.8") };
      const r219 = { end: sumTbLvl3("2.1.9"), start: sumAwalLvl3("2.1.9") };
      const totKewajibanPendek = {
        end: r211.end + r212.end + r213.end + r214.end + r215.end + r216.end + r217.end + r218.end + r219.end,
        start: r211.start + r212.start + r213.start + r214.start + r215.start + r216.start + r217.start + r218.start + r219.start
      };

      // Kewajiban Jangka Panjang
      const r221 = { end: sumTbLvl3("2.2.1"), start: sumAwalLvl3("2.2.1") };
      const r222 = { end: sumTbLvl3("2.2.2"), start: sumAwalLvl3("2.2.2") };
      const r229 = { end: sumTbLvl3("2.2.9"), start: sumAwalLvl3("2.2.9") };
      const totKewajibanPanjang = {
        end: r221.end + r222.end + r229.end,
        start: r221.start + r222.start + r229.start
      };

      const totalKewajiban = {
        end: totKewajibanPendek.end + totKewajibanPanjang.end,
        start: totKewajibanPendek.start + totKewajibanPanjang.start
      };

      // Ekuitas dari LPE (Memisahkan secara jelas 3.4.2 Laba Ditahan / Retained Earnings & 3.4.1 SHU Tahun Berjalan)
      const e311 = { end: lpe.akhir["3.1.1"], start: lpe.awal["3.1.1"] };
      const e312 = { end: lpe.akhir["3.1.2"], start: lpe.awal["3.1.2"] };
      const e313 = { end: lpe.akhir["3.1.3"], start: lpe.awal["3.1.3"] };
      const e321 = { end: lpe.akhir["3.2.1"], start: lpe.awal["3.2.1"] };
      const e331 = { end: lpe.akhir["3.3.1"], start: lpe.awal["3.3.1"] };
      const e342 = { end: lpe.akhir["3.4.2"], start: lpe.awal["3.4.2"] };
      const e341 = { end: lpe.akhir["3.4.1"], start: lpe.awal["3.4.1"] };

      const totalEkuitas = {
        end: lpe.totAkhir,
        start: lpe.totAwal
      };

      const totalPasiva = {
        end: totalKewajiban.end + totalEkuitas.end,
        start: totalKewajiban.start + totalEkuitas.start
      };

      const rows = [
        { code: "1.0.0", no: 1, label: "ASET", isHeader: true },
        { code: "1.1.0", no: 2, label: "Aset Lancar", isSubHeader: true },
        { code: "1.1.1", no: 3, label: "Kas dan Setara Kas", ...r111 },
        { code: "1.1.2", no: 4, label: "Piutang", ...r112 },
        { code: "1.1.3", no: 5, label: "Penyisihan Piutang Tak Tertagih", ...r113 },
        { code: "1.1.4", no: 6, label: "Persediaan dan Perlengkapan", ...r114 },
        { code: "1.1.5", no: 7, label: "Pembayaran Dimuka", ...r115 },
        { code: "1.1.8", no: 8, label: "Aset Lancar Lainnya", ...r118 },
        { code: "1.1.9", no: 9, label: "RK Pusat / Unit Usaha", ...r119 },
        { code: "", no: 10, label: "Total Aset Lancar", ...totAsetLancar, isTotal: true },
        { code: "1.2.1", no: 11, label: "Investasi Jangka Pendek / Deposito", ...r121 },
        { code: "1.3.0", no: 12, label: "Aset Tetap", isSubHeader: true },
        { code: "1.3.1", no: 13, label: "Tanah", ...r131 },
        { code: "1.3.2", no: 14, label: "Gedung dan Bangunan", ...r132 },
        { code: "1.3.3", no: 15, label: "Peralatan dan Meubelair", ...r133 },
        { code: "1.3.4", no: 16, label: "Kendaraan", ...r134 },
        { code: "1.3.5", no: 17, label: "Akumulasi Penyusutan Aset Tetap", ...r135 },
        { code: "1.3.9", no: 18, label: "Aset Tetap Lainnya", ...r139 },
        { code: "", no: 19, label: "Total Aset Tetap", ...totAsetTetap, isTotal: true },
        { code: "1.4.0", no: 20, label: "Aset Tidak Berwujud (Bersih)", ...totAsetTakBerwujud },
        { code: "1.9.1", no: 21, label: "Investasi Jk. Panjang & Aset Lain-lain", ...r191 },
        { code: "", no: 22, label: "TOTAL ASET", ...totalAset, isGrand: true },

        { code: "2.0.0", no: 23, label: "KEWAJIBAN", isHeader: true },
        { code: "2.1.0", no: 24, label: "Kewajiban Jangka Pendek", isSubHeader: true },
        { code: "2.1.1", no: 25, label: "Utang Simpanan Anggota", ...r211 },
        { code: "2.1.2", no: 26, label: "Utang SHU", ...r212 },
        { code: "2.1.3", no: 27, label: "Utang Usaha & Dana Bergulir", ...r213 },
        { code: "2.1.4", no: 28, label: "Utang Pajak", ...r214 },
        { code: "2.1.5", no: 29, label: "Utang Gaji dan Tunjangan", ...r215 },
        { code: "2.1.6", no: 30, label: "Utang Utilitas (Listrik, Telepon)", ...r216 },
        { code: "2.1.7", no: 31, label: "Pendapatan Diterima Dimuka", ...r217 },
        { code: "2.1.8", no: 32, label: "Utang kepada Pihak Ketiga Jk. Pendek", ...r218 },
        { code: "2.1.9", no: 33, label: "Utang Jangka Pendek Lainnya", ...r219 },
        { code: "", no: 34, label: "Total Kewajiban Jangka Pendek", ...totKewajibanPendek, isTotal: true },
        { code: "2.2.0", no: 35, label: "Kewajiban Jangka Panjang", isSubHeader: true },
        { code: "2.2.1", no: 36, label: "Utang kepada Pihak Ketiga Jk. Panjang", ...r221 },
        { code: "2.2.2", no: 37, label: "Utang ke Bank", ...r222 },
        { code: "2.2.9", no: 38, label: "Utang Jangka Panjang Lainnya", ...r229 },
        { code: "", no: 39, label: "Total Kewajiban Jangka Panjang", ...totKewajibanPanjang, isTotal: true },
        { code: "", no: 40, label: "TOTAL KEWAJIBAN", ...totalKewajiban, isTotal: true },

        { code: "3.0.0", no: 41, label: "EKUITAS", isHeader: true },
        { code: "3.1.1", no: 42, label: "Simpanan Pokok", ...e311 },
        { code: "3.1.2", no: 43, label: "Simpanan Wajib", ...e312 },
        { code: "3.1.3", no: 44, label: "Simpanan Sukarela / Lainnya", ...e313 },
        { code: "3.2.1", no: 45, label: "Hibah / Donasi", ...e321 },
        { code: "3.3.1", no: 46, label: "Cadangan Koperasi", ...e331 },
        { code: "3.4.2", no: 47, label: "Laba Ditahan / Retained Earnings (Penutup Laba Rugi)", ...e342 },
        { code: "3.4.1", no: 48, label: "Sisa Hasil Usaha (SHU) Tahun Berjalan", ...e341 },
        { code: "", no: 49, label: "TOTAL EKUITAS", ...totalEkuitas, isTotal: true },
        { code: "", no: 50, label: "TOTAL KEWAJIBAN DAN EKUITAS", ...totalPasiva, isGrand: true }
      ];

      return {
        rows,
        kasAkhir: r111.end,
        persediaanAkhir: r114.end,
        totalAset: totalAset.end,
        totalKewajiban: totalKewajiban.end,
        totalEkuitas: totalEkuitas.end,
        totalPasiva: totalPasiva.end,
        selisih: Math.round(totalAset.end - totalPasiva.end)
      };
    }

    function computeArusKas() {
      const ej = enrichJournals();
      const all = enrichAllJournals();
      const neraca = computeNeraca();
      const sumCF = (compName) => ej.filter(j => (j.cashflow || "") === compName).reduce((s, j) => s + j.jumlah, 0);

      const opIn1 = sumCF("Penerimaan Kas dari Pelayanan kepada Anggota");
      const opIn2 = sumCF("Penerimaan Kas dari Non Anggota");
      const opIn3 = sumCF("Penerimaan Pendapatan Lain-lain");
      const totOpIn = opIn1 + opIn2 + opIn3;

      const opOut1 = sumCF("Pembelian Harga Pokok Barang");
      const opOut2 = sumCF("Pembayaran Beban Administrasi");
      const opOut3 = sumCF("Pembayaran Beban Pemasaran");
      const opOut4 = sumCF("Pengeluaran Beban Lain-lain");
      const opOut5 = sumCF("Pembayaran Beban Telepon");
      const opOut6 = sumCF("Pembayaran Pajak");
      const totOpOut = opOut1 + opOut2 + opOut3 + opOut4 + opOut5 + opOut6;
      const netOp = totOpIn + totOpOut;

      const invIn1 = sumCF("Penjualan Aset Tetap");
      const invIn2 = sumCF("Penjualan Investasi");
      const totInvIn = invIn1 + invIn2;

      const invOut1 = sumCF("Pembelian Aset Tetap");
      const invOut2 = sumCF("Pengeluaran Investasi");
      const totInvOut = invOut1 + invOut2;
      const netInv = totInvIn + totInvOut;

      const finIn1 = sumCF("Simpanan Anggota");
      const finIn2 = sumCF("Simpanan Lainnya");
      const finIn3 = sumCF("Hibah");
      const finIn4 = sumCF("Pinjaman Jangka Panjang");
      const totFinIn = finIn1 + finIn2 + finIn3 + finIn4;

      const finOut1 = sumCF("Pembayaran Utang Jangka Panjang");
      const finOut2 = sumCF("Pembagian SHU");
      const totFinOut = finOut1 + finOut2;
      const netFin = totFinIn + totFinOut;

      const kenaikanKas = netOp + netInv + netFin;
      const manualKasAwal = state.coa.filter(a => a.lvl3 === "1.1.1").reduce((s, a) => s + (Number(a.initBalance) || 0), 0);
      const journalKasAwal = all.filter(j => {
        if (j.lvl3 !== "1.1.1") return false;
        if (activeBookYear === "ALL") return j.isExplicitSaldoAwal;
        return j.year < activeBookYear || (j.year === activeBookYear && j.isExplicitSaldoAwal);
      }).reduce((s, j) => s + j.jumlah, 0);
      const kasAwal = manualKasAwal + journalKasAwal;

      const kasAkhir = kenaikanKas + kasAwal;
      const selisihKas = Math.round(kasAkhir - neraca.kasAkhir);

      const rows = [
        { no: 1, label: "ARUS KAS DARI AKTIVITAS OPERASI", isHeader: true },
        { no: 2, label: "Arus Kas Masuk Operasi", isSubHeader: true },
        { no: 3, label: "Penerimaan Kas dari Pelayanan kepada Anggota", val: opIn1 },
        { no: 4, label: "Penerimaan Kas dari Non Anggota", val: opIn2 },
        { no: 5, label: "Penerimaan Pendapatan Lain-lain", val: opIn3 },
        { no: 6, label: "Jumlah Arus Kas Masuk dari Aktivitas Operasi", val: totOpIn, isTotal: true },
        { no: 7, label: "Arus Kas Keluar Operasi", isSubHeader: true },
        { no: 8, label: "Pembelian Harga Pokok Barang", val: opOut1 },
        { no: 9, label: "Pembayaran Beban Administrasi", val: opOut2 },
        { no: 10, label: "Pembayaran Beban Pemasaran", val: opOut3 },
        { no: 11, label: "Pengeluaran Beban Lain-lain", val: opOut4 },
        { no: 12, label: "Pembayaran Beban Telepon & Utilitas", val: opOut5 },
        { no: 13, label: "Pembayaran Pajak", val: opOut6 },
        { no: 14, label: "Jumlah Arus Kas Keluar dari Aktivitas Operasi", val: totOpOut, isTotal: true },
        { no: 15, label: "ARUS KAS BERSIH DARI AKTIVITAS OPERASI", val: netOp, isGrand: true },

        { no: 16, label: "ARUS KAS DARI AKTIVITAS INVESTASI", isHeader: true },
        { no: 17, label: "Penjualan Aset Tetap", val: invIn1 },
        { no: 18, label: "Penjualan Investasi", val: invIn2 },
        { no: 19, label: "Pembelian Aset Tetap", val: invOut1 },
        { no: 20, label: "Pengeluaran Investasi", val: invOut2 },
        { no: 21, label: "ARUS KAS BERSIH DARI AKTIVITAS INVESTASI", val: netInv, isGrand: true },

        { no: 22, label: "ARUS KAS DARI AKTIVITAS PENDANAAN", isHeader: true },
        { no: 23, label: "Simpanan Anggota (Pokok & Wajib)", val: finIn1 },
        { no: 24, label: "Simpanan Lainnya", val: finIn2 },
        { no: 25, label: "Penerimaan Hibah", val: finIn3 },
        { no: 26, label: "Pinjaman Jangka Panjang", val: finIn4 },
        { no: 27, label: "Pembayaran Utang Jangka Panjang", val: finOut1 },
        { no: 28, label: "Pembagian SHU", val: finOut2 },
        { no: 29, label: "ARUS KAS BERSIH DARI AKTIVITAS PENDANAAN", val: netFin, isGrand: true },

        { no: 30, label: "KENAIKAN (PENURUNAN) BERSIH KAS DAN SETARA KAS", val: kenaikanKas, isGrand: true },
        { no: 31, label: "SALDO KAS DAN SETARA KAS AWAL TAHUN", val: kasAwal, isTotal: true },
        { no: 32, label: "SALDO KAS DAN SETARA KAS AKHIR TAHUN", val: kasAkhir, isGrand: true }
      ];

      return { rows, kenaikanKas, kasAwal, kasAkhir, selisihKas };
    }

    // ==================== CHART.JS INSTANCE ====================
    let financeChartInstance = null;

    function renderDashboardChart(neraca, invTotalVal, phu) {
      const canvas = document.getElementById("financeChart");
      if (!canvas || typeof Chart === "undefined") return;
      const ctx = canvas.getContext("2d");

      const dataVals = [
        neraca.totalAset,
        invTotalVal,
        phu.totPendapatan,
        phu.totHPP,
        neraca.totalEkuitas
      ];

      if (financeChartInstance) {
        financeChartInstance.destroy();
      }

      financeChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Total Aset",
            "Nilai Persediaan",
            "Pendapatan Usaha",
            "HPP Barang",
            "Total Ekuitas"
          ],
          datasets: [{
            label: "Nilai (Rupiah)",
            data: dataVals,
            backgroundColor: [
              "rgba(37, 99, 235, 0.85)",
              "rgba(217, 119, 6, 0.85)",
              "rgba(5, 150, 105, 0.85)",
              "rgba(225, 29, 72, 0.80)",
              "rgba(79, 70, 229, 0.85)"
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              ticks: {
                callback: function(value) {
                  return "Rp " + (value / 1000000).toLocaleString("id-ID") + " Jt";
                }
              }
            }
          }
        }
      });
    }

    // ==================== RENDER FUNCTIONS ====================
    function renderAll() {
      syncAvailableYears();
      ensureRetainedEarningsAccountInCoa();
      const invSummary = computeInventorySummary();
      const memSummary = computeMembersSummary();
      const phu = computePHU(Number(document.getElementById("reportMonthSelect")?.value || 12));
      const lpe = computeLPE();
      const neraca = computeNeraca();
      const arusKas = computeArusKas();
      const tb = computeTrialBalance();

      const periodLabel = activeBookYear === "ALL" ? "Semua Tahun (Akumulasi)" : `31 Desember ${activeBookYear}`;
      const displayCoopName = state.identity.coopName || (currentUser && currentUser.coopName) || "Identitas Koperasi Belum Diisi";
      const subParts = [state.identity.city, state.identity.province, state.identity.unitUsaha].filter(Boolean);
      document.getElementById("headerCoopName").textContent = displayCoopName;
      document.getElementById("headerCoopSub").textContent = subParts.length > 0 ? subParts.join(" - ") : "Silakan lengkapi profil pada menu Identitas Koperasi";
      document.querySelectorAll(".coop-name-span").forEach(el => el.textContent = displayCoopName);
      document.querySelectorAll(".coop-end-date-span").forEach(el => el.textContent = periodLabel);

      // Tampilkan tombol "Kembali ke Akun Admin Aplikasi" jika Admin Aplikasi sedang membuka ruang kerja akun usaha (Poin 2)
      const returnAdminBtn = document.getElementById("btnReturnToSysAdmin");
      if (returnAdminBtn) {
        returnAdminBtn.classList.toggle("hidden", !(isSupervisingFromSysAdmin && currentUser && !isUserAdmin(currentUser)));
      }

      if (currentUser) {
        const isKaryawanRole = activeSubSession.type === "KARYAWAN_USAHA";
        const opLabel = isKaryawanRole
          ? `Karyawan: ${activeSubSession.operatorName} (${activeSubSession.operatorId})`
          : (isUserAdmin(currentUser) ? `Admin Aplikasi: ${currentUser.fullName}` : `Admin Utama Usaha: ${currentUser.fullName}`);
        document.getElementById("activeUserBadge").textContent = opLabel;
        document.getElementById("drawerActiveSessionInfo").textContent = `${opLabel} | Koperasi: ${state.identity.coopName}`;
        document.getElementById("dashUserRoleInfo").textContent =
          `Otoritas Aktif: ${opLabel} - Data tersinkronisasi otomatis via Cloud untuk "${state.identity.coopName}".`;

        const navCat5 = document.getElementById("navCategorySettingsWrap");
        const btnTabIdentitas = document.querySelector('.tab-btn[data-tab="identitas"]');
        const btnTabPengaturan = document.querySelector('.tab-btn[data-tab="pengaturan"]');
        const btnHeaderSettings = document.getElementById("btnOpenAccountSettings");

        if (navCat5) navCat5.classList.toggle("hidden", isKaryawanRole);
        if (btnTabIdentitas) btnTabIdentitas.classList.toggle("hidden", isKaryawanRole);
        if (btnTabPengaturan) btnTabPengaturan.classList.toggle("hidden", isKaryawanRole);
        if (btnHeaderSettings) btnHeaderSettings.classList.toggle("hidden", isKaryawanRole);

        if (isKaryawanRole) {
          const idPanel = document.getElementById("tab-identitas");
          const setPanel = document.getElementById("tab-pengaturan");
          if ((idPanel && !idPanel.classList.contains("hidden")) || (setPanel && !setPanel.classList.contains("hidden"))) {
            idPanel?.classList.add("hidden");
            setPanel?.classList.add("hidden");
            document.getElementById("tab-dashboard")?.classList.remove("hidden");
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelector('.tab-btn[data-tab="dashboard"]')?.classList.add("active");
          }
        }
      }
      document.getElementById("dashActivePeriodBadge").textContent =
        activeBookYear === "ALL" ? "Periode: Akumulasi Lintas Tahun" : `Tahun Buku Aktif: ${activeBookYear}`;

      const headerBadge = document.getElementById("headerBalanceBadge");
      if (neraca.selisih === 0) {
        headerBadge.textContent = "Neraca: Balance";
        headerBadge.className = "text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-100";
      } else {
        headerBadge.textContent = `Selisih Neraca: ${fmtRp(neraca.selisih)}`;
        headerBadge.className = "text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/30 border border-amber-300 text-amber-100";
      }

      document.getElementById("navStockBadge").textContent = invSummary.length;
      document.getElementById("navMemberBadge").textContent = memSummary.length;
      const empBadge = document.getElementById("navEmployeeBadge");
      if (empBadge) empBadge.textContent = (state.employees || []).length;
      const supBadge = document.getElementById("navSupplierBadge");
      if (supBadge) supBadge.textContent = (state.suppliers || []).length;

      // Update badge Laba Ditahan di tab COA
      const reBadge = document.getElementById("coaRetainedEarningsPreviewBadge");
      if (reBadge) {
        const unclosed = computeCurrentYearUnclosedSHU();
        reBadge.textContent = `SHU Belum Ditutup (${activeBookYear}): ${fmtRp(unclosed)}`;
      }

      // 1. Render Dashboard
      const totalInvValue = invSummary.reduce((s, i) => s + i.finalVal, 0);
      const totalInvUnits = invSummary.reduce((s, i) => s + i.finalQty, 0);
      document.getElementById("kpiTotalAset").textContent = fmtRp(neraca.totalAset);
      document.getElementById("kpiKasSaldo").textContent = `Kas & Setara Kas: ${fmtRp(neraca.kasAkhir)}`;
      document.getElementById("kpiNilaiPersediaan").textContent = fmtRp(totalInvValue);
      document.getElementById("kpiInfoStok").textContent = `${invSummary.length} Jenis Barang - ${fmtNum(totalInvUnits)} Unit Tersedia`;
      document.getElementById("kpiTotalPendapatan").textContent = fmtRp(phu.totPendapatan);
      document.getElementById("kpiTotalHPP").textContent = `HPP Terjurnal: ${fmtRp(phu.totHPP)}`;
      document.getElementById("kpiSHUBersih").textContent = fmtRp(phu.shuSetelahPajak);
      document.getElementById("kpiEkuitasAkhir").textContent = `Total Ekuitas: ${fmtRp(neraca.totalEkuitas)}`;

      const dashStockList = document.getElementById("dashStockList");
      if (invSummary.length === 0) {
        dashStockList.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">Belum ada item barang persediaan.</div>`;
      } else {
        dashStockList.innerHTML = invSummary.map(it => {
          const badgeCls = it.status === "AMAN"
            ? "bg-emerald-100 text-emerald-800"
            : (it.status === "MENIPIS" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800");
          return `
            <div class="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
              <div>
                <p class="text-xs font-bold text-slate-800">${it.name}</p>
                <p class="text-[11px] text-slate-500">Supplier: ${(it.supplierCodes || []).join(", ")} | Masuk: +${fmtNum(it.qtyIn)} | Keluar: -${fmtNum(it.qtyOut)} ${it.unit}</p>
              </div>
              <div class="text-right">
                <span class="text-xs font-extrabold text-slate-900">${fmtNum(it.finalQty)} ${it.unit}</span>
                <div><span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeCls}">${it.status}</span></div>
              </div>
            </div>
          `;
        }).join("");
      }
      document.getElementById("dashLedgerInventoryVal").textContent = fmtRp(neraca.persediaanAkhir);

      renderDashboardChart(neraca, totalInvValue, phu);

      // 2. Render Database Anggota Tab
      renderMembersTab(memSummary);

      // 3. Render Database Karyawan Tab
      renderEmployeesTab();

      // 4. Render Data Supplier Tab
      renderSuppliersTab(invSummary);

      // 5. Render Persediaan Tab
      renderInventoryTab(invSummary, neraca.persediaanAkhir);

      // 6. Render Jurnal Tab
      renderJournalTab();

      // 7. Render Buku Besar & Neraca Saldo
      renderBukuBesarAndTB(tb);

      // 8. Render Laporan Keuangan
      renderFinancialReports(phu, lpe, neraca, arusKas);

      // 9. Render COA Tab
      renderCoaTab(tb);

      // 10. Render Identity Form
      renderIdentityForm();

      // 11. Render Pengaturan Akun & Panel Admin
      renderAccountSettingsAndAdminTab();

      // Populate Dropdowns
      populateItemDropdowns(invSummary);
      populateMemberDropdowns(memSummary);
      populateEmployeeDropdownsInJournal();
    
      const employeeMode = cloud.session?.sessionRole === 'employee';
      for (const input of document.querySelectorAll('#identityForm input,#identityForm button,#addCoaForm input,#addCoaForm select,#addCoaForm button,#coaTableBody input,#coaTableBody select,#coaTableBody button')) input.disabled = employeeMode;
      const resetButton = document.getElementById('btnResetDemoData'); if(resetButton) resetButton.disabled = employeeMode;
}

    function renderMembersTab(memSummary) {
      const search = (document.getElementById("searchMemberInput")?.value || "").toLowerCase();
      const totPokok = memSummary.reduce((s, m) => s + m.pokok, 0);
      const totWajib = memSummary.reduce((s, m) => s + m.wajib, 0);
      const totSukarela = memSummary.reduce((s, m) => s + m.sukarela, 0);
      const totPinjaman = memSummary.reduce((s, m) => s + m.pinjaman, 0);

      document.getElementById("memStatTotalCount").textContent = `${memSummary.length} Anggota`;
      document.getElementById("memStatSimpananPokok").textContent = fmtRp(totPokok);
      document.getElementById("memStatSimpananWajib").textContent = fmtRp(totWajib);
      document.getElementById("memStatSimpananSukarela").textContent = fmtRp(totSukarela);
      document.getElementById("memStatPinjaman").textContent = fmtRp(totPinjaman);

      const filtered = memSummary.filter(m => {
        const text = `${m.code} ${m.name} ${m.nik || ""} ${m.village || ""} ${m.address || ""}`.toLowerCase();
        return text.includes(search);
      });

      const tbody = document.getElementById("memberTableBody");
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="13" class="py-4 px-3 text-center text-slate-400">Tidak ada anggota yang sesuai pencarian.</td></tr>`;
      } else {
        tbody.innerHTML = filtered.map((m, idx) => `
          <tr class="hover:bg-slate-50">
            <td class="py-2.5 px-2.5 text-center text-slate-500">${idx + 1}</td>
            <td class="py-2.5 px-2.5 font-mono font-semibold text-slate-700">${m.code}</td>
            <td class="py-2.5 px-2.5 font-bold text-slate-900">${m.name}</td>
            <td class="py-2.5 px-2.5 font-mono text-slate-600">${m.nik || "-"}</td>
            <td class="py-2.5 px-2.5 text-center">${m.gender || "L"}</td>
            <td class="py-2.5 px-2.5 text-slate-600">${m.village || "-"} (RT ${m.rt || "00"}/RW ${m.rw || "00"})</td>
            <td class="py-2.5 px-2.5 whitespace-nowrap">${m.joinDate || "-"}</td>
            <td class="py-2.5 px-2.5 text-right font-semibold text-emerald-700 bg-emerald-50/40">${fmtRp(m.pokok)}</td>
            <td class="py-2.5 px-2.5 text-right font-semibold text-blue-700 bg-blue-50/40">${fmtRp(m.wajib)}</td>
            <td class="py-2.5 px-2.5 text-right font-semibold text-indigo-700 bg-indigo-50/40">${fmtRp(m.sukarela)}</td>
            <td class="py-2.5 px-2.5 text-right font-extrabold text-slate-900 bg-slate-100/70">${fmtRp(m.totalSimpanan)}</td>
            <td class="py-2.5 px-2.5 text-right font-semibold text-amber-800 bg-amber-50/40">${fmtRp(m.pinjaman)}</td>
            <td class="py-2.5 px-2.5 text-center whitespace-nowrap space-x-1">
              <button type="button" data-mem-action="sp" data-code="${m.code}" class="mem-action-btn px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold">Setor/Pinjam</button>
              <button type="button" data-mem-action="card" data-code="${m.code}" class="mem-action-btn px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold">Kartu Anggota</button>
              <button type="button" data-mem-action="edit" data-code="${m.code}" class="mem-action-btn px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Edit</button>
              <button type="button" data-mem-action="delete" data-code="${m.code}" class="mem-action-btn px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold">Hapus</button>
            </td>
          </tr>
        `).join("");
      }

      document.getElementById("memberTableFoot").innerHTML = `
        <tr>
          <td colspan="7" class="py-3 px-3 text-right">TOTAL REKAPITULASI SALDO ANGGOTA:</td>
          <td class="py-3 px-2.5 text-right text-emerald-700">${fmtRp(filtered.reduce((s, m) => s + m.pokok, 0))}</td>
          <td class="py-3 px-2.5 text-right text-blue-700">${fmtRp(filtered.reduce((s, m) => s + m.wajib, 0))}</td>
          <td class="py-3 px-2.5 text-right text-indigo-700">${fmtRp(filtered.reduce((s, m) => s + m.sukarela, 0))}</td>
          <td class="py-3 px-2.5 text-right font-extrabold text-slate-900">${fmtRp(filtered.reduce((s, m) => s + m.totalSimpanan, 0))}</td>
          <td class="py-3 px-2.5 text-right text-amber-800">${fmtRp(filtered.reduce((s, m) => s + m.pinjaman, 0))}</td>
          <td></td>
        </tr>
      `;

      const logFilter = document.getElementById("filterMemberLogSelect")?.value || "ALL";
      const allLogs = [];
      memSummary.forEach(m => {
        if (logFilter === "ALL" || logFilter === m.code) {
          m.transactions.forEach(t => {
            allLogs.push({ ...t, memberCode: m.code, memberName: m.name });
          });
        }
      });
      allLogs.sort((a, b) => (a.date || "").localeCompare(b.date || ""));

      const logBody = document.getElementById("memberLogTableBody");
      if (allLogs.length === 0) {
        logBody.innerHTML = `<tr><td colspan="7" class="py-4 px-3 text-center text-slate-400">Belum ada transaksi simpan pinjam anggota pada periode ini (Semua dimulai dari 0).</td></tr>`;
      } else {
        logBody.innerHTML = allLogs.map(l => `
          <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">${l.date}</td>
            <td class="py-2 px-3 font-mono text-slate-700">${l.docNo}</td>
            <td class="py-2 px-3 font-bold text-indigo-900">${l.memberCode} - ${l.memberName}</td>
            <td class="py-2 px-3 font-medium">${l.account}</td>
            <td class="py-2 px-3 text-right font-semibold text-emerald-700">${l.debit > 0 ? fmtNum(l.debit) : "-"}</td>
            <td class="py-2 px-3 text-right font-semibold text-blue-700">${l.kredit > 0 ? fmtNum(l.kredit) : "-"}</td>
            <td class="py-2 px-3 text-slate-600">${l.desc || "-"}</td>
          </tr>
        `).join("");
      }
    }

    // ==================== RENDER DATABASE KARYAWAN (ADMIN USAHA BISA LIHAT ID & PASSWORD TANPA BINTANG-BINTANG - POIN 1) ====================
    function renderEmployeesTab() {
      const emps = state.employees || [];
      const search = (document.getElementById("searchEmployeeInput")?.value || "").toLowerCase();
      const isAdminUsaha = isCurrentOperatorAdminUsaha();

      const addBtn = document.getElementById("btnOpenAddEmployeeModal");
      const notice = document.getElementById("empOnlyAdminNotice");
      const badge = document.getElementById("empAuthorityBadge");
      if (addBtn) addBtn.classList.toggle("hidden", !isAdminUsaha);
      if (notice) notice.classList.toggle("hidden", isAdminUsaha);
      if (badge) {
        badge.textContent = isAdminUsaha ? "Kontrol Penuh: Admin Utama Usaha" : "Mode Baca: Karyawan Usaha";
        badge.className = isAdminUsaha
          ? "text-[11px] font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800"
          : "text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-800";
      }

      const totSalary = emps.reduce((s, e) => s + (Number(e.baseSalary) || 0), 0);
      const totAllow = emps.reduce((s, e) => s + (Number(e.allowance) || 0), 0);
      document.getElementById("empStatCount").textContent = `${emps.length} Karyawan`;
      document.getElementById("empStatBaseSalary").textContent = fmtRp(totSalary);
      document.getElementById("empStatAllowance").textContent = fmtRp(totAllow);
      document.getElementById("empStatTotalPayroll").textContent = fmtRp(totSalary + totAllow);

      const filtered = emps.filter(e => {
        const txt = `${e.id} ${e.name} ${e.position || ""} ${e.department || ""} ${e.address || ""} ${e.phone || ""}`.toLowerCase();
        return txt.includes(search);
      });

      const tbody = document.getElementById("employeeTableBody");
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="py-4 px-3 text-center text-slate-400">Belum ada data karyawan yang sesuai pencarian.</td></tr>`;
      } else {
        tbody.innerHTML = filtered.map((e, idx) => {
          const sal = Number(e.baseSalary) || 0;
          const allw = Number(e.allowance) || 0;
          const tot = sal + allw;
          const plainPwd = e.hasPassword ? 'Aktif — tidak ditampilkan' : 'Belum diatur';
          return `
            <tr class="hover:bg-slate-50">
              <td class="py-2.5 px-3 text-center text-slate-500">${idx + 1}</td>
              <td class="py-2.5 px-3 font-mono font-bold text-slate-900">${e.id}</td>
              <td class="py-2.5 px-3 font-bold text-slate-800">${e.name}</td>
              <td class="py-2.5 px-3">
                <p class="font-semibold text-slate-800">${e.position || "-"}</p>
                <p class="text-[11px] text-slate-500">${e.department || "-"}</p>
              </td>
              <td class="py-2.5 px-3">
                <p class="text-slate-700">${e.address || "-"}</p>
                <p class="font-mono text-[11px] text-slate-500">${e.phone || "-"}</p>
              </td>
              <td class="py-2.5 px-3 text-right font-semibold text-emerald-700">${fmtRp(sal)}</td>
              <td class="py-2.5 px-3 text-right font-semibold text-blue-700">${fmtRp(allw)}</td>
              <td class="py-2.5 px-3 text-right font-extrabold text-slate-900 bg-slate-50">${fmtRp(tot)}</td>
              <td class="py-2.5 px-3 text-center">
                <span class="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 font-mono font-bold text-xs">${plainPwd}</span>
              </td>
              <td class="py-2.5 px-3 text-center whitespace-nowrap space-x-1">
                ${isAdminUsaha ? `
                  <button type="button" data-emp-action="edit" data-id="${e.id}" class="emp-action-btn px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Edit</button>
                  <button type="button" data-emp-action="delete" data-id="${e.id}" class="emp-action-btn px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold">Hapus</button>
                ` : `<span class="text-slate-400 text-[11px]">Khusus Admin Usaha</span>`}
              </td>
            </tr>
          `;
        }).join("");
      }

      document.getElementById("employeeTableFoot").innerHTML = `
        <tr>
          <td colspan="5" class="py-3 px-3 text-right">TOTAL GAJI POKOK & TUNJANGAN KARYAWAN:</td>
          <td class="py-3 px-3 text-right text-emerald-700">${fmtRp(filtered.reduce((s, e) => s + (Number(e.baseSalary) || 0), 0))}</td>
          <td class="py-3 px-3 text-right text-blue-700">${fmtRp(filtered.reduce((s, e) => s + (Number(e.allowance) || 0), 0))}</td>
          <td class="py-3 px-3 text-right font-extrabold text-slate-900">${fmtRp(filtered.reduce((s, e) => s + (Number(e.baseSalary) || 0) + (Number(e.allowance) || 0), 0))}</td>
          <td colspan="2"></td>
        </tr>
      `;
    }

    // ==================== RENDER DATA SUPPLIER ====================
    function renderSuppliersTab(invSummary) {
      const sups = state.suppliers || [];
      const search = (document.getElementById("searchSupplierInput")?.value || "").toLowerCase();

      const totQty = sups.reduce((s, x) => s + (Number(x.qtyBought) || 0), 0);
      const totVal = sups.reduce((s, x) => s + ((Number(x.qtyBought) || 0) * (Number(x.buyPrice) || 0)), 0);

      document.getElementById("supStatCount").textContent = `${sups.length} Data Supplier`;
      document.getElementById("supStatTotalQty").textContent = `${fmtNum(totQty)} Unit`;
      document.getElementById("supStatTotalValue").textContent = fmtRp(totVal);

      const filtered = sups.filter(s => {
        const txt = `${s.code} ${s.name} ${s.address || ""} ${s.phone || ""} ${s.itemCode || ""} ${s.itemName || ""}`.toLowerCase();
        return txt.includes(search);
      });

      const tbody = document.getElementById("supplierTableBody");
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="py-4 px-3 text-center text-slate-400">Tidak ada data supplier yang sesuai pencarian.</td></tr>`;
      } else {
        tbody.innerHTML = filtered.map((s, idx) => {
          const q = Number(s.qtyBought) || 0;
          const p = Number(s.buyPrice) || 0;
          const tot = q * p;
          return `
            <tr id="supplier-row-${s.code}" class="hover:bg-slate-50 transition">
              <td class="py-2.5 px-3 text-center text-slate-500">${idx + 1}</td>
              <td class="py-2.5 px-3 font-mono font-extrabold text-red-700">${s.code}</td>
              <td class="py-2.5 px-3 font-bold text-slate-900">${s.name}</td>
              <td class="py-2.5 px-3">
                <p class="text-slate-700">${s.address || "-"}</p>
                <p class="font-mono text-[11px] text-slate-500">${s.phone || "-"}</p>
              </td>
              <td class="py-2.5 px-3">
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">${s.itemCode ? s.itemCode + ' - ' : ''}${s.itemName || "-"}</span>
              </td>
              <td class="py-2.5 px-3 text-right font-semibold text-emerald-700 bg-emerald-50/40">${fmtNum(q)}</td>
              <td class="py-2.5 px-3 text-right font-bold text-amber-800 bg-amber-50/40">${fmtRp(p)}</td>
              <td class="py-2.5 px-3 text-right font-extrabold text-slate-900 bg-slate-50">${fmtRp(tot)}</td>
              <td class="py-2.5 px-3 text-center font-mono text-[11px] text-slate-600">${s.date || "-"}<br/>${s.docNo || "-"}</td>
              <td class="py-2.5 px-3 text-center whitespace-nowrap space-x-1">
                <button type="button" data-sup-action="detail" data-code="${s.code}" data-item="${s.itemCode || ''}" class="sup-action-btn px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold">Detail</button>
                <button type="button" data-sup-action="edit" data-id="${s.id}" class="sup-action-btn px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Edit</button>
                <button type="button" data-sup-action="delete" data-id="${s.id}" class="sup-action-btn px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold">Hapus</button>
              </td>
            </tr>
          `;
        }).join("");
      }

      document.getElementById("supplierTableFoot").innerHTML = `
        <tr>
          <td colspan="5" class="py-3 px-3 text-right">TOTAL PASOKAN & NILAI BELI (HPP) SUPPLIER:</td>
          <td class="py-3 px-3 text-right text-emerald-700">${fmtNum(filtered.reduce((s, x) => s + (Number(x.qtyBought) || 0), 0))}</td>
          <td></td>
          <td class="py-3 px-3 text-right font-extrabold text-red-700">${fmtRp(filtered.reduce((s, x) => s + ((Number(x.qtyBought) || 0) * (Number(x.buyPrice) || 0)), 0))}</td>
          <td colspan="2"></td>
        </tr>
      `;
    }

    function openSupplierDetailModal(itemCodeOrName, supplierCodeFilter = null) {
      const itObj = state.items.find(i => i.code === itemCodeOrName || i.name === itemCodeOrName);
      const sups = (state.suppliers || []).filter(s => {
        if (itObj) {
          return s.itemCode === itObj.code || s.itemName === itObj.name || (supplierCodeFilter && s.code === supplierCodeFilter);
        }
        return supplierCodeFilter ? s.code === supplierCodeFilter : true;
      });

      const title = itObj
        ? `RINCIAN SUPPLIER & HPP BARANG: ${itObj.name} (${itObj.code})`
        : `RINCIAN PASOKAN SUPPLIER (${supplierCodeFilter || "Semua"})`;
      document.getElementById("sdModalTitle").textContent = title;
      document.getElementById("sdModalSub").textContent = itObj
        ? `HPP Satuan Aktif di Daftar Barang: ${fmtRp(itObj.cost)} | Klik "Buka Menu Data Supplier Lengkap" untuk mengelola supplier.`
        : `Menampilkan rincian kuantitas barang yang dibeli dan HPP dari supplier.`;

      const totQty = sups.reduce((s, x) => s + (Number(x.qtyBought) || 0), 0);
      const totVal = sups.reduce((s, x) => s + ((Number(x.qtyBought) || 0) * (Number(x.buyPrice) || 0)), 0);

      document.getElementById("sdSummaryBoxes").innerHTML = `
        <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span class="text-[11px] text-slate-500">Jumlah Catatan Supplier</span>
          <p class="text-sm font-extrabold text-slate-900">${sups.length} Pasokan Supplier</p>
        </div>
        <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <span class="text-[11px] text-emerald-800">Total Kuantitas Dibeli dari Supplier</span>
          <p class="text-sm font-extrabold text-emerald-900">${fmtNum(totQty)} ${itObj ? itObj.unit : 'Unit'}</p>
        </div>
        <div class="p-3 rounded-lg bg-amber-50 border border-amber-200">
          <span class="text-[11px] text-amber-800">HPP Aktif / Total Nilai Beli</span>
          <p class="text-sm font-extrabold text-amber-900">${itObj ? fmtRp(itObj.cost) + ' / ' : ''}${fmtRp(totVal)}</p>
        </div>
      `;

      const tbody = document.getElementById("sdTableBody");
      if (sups.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-4 px-3 text-center text-slate-400">Belum ada rincian pembelian supplier untuk barang ini. Silakan tambahkan melalui menu Data Supplier.</td></tr>`;
      } else {
        tbody.innerHTML = sups.map(s => {
          const q = Number(s.qtyBought) || 0;
          const p = Number(s.buyPrice) || 0;
          return `
            <tr class="hover:bg-slate-50">
              <td class="py-2 px-3 font-mono font-extrabold text-red-700">${s.code}</td>
              <td class="py-2 px-3 font-bold text-slate-900">${s.name}</td>
              <td class="py-2 px-3 text-slate-600">${s.address || "-"} (${s.phone || "-"})</td>
              <td class="py-2 px-3 font-semibold">${s.itemName || "-"}</td>
              <td class="py-2 px-3 text-right font-bold text-emerald-700">${fmtNum(q)}</td>
              <td class="py-2 px-3 text-right font-bold text-amber-800">${fmtRp(p)}</td>
              <td class="py-2 px-3 text-right font-extrabold text-slate-900">${fmtRp(q * p)}</td>
            </tr>
          `;
        }).join("");
      }

      const m = document.getElementById("modalSupplierDetail");
      m.classList.remove("hidden");
      m.classList.add("flex");
    }

    function populateAllCoaLinkedDropdowns() {
      const allCoa = state.coa || [];
      const cashAccounts = allCoa.filter(a => a.lvl3 === "1.1.1" || a.code.startsWith("1.1.1"));
      const fallbackCash = cashAccounts.length > 0 ? cashAccounts : allCoa.filter(a => a.lvl1 === "1");

      // 1. Sinkronkan dropdown Kas/Bank di Wizard Simpan Pinjam & Modal Anggota
      ["spCashAccount", "mmInitCashAcc"].forEach(selId => {
        const sel = document.getElementById(selId);
        if (!sel) return;
        const cur = sel.value;
        sel.innerHTML = fallbackCash.map(a => `<option value="${a.full}">${a.full}</option>`).join("");
        const matched = fallbackCash.find(a => a.full === cur || a.code === (cur || "").split(" ")[0]);
        if (matched) sel.value = matched.full;
      });

      // 2. Sinkronkan dropdown Akun Pembayaran di Wizard Barang & Modal Supplier (Kas/Bank, Piutang, Utang/Pinjaman)
      ["qtPayAccount", "supPayAccSelect"].forEach(selId => {
        const sel = document.getElementById(selId);
        if (!sel) return;
        const cur = sel.value;
        const payCoas = allCoa.filter(a =>
          a.code.startsWith("1.1.1") ||
          a.code.startsWith("1.1.2") ||
          a.code.startsWith("2.1.3") ||
          a.code.startsWith("2.1.8") ||
          a.code.startsWith("2.2.")
        );
        sel.innerHTML = payCoas.map(a => `<option value="${a.full}">${a.full}</option>`).join("");
        const matched = payCoas.find(a => a.full === cur || a.code === (cur || "").split(" ")[0]);
        if (matched) sel.value = matched.full;
      });

      // 3. Sinkronkan dropdown Akun Persediaan (1.1.4) di Master Barang & Filter Persediaan
      const invCoas = allCoa.filter(a => a.code.startsWith("1.1.4"));
      const imAccSel = document.getElementById("imAccount");
      if (imAccSel && invCoas.length > 0) {
        const cur = imAccSel.value;
        imAccSel.innerHTML = invCoas.map(a => `<option value="${a.full}">${a.full}</option>`).join("");
        const matched = invCoas.find(a => a.full === cur || a.code === (cur || "").split(" ")[0]);
        if (matched) imAccSel.value = matched.full;
      }
      const filterInvCat = document.getElementById("filterInventoryCat");
      if (filterInvCat && invCoas.length > 0) {
        const cur = filterInvCat.value || "ALL";
        filterInvCat.innerHTML = `<option value="ALL">Semua Akun Persediaan (1.1.4)</option>` +
          invCoas.map(a => `<option value="${a.full}">${a.full}</option>`).join("");
        if (cur === "ALL" || invCoas.some(a => a.full === cur)) filterInvCat.value = cur;
      }
    }

    function populateSimpanPinjamTargetCoaByType(type) {
      const allCoa = state.coa || [];
      const targetSel = document.getElementById("spTargetCoaAccount");
      const intSel = document.getElementById("spInterestCoaAccount");
      if (!targetSel) return;

      const prevTarget = targetSel.value;
      let preferredPrefixes = ["3.1.1"];
      let defaultCode = "3.1.1.01";

      if (type === "SETOR_POKOK") {
        preferredPrefixes = ["3.1.1", "2.1.1.01"];
        defaultCode = "3.1.1.01";
      } else if (type === "SETOR_WAJIB") {
        preferredPrefixes = ["3.1.2", "2.1.1.02"];
        defaultCode = "3.1.2.01";
      } else if (type === "SETOR_SUKARELA" || type === "TARIK_SUKARELA") {
        preferredPrefixes = ["3.1.3", "2.1.1.03"];
        defaultCode = "3.1.3.01";
      } else if (type === "CAIR_PINJAMAN" || type === "ANGSURAN_PINJAMAN") {
        preferredPrefixes = ["1.1.2"];
        defaultCode = "1.1.2.05";
      } else if (type === "TERIMA_HIBAH" || type === "GUNAKAN_HIBAH") {
        preferredPrefixes = ["3.2.1", "3.2"];
        defaultCode = "3.2.1.01";
      } else if (type === "TAMBAH_CADANGAN") {
        preferredPrefixes = ["3.3.1", "3.3", "3.4"];
        defaultCode = "3.3.1.01";
      } else if (type === "TERIMA_PINJAMAN_BANK" || type === "BAYAR_PINJAMAN_BANK") {
        preferredPrefixes = ["2.2.2", "2.2.1", "2.2.9", "2.1.3.02", "2.1.8", "2.1.9"];
        defaultCode = "2.2.2.01";
      }

      const primaryMatches = allCoa.filter(a => preferredPrefixes.some(p => a.code.startsWith(p)));
      const otherMatches = allCoa.filter(a => !preferredPrefixes.some(p => a.code.startsWith(p)));

      targetSel.innerHTML =
        `<optgroup label="Akun COA Utama Sesuai Jenis Transaksi">` +
        primaryMatches.map(a => `<option value="${a.full}">${a.full}</option>`).join("") +
        `</optgroup>` +
        `<optgroup label="Seluruh Akun COA Lainnya">` +
        otherMatches.map(a => `<option value="${a.full}">${a.full}</option>`).join("") +
        `</optgroup>`;

      const prevMatch = primaryMatches.find(a => a.full === prevTarget || a.code === (prevTarget || "").split(" ")[0]);
      const defMatch = allCoa.find(a => a.code === defaultCode) || primaryMatches[0];
      if (prevMatch) {
        targetSel.value = prevMatch.full;
      } else if (defMatch) {
        targetSel.value = defMatch.full;
      }

      if (intSel) {
        const prevInt = intSel.value;
        const isBankLoan = type === "BAYAR_PINJAMAN_BANK";
        const intPrefixes = isBankLoan ? ["9.2.2", "9.2", "6.1"] : ["4.1.3", "4.2.3", "4.1", "9.1"];
        const intDefCode = isBankLoan ? "9.2.2.01" : "4.1.3.02";
        const intPrimary = allCoa.filter(a => intPrefixes.some(p => a.code.startsWith(p)));
        const intOther = allCoa.filter(a => !intPrefixes.some(p => a.code.startsWith(p)));
        intSel.innerHTML =
          `<optgroup label="Akun Jasa / Bunga Terkait">` +
          intPrimary.map(a => `<option value="${a.full}">${a.full}</option>`).join("") +
          `</optgroup>` +
          `<optgroup label="Akun COA Lainnya">` +
          intOther.map(a => `<option value="${a.full}">${a.full}</option>`).join("") +
          `</optgroup>`;
        const intPrevMatch = intPrimary.find(a => a.full === prevInt || a.code === (prevInt || "").split(" ")[0]);
        const intDefMatch = allCoa.find(a => a.code === intDefCode) || intPrimary[0];
        if (intPrevMatch) intSel.value = intPrevMatch.full;
        else if (intDefMatch) intSel.value = intDefMatch.full;
      }
    }

    function populateMemberDropdowns(memSummary) {
      populateAllCoaLinkedDropdowns();
      const spSelect = document.getElementById("spMemberCode");
      if (spSelect) {
        const cur = spSelect.value;
        spSelect.innerHTML = memSummary.map(m =>
          `<option value="${m.code}">${m.code} - ${m.name} (Pokok: ${fmtRp(m.pokok)} | Wajib: ${fmtRp(m.wajib)})</option>`
        ).join("") + `<option value="__NEW_MEMBER__">+ Tambah Anggota Baru Sekaligus...</option>`;
        if (cur && (memSummary.some(m => m.code === cur) || cur === "__NEW_MEMBER__")) {
          spSelect.value = cur;
        } else if (memSummary.length > 0) {
          spSelect.value = memSummary[0].code;
        } else {
          spSelect.value = "__NEW_MEMBER__";
        }
      }

      const logSelect = document.getElementById("filterMemberLogSelect");
      if (logSelect) {
        const curL = logSelect.value || "ALL";
        logSelect.innerHTML = `<option value="ALL">Tampilkan Semua Anggota</option>` +
          memSummary.map(m => `<option value="${m.code}">${m.code} - ${m.name}</option>`).join("");
        logSelect.value = curL;
      }

      const spTypeVal = document.getElementById("spType")?.value || "SETOR_POKOK";
      populateSimpanPinjamTargetCoaByType(spTypeVal);
      updateSimpanPinjamPreview();
    }

    function buildEmployeeOptionsHtml() {
      const emps = state.employees || [];
      const adminLabel = currentUser
        ? `ADMIN - ${currentUser.fullName} (Admin Utama Usaha)`
        : `ADMIN - Admin Utama Usaha`;
      let html = `<option value="${adminLabel}">${adminLabel}</option>`;
      emps.forEach(e => {
        const val = `${e.id} - ${e.name} (${e.position || 'Karyawan'})`;
        html += `<option value="${val}">${val}</option>`;
      });
      return html;
    }

    function getDefaultActiveOfficerValue() {
      if (activeSubSession.type === "KARYAWAN_USAHA") {
        const found = (state.employees || []).find(e => e.id === activeSubSession.operatorId);
        if (found) return `${found.id} - ${found.name} (${found.position || 'Karyawan'})`;
      }
      return currentUser
        ? `ADMIN - ${currentUser.fullName} (Admin Utama Usaha)`
        : `ADMIN - Admin Utama Usaha`;
    }

    function populateEmployeeDropdownsInJournal() {
      const optionsHtml = buildEmployeeOptionsHtml();
      const defVal = getDefaultActiveOfficerValue();
      document.querySelectorAll("#journalFormLines .jline-member").forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = optionsHtml;
        if (cur && Array.from(sel.options).some(o => o.value === cur)) {
          sel.value = cur;
        } else {
          sel.value = defVal;
        }
      });
    }

    function renderInventoryTab(invSummary, ledgerInvVal) {
      const search = (document.getElementById("searchInventoryInput")?.value || "").toLowerCase();
      const catFilter = document.getElementById("filterInventoryCat")?.value || "ALL";
      const statusFilter = document.getElementById("filterInventoryStatus")?.value || "ALL";

      const totInAll = invSummary.reduce((s, i) => s + i.qtyIn, 0);
      const totOutAll = invSummary.reduce((s, i) => s + i.qtyOut, 0);
      const totValAll = invSummary.reduce((s, i) => s + i.finalVal, 0);

      document.getElementById("invStatCount").textContent = `${invSummary.length} Jenis Barang`;
      document.getElementById("invStatMutasi").textContent = `+${fmtNum(totInAll)} Masuk / -${fmtNum(totOutAll)} Keluar`;
      document.getElementById("invStatTotalValue").textContent = fmtRp(totValAll);
      document.getElementById("invStatLedgerValue").textContent = fmtRp(ledgerInvVal);

      const filtered = invSummary.filter(it => {
        const supText = (it.supplierCodes || []).join(" ").toLowerCase();
        const matchSearch = it.name.toLowerCase().includes(search) || it.code.toLowerCase().includes(search) || supText.includes(search);
        const matchCat = catFilter === "ALL" || it.account === catFilter;
        const matchStatus = statusFilter === "ALL" || (statusFilter === "AMAN" ? it.status === "AMAN" : it.status !== "AMAN");
        return matchSearch && matchCat && matchStatus;
      });

      const tbody = document.getElementById("inventoryTableBody");
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="14" class="py-4 px-3 text-center text-slate-400">Tidak ada barang persediaan yang sesuai filter.</td></tr>`;
      } else {
        tbody.innerHTML = filtered.map(it => {
          const badgeCls = it.status === "AMAN"
            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
            : (it.status === "MENIPIS" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-rose-100 text-rose-800 border-rose-200");

          const supBadgesHtml = (it.supplierCodes || ["001/SUP/KDMP/2026"]).map(sc => `
            <button type="button" data-action="supplier-link" data-code="${it.code}" data-sup="${sc}" title="Klik untuk melihat detail pasokan Supplier ${sc} & HPP" class="inv-action-btn inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold text-[11px] transition cursor-pointer">
              ${sc}
            </button>
          `).join(" ");

          return `
            <tr class="hover:bg-slate-50">
              <td class="py-2.5 px-3 font-mono font-semibold text-slate-700">${it.code}</td>
              <td class="py-2.5 px-3 font-bold text-slate-900">${it.name}</td>
              <td class="py-2.5 px-3 whitespace-nowrap">${supBadgesHtml}</td>
              <td class="py-2.5 px-3 text-slate-600">${it.account}</td>
              <td class="py-2.5 px-3 text-center">${it.unit}</td>
              <td class="py-2.5 px-3 text-right">${fmtNum(it.initQty)}</td>
              <td class="py-2.5 px-3 text-right font-semibold text-emerald-700 bg-emerald-50/40">+${fmtNum(it.qtyIn)}</td>
              <td class="py-2.5 px-3 text-right font-semibold text-rose-700 bg-rose-50/40">-${fmtNum(it.qtyOut)}</td>
              <td class="py-2.5 px-3 text-right font-extrabold text-slate-900 bg-slate-100/70">${fmtNum(it.finalQty)}</td>
              <td class="py-2.5 px-3 text-right font-semibold text-amber-900">${fmtRp(it.cost)}</td>
              <td class="py-2.5 px-3 text-right">${fmtRp(it.price)}</td>
              <td class="py-2.5 px-3 text-right font-bold text-slate-900">${fmtRp(it.finalVal)}</td>
              <td class="py-2.5 px-3 text-center">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeCls}">${it.status}</span>
              </td>
              <td class="py-2.5 px-3 text-center whitespace-nowrap space-x-1">
                <button type="button" data-action="card" data-code="${it.code}" class="inv-action-btn px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold">Kartu Stok</button>
                <button type="button" data-action="edit" data-code="${it.code}" class="inv-action-btn px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Edit</button>
                <button type="button" data-action="delete" data-code="${it.code}" class="inv-action-btn px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold">Hapus</button>
              </td>
            </tr>
          `;
        }).join("");
      }

      const tfoot = document.getElementById("inventoryTableFoot");
      tfoot.innerHTML = `
        <tr>
          <td colspan="5" class="py-3 px-3 text-right">TOTAL REKAPITULASI PERSEDIAAN:</td>
          <td class="py-3 px-3 text-right">${fmtNum(filtered.reduce((s, i) => s + Number(i.initQty || 0), 0))}</td>
          <td class="py-3 px-3 text-right text-emerald-700">+${fmtNum(filtered.reduce((s, i) => s + i.qtyIn, 0))}</td>
          <td class="py-3 px-3 text-right text-rose-700">-${fmtNum(filtered.reduce((s, i) => s + i.qtyOut, 0))}</td>
          <td class="py-3 px-3 text-right font-extrabold">${fmtNum(filtered.reduce((s, i) => s + i.finalQty, 0))}</td>
          <td colspan="2"></td>
          <td class="py-3 px-3 text-right text-red-700 font-extrabold">${fmtRp(filtered.reduce((s, i) => s + i.finalVal, 0))}</td>
          <td colspan="2"></td>
        </tr>
      `;

      // Render Mutation History
      const cardFilter = document.getElementById("filterCardItemSelect")?.value || "ALL";
      const allMutations = [];
      invSummary.forEach(it => {
        if (cardFilter === "ALL" || cardFilter === it.name) {
          it.mutations.forEach(m => {
            allMutations.push({ ...m, itemName: it.name, unit: it.unit });
          });
        }
      });
      allMutations.sort((a, b) => (a.date || "").localeCompare(b.date || ""));

      const mutBody = document.getElementById("mutationHistoryBody");
      if (allMutations.length === 0) {
        mutBody.innerHTML = `<tr><td colspan="8" class="py-4 px-3 text-center text-slate-400">Belum ada mutasi barang pada periode ini (Semua dimulai dari 0).</td></tr>`;
      } else {
        mutBody.innerHTML = allMutations.map(m => {
          const isIn = m.type === "MASUK";
          return `
            <tr class="hover:bg-slate-50">
              <td class="py-2 px-3">${m.date}</td>
              <td class="py-2 px-3 font-mono text-slate-700">${m.docNo}</td>
              <td class="py-2 px-3 font-bold text-slate-800">${m.itemName}</td>
              <td class="py-2 px-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isIn ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                  ${isIn ? 'BARANG MASUK' : 'BARANG KELUAR'}
                </span>
              </td>
              <td class="py-2 px-3 text-right font-semibold text-emerald-700">${m.qtyIn > 0 ? '+' + fmtNum(m.qtyIn) + ' ' + m.unit : '-'}</td>
              <td class="py-2 px-3 text-right font-semibold text-rose-700">${m.qtyOut > 0 ? '-' + fmtNum(m.qtyOut) + ' ' + m.unit : '-'}</td>
              <td class="py-2 px-3 text-right font-semibold">${fmtRp(m.val)}</td>
              <td class="py-2 px-3 text-slate-600">${m.desc || '-'}</td>
            </tr>
          `;
        }).join("");
      }
    }

    // ==================== RENDER JURNAL HARIAN (HAPUS SEPAKET DEBIT+KREDIT PER NOMOR TRANSAKSI - POIN 6 GAMBAR 6) ====================
    function renderJournalTab() {
      const ej = enrichJournals();
      const mFilter = document.getElementById("filterJournalMonth")?.value || "ALL";
      const sFilter = (document.getElementById("searchJournalInput")?.value || "").toLowerCase();

      const filtered = ej.filter(j => {
        const matchM = mFilter === "ALL" || String(j.month) === String(mFilter);
        const text = `${j.docNo} ${j.account} ${j.officerName || ""} ${j.memberName || ""} ${j.memberCode || ""} ${j.itemName || ""} ${j.desc || ""} ${j.cashflow || ""}`.toLowerCase();
        return matchM && text.includes(sFilter);
      });

      const tbody = document.getElementById("journalTableBody");
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="py-5 px-3 text-center text-slate-400">Belum ada transaksi jurnal pada periode ini (Semua angka dimulai dari Rp 0). Silakan input jurnal baru di atas.</td></tr>`;
      } else {
        // Kelompokkan baris per Nomor Bukti agar tombol "Hapus Sepaket" menghapus seluruh pasangan Debit & Kredit sekaligus
        const docGroups = {};
        filtered.forEach(j => {
          const key = (j.docNo || "").trim();
          if (!docGroups[key]) docGroups[key] = [];
          docGroups[key].push(j);
        });

        const rowsHtml = [];
        Object.keys(docGroups).forEach(docKey => {
          const groupLines = docGroups[docKey];
          const rowSpanCount = groupLines.length;
          groupLines.forEach((j, idxInGroup) => {
            const tags = [];
            if (j.officerName) {
              tags.push(`<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">Petugas: ${j.officerName}</span>`);
            }
            if (j.memberName || j.memberCode) {
              tags.push(`<span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-semibold">Anggota: ${j.memberCode ? j.memberCode + ' - ' : ''}${j.memberName || ''}</span>`);
            }
            if (j.itemName) {
              tags.push(`<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">${j.itemName}</span>`);
            }

            const actionCellHtml = idxInGroup === 0 ? `
              <td rowspan="${rowSpanCount}" class="py-2 px-3 text-center align-middle border-l border-slate-200 bg-rose-50/20 no-print">
                <button type="button" data-docno="${j.docNo}" class="del-journal-btn text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 font-bold px-2.5 py-1.5 rounded-lg text-[11px] shadow-2xs transition cursor-pointer">
                  Hapus Sepaket (${rowSpanCount} Baris)
                </button>
              </td>
            ` : "";

            rowsHtml.push(`
              <tr class="hover:bg-slate-50 ${idxInGroup === rowSpanCount - 1 ? 'border-b-2 border-slate-300' : ''}">
                <td class="py-2 px-3 whitespace-nowrap">${j.date}</td>
                <td class="py-2 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">${j.docNo}</td>
                <td class="py-2 px-3 font-medium ${j.kredit > 0 ? 'pl-7 text-slate-700' : 'font-semibold text-slate-900'}">${j.account}</td>
                <td class="py-2 px-3 space-y-1">
                  ${tags.length > 0 ? tags.join("<br/>") : '<span class="text-slate-300">-</span>'}
                </td>
                <td class="py-2 px-3 text-right font-semibold">
                  ${j.qty ? (j.debit > 0 ? `<span class="text-emerald-700">+${fmtNum(j.qty)}</span>` : `<span class="text-rose-700">-${fmtNum(j.qty)}</span>`) : '-'}
                </td>
                <td class="py-2 px-3 text-right font-semibold text-emerald-700">${j.debit > 0 ? fmtNum(j.debit) : '-'}</td>
                <td class="py-2 px-3 text-right font-semibold text-blue-700">${j.kredit > 0 ? fmtNum(j.kredit) : '-'}</td>
                <td class="py-2 px-3 text-slate-600">${j.desc || '-'}</td>
                <td class="py-2 px-3 text-slate-500">${j.cashflow || '-'}</td>
                ${actionCellHtml}
              </tr>
            `);
          });
        });

        tbody.innerHTML = rowsHtml.join("");
      }

      const totD = filtered.reduce((s, j) => s + j.debit, 0);
      const totK = filtered.reduce((s, j) => s + j.kredit, 0);
      const diff = Math.round(totD - totK);

      const badge = document.getElementById("journalTableBalanceBadge");
      if (diff === 0) {
        badge.textContent = "Balance";
        badge.className = "text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800";
      } else {
        badge.textContent = `Tidak Balance (${fmtRp(diff)})`;
        badge.className = "text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800";
      }

      document.getElementById("journalTableFoot").innerHTML = `
        <tr>
          <td colspan="5" class="py-3 px-3 text-right">JUMLAH TOTAL JURNAL:</td>
          <td class="py-3 px-3 text-right text-emerald-700">${fmtRp(totD)}</td>
          <td class="py-3 px-3 text-right text-blue-700">${fmtRp(totK)}</td>
          <td colspan="3" class="py-3 px-3">${diff === 0 ? '<span class="text-emerald-700">Sisi Debit & Kredit Seimbang</span>' : `<span class="text-rose-700">Selisih: ${fmtRp(diff)}</span>`}</td>
        </tr>
      `;
    }

    function renderBukuBesarAndTB(tb) {
      const glSelect = document.getElementById("glAccountSelect");
      const currentVal = glSelect.value || "1.1.1.02 Kas di Bank BRI";
      glSelect.innerHTML = state.coa.map(a => `<option value="${a.full}">${a.full}</option>`).join("");
      if (state.coa.some(a => a.full === currentVal)) {
        glSelect.value = currentVal;
      }

      const selectedAcc = getAccountObj(glSelect.value) || state.coa[0];
      if (!selectedAcc) return;
      const manualInit = Number(selectedAcc.initBalance) || 0;
      document.getElementById("glAccountMeta").textContent = `Kode Akun: ${selectedAcc.code} - Nama Akun: ${selectedAcc.name} - Saldo Normal: ${selectedAcc.normal} - Saldo Awal Manual COA: ${fmtRp(manualInit)}`;

      const all = enrichAllJournals();
      const isBS = ["1", "2", "3"].includes(selectedAcc.lvl1);
      let priorBalance = manualInit;
      if (activeBookYear !== "ALL" && isBS) {
        all.filter(j => j.year < activeBookYear && (j.account === selectedAcc.full || j.code === selectedAcc.code)).forEach(j => {
          priorBalance += (selectedAcc.normal === "Debit" ? (j.debit - j.kredit) : (j.kredit - j.debit));
        });
        if (selectedAcc.code === "3.4.2.01") {
          priorBalance += computePriorYearsUnclosedSHU();
        }
      }

      const ej = enrichJournals().filter(j => j.account === selectedAcc.full || j.code === selectedAcc.code);
      let running = priorBalance;
      let totD = 0;
      let totK = 0;

      const glBody = document.getElementById("glTableBody");
      const rowsHtml = [];

      if (priorBalance !== 0) {
        const startYearLbl = activeBookYear === "ALL" ? (state.identity.startDate || "2026-01-01") : `${activeBookYear}-01-01`;
        rowsHtml.push(`
          <tr class="bg-amber-50/70 font-semibold">
            <td class="py-2 px-3">${startYearLbl}</td>
            <td class="py-2 px-3 font-mono">SALDO-AWAL</td>
            <td class="py-2 px-3">Saldo Awal Akun (Manual COA / Akumulasi Laba Ditahan Tahun Sebelumnya)</td>
            <td class="py-2 px-3 text-right">-</td>
            <td class="py-2 px-3 text-right">-</td>
            <td class="py-2 px-3 text-right font-bold text-slate-900">${fmtRp(running)}</td>
          </tr>
        `);
      }

      ej.forEach(j => {
        totD += j.debit;
        totK += j.kredit;
        running += (selectedAcc.normal === "Debit" ? (j.debit - j.kredit) : (j.kredit - j.debit));
        const extraItem = j.itemName ? ` [${j.itemName}: ${j.qty} unit]` : "";
        const extraOff = j.officerName ? ` [Petugas: ${j.officerName}]` : "";
        rowsHtml.push(`
          <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">${j.date}</td>
            <td class="py-2 px-3 font-mono">${j.docNo}</td>
            <td class="py-2 px-3">${j.desc || '-'}${extraOff}${extraItem}</td>
            <td class="py-2 px-3 text-right text-emerald-700 font-medium">${j.debit > 0 ? fmtNum(j.debit) : '-'}</td>
            <td class="py-2 px-3 text-right text-blue-700 font-medium">${j.kredit > 0 ? fmtNum(j.kredit) : '-'}</td>
            <td class="py-2 px-3 text-right font-bold text-slate-900">${fmtRp(running)}</td>
          </tr>
        `);
      });

      if (rowsHtml.length === 0) {
        glBody.innerHTML = `<tr><td colspan="6" class="py-4 px-3 text-center text-slate-400">Belum ada transaksi pada akun ${selectedAcc.full} (Saldo Rp 0).</td></tr>`;
      } else {
        glBody.innerHTML = rowsHtml.join("");
      }

      document.getElementById("glTableFoot").innerHTML = `
        <tr>
          <td colspan="3" class="py-2.5 px-3 text-right">SALDO AKHIR AKUN (${selectedAcc.full}):</td>
          <td class="py-2.5 px-3 text-right text-emerald-700">${fmtRp(totD)}</td>
          <td class="py-2.5 px-3 text-right text-blue-700">${fmtRp(totK)}</td>
          <td class="py-2.5 px-3 text-right text-red-700">${fmtRp(running)}</td>
        </tr>
      `;

      // Render Trial Balance (Neraca Saldo)
      const hideZero = document.getElementById("tbHideZeroToggle")?.checked;
      const tbRows = hideZero ? tb.filter(r => r.mutDebit !== 0 || r.mutKredit !== 0 || r.saldoAkhir !== 0) : tb;

      const tbBody = document.getElementById("tbTableBody");
      if (tbRows.length === 0) {
        tbBody.innerHTML = `<tr><td colspan="7" class="py-4 px-3 text-center text-slate-400">Semua akun bersaldo Rp 0. Hapus centang "Sembunyikan Akun Bersaldo Rp 0" untuk melihat seluruh daftar akun.</td></tr>`;
      } else {
        tbBody.innerHTML = tbRows.map(r => `
          <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">${r.normal}</td>
            <td class="py-2 px-3 font-medium text-slate-900">${r.full}</td>
            <td class="py-2 px-3 text-right">${fmtNum(r.mutDebit)}</td>
            <td class="py-2 px-3 text-right">${fmtNum(r.mutKredit)}</td>
            <td class="py-2 px-3 text-right font-semibold text-emerald-700 bg-slate-50">${fmtNum(r.saldoDebit)}</td>
            <td class="py-2 px-3 text-right font-semibold text-blue-700 bg-slate-50">${fmtNum(r.saldoKredit)}</td>
            <td class="py-2 px-3 text-right font-bold">${fmtRp(r.saldoAkhir)}</td>
          </tr>
        `).join("");
      }

      const sumMD = tb.reduce((s, r) => s + r.mutDebit, 0);
      const sumMK = tb.reduce((s, r) => s + r.mutKredit, 0);
      const sumSD = tb.reduce((s, r) => s + r.saldoDebit, 0);
      const sumSK = tb.reduce((s, r) => s + r.saldoKredit, 0);

      document.getElementById("tbTableFoot").innerHTML = `
        <tr>
          <td colspan="2" class="py-3 px-3 text-right">TOTAL NERACA SALDO:</td>
          <td class="py-3 px-3 text-right">${fmtRp(sumMD)}</td>
          <td class="py-3 px-3 text-right">${fmtRp(sumMK)}</td>
          <td class="py-3 px-3 text-right text-emerald-700">${fmtRp(sumSD)}</td>
          <td class="py-3 px-3 text-right text-blue-700">${fmtRp(sumSK)}</td>
          <td class="py-3 px-3 text-right">${Math.round(sumSD - sumSK) === 0 ? '<span class="text-emerald-700">BALANCE</span>' : 'TIDAK BALANCE'}</td>
        </tr>
      `;
    }

    function renderFinancialReports(phu, lpe, neraca, arusKas) {
      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      const mIdx = (Number(document.getElementById("reportMonthSelect")?.value || 12) - 1);
      const mName = monthNames[mIdx] || "Desember";
      const year = activeBookYear === "ALL" ? (state.identity.endDate || "2026-12-31").split("-")[0] : activeBookYear;

      document.getElementById("phuColMonthHeader").textContent = `${mName} ${year}`;
      document.getElementById("phuColYtdHeader").textContent = `s.d. Akhir ${mName} ${year}`;
      document.getElementById("phuSubtitlePeriod").textContent = `Untuk Periode yang Berakhir sampai dengan Akhir ${mName} ${year} (dalam Rupiah)`;

      document.getElementById("phuTableBody").innerHTML = phu.rows.map(r => {
        if (r.isHeader) {
          return `<tr class="bg-slate-200/80 font-extrabold text-slate-900"><td class="py-2 px-3">${r.code}</td><td class="py-2 px-3 text-center">${r.no}</td><td colspan="3" class="py-2 px-3">${r.label}</td></tr>`;
        }
        if (r.isSubHeader) {
          return `<tr class="bg-slate-50 font-bold text-slate-700"><td class="py-2 px-3">${r.code}</td><td class="py-2 px-3 text-center">${r.no}</td><td colspan="3" class="py-2 px-3">${r.label}</td></tr>`;
        }
        const rowCls = r.isGrand
          ? "bg-red-50 font-extrabold text-slate-900 border-t-2 border-red-200"
          : (r.isTotal ? "bg-slate-100 font-bold text-slate-800" : "hover:bg-slate-50");
        return `
          <tr class="${rowCls}">
            <td class="py-2 px-3 font-mono text-slate-600">${r.code || ''}</td>
            <td class="py-2 px-3 text-center text-slate-500">${r.no}</td>
            <td class="py-2 px-3 ${r.isTotal || r.isGrand ? '' : 'pl-6'}">${r.label}</td>
            <td class="py-2 px-3 text-right">${fmtNum(r.mVal)}</td>
            <td class="py-2 px-3 text-right">${fmtNum(r.yVal)}</td>
          </tr>
        `;
      }).join("");

      const lpeBody = document.getElementById("lpeTableBody");
      const lpeRowHtml = (no, title, obj, tot, isBold) => `
        <tr class="${isBold ? 'bg-slate-100 font-extrabold text-slate-900 border-t-2 border-slate-300' : 'hover:bg-slate-50'}">
          <td class="py-3 px-3 text-center">${no}</td>
          <td class="py-3 px-3 font-semibold">${title}</td>
          <td class="py-3 px-3 text-right">${fmtNum(obj["3.1.1"])}</td>
          <td class="py-3 px-3 text-right">${fmtNum(obj["3.1.2"])}</td>
          <td class="py-3 px-3 text-right">${fmtNum(obj["3.1.3"])}</td>
          <td class="py-3 px-3 text-right">${fmtNum(obj["3.2.1"])}</td>
          <td class="py-3 px-3 text-right">${fmtNum(obj["3.3.1"])}</td>
          <td class="py-3 px-3 text-right font-bold text-amber-900 bg-amber-50/40">${fmtNum(obj["3.4.2"])}</td>
          <td class="py-3 px-3 text-right">${fmtNum(obj["3.4.1"])}</td>
          <td class="py-3 px-3 text-right font-extrabold bg-slate-50">${fmtRp(tot)}</td>
        </tr>
      `;
      lpeBody.innerHTML =
        lpeRowHtml(1, "SALDO AWAL TAHUN (TERMASUK LABA DITAHAN 3.4.2.01 & SALDO AWAL COA)", lpe.awal, lpe.totAwal, false) +
        lpeRowHtml(2, "Penambahan (Pengurangan) Periode Berjalan", lpe.mutasi, lpe.totMutasi, false) +
        lpeRowHtml(3, "SALDO AKHIR EKUITAS", lpe.akhir, lpe.totAkhir, true);

      const neracaAlert = document.getElementById("neracaBalanceAlert");
      if (neraca.selisih === 0) {
        neracaAlert.textContent = "STATUS NERACA: BALANCE (Selisih Rp 0)";
        neracaAlert.className = "px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold";
      } else {
        neracaAlert.textContent = `STATUS NERACA: TIDAK BALANCE (Selisih ${fmtRp(neraca.selisih)})`;
        neracaAlert.className = "px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold";
      }

      document.getElementById("neracaTableBody").innerHTML = neraca.rows.map(r => {
        if (r.isHeader) {
          return `<tr class="bg-slate-200/80 font-extrabold text-slate-900"><td class="py-2 px-3">${r.code}</td><td class="py-2 px-3 text-center">${r.no}</td><td colspan="3" class="py-2 px-3">${r.label}</td></tr>`;
        }
        if (r.isSubHeader) {
          return `<tr class="bg-slate-50 font-bold text-slate-700"><td class="py-2 px-3">${r.code}</td><td class="py-2 px-3 text-center">${r.no}</td><td colspan="3" class="py-2 px-3">${r.label}</td></tr>`;
        }
        const rowCls = r.isGrand
          ? "bg-red-50 font-extrabold text-slate-900 border-t-2 border-red-200"
          : (r.isTotal ? "bg-slate-100 font-bold text-slate-800" : "hover:bg-slate-50");
        return `
          <tr class="${rowCls}">
            <td class="py-2 px-3 font-mono text-slate-600">${r.code || ''}</td>
            <td class="py-2 px-3 text-center text-slate-500">${r.no}</td>
            <td class="py-2 px-3 ${r.isTotal || r.isGrand ? '' : 'pl-6'}">${r.label}</td>
            <td class="py-2 px-3 text-right">${fmtNum(r.end)}</td>
            <td class="py-2 px-3 text-right">${fmtNum(r.start)}</td>
          </tr>
        `;
      }).join("");

      const cfBadge = document.getElementById("arusKasCheckBadge");
      if (arusKas.selisihKas === 0) {
        cfBadge.textContent = "Rekonsiliasi Kas Neraca: Sesuai (Selisih Rp 0)";
        cfBadge.className = "px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold";
      } else {
        cfBadge.textContent = `Selisih terhadap Kas Neraca: ${fmtRp(arusKas.selisihKas)} (Pastikan Komponen Arus Kas terisi pada jurnal Kas/Bank)`;
        cfBadge.className = "px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold";
      }

      document.getElementById("arusKasTableBody").innerHTML = arusKas.rows.map(r => {
        if (r.isHeader) {
          return `<tr class="bg-slate-200/80 font-extrabold text-slate-900"><td class="py-2 px-3 text-center">${r.no}</td><td colspan="2" class="py-2 px-3">${r.label}</td></tr>`;
        }
        if (r.isSubHeader) {
          return `<tr class="bg-slate-50 font-bold text-slate-700"><td class="py-2 px-3 text-center">${r.no}</td><td colspan="2" class="py-2 px-3">${r.label}</td></tr>`;
        }
        const rowCls = r.isGrand
          ? "bg-red-50 font-extrabold text-slate-900 border-t-2 border-red-200"
          : (r.isTotal ? "bg-slate-100 font-bold text-slate-800" : "hover:bg-slate-50");
        return `
          <tr class="${rowCls}">
            <td class="py-2 px-3 text-center text-slate-500">${r.no}</td>
            <td class="py-2 px-3 ${r.isTotal || r.isGrand ? '' : 'pl-6'}">${r.label}</td>
            <td class="py-2 px-3 text-right">${fmtNum(r.val)}</td>
          </tr>
        `;
      }).join("");

      for (let i = 1; i <= 4; i++) {
        const locEl = document.getElementById(`sigLocationDate${i}`);
        const nameEl = document.getElementById(`sigChairmanName${i}`);
        const nikEl = document.getElementById(`sigChairmanNik${i}`);
        const cityLbl = state.identity.city || "........................";
        if (locEl) locEl.textContent = `${cityLbl}, 31 Desember ${year}`;
        if (nameEl) nameEl.textContent = state.identity.chairmanName || "( ........................................ )";
        if (nikEl) nikEl.textContent = `NIK: ${state.identity.chairmanNik || "-"}`;
      }
    }

    function renderCoaTab(tb) {
      const s = (document.getElementById("searchCoaInput")?.value || "").toLowerCase();
      const g = document.getElementById("filterCoaGroup")?.value || "ALL";

      const filtered = tb.filter(a => {
        const matchG = g === "ALL" || a.lvl1 === g;
        const matchS = a.full.toLowerCase().includes(s);
        return matchG && matchS;
      });

      document.getElementById("coaTableBody").innerHTML = filtered.map((a, idx) => `
        <tr class="hover:bg-slate-50 ${a.code === '3.4.2.01' ? 'bg-amber-50/70' : ''}">
          <td class="py-2 px-3 text-slate-500">${idx + 1}</td>
          <td class="py-2 px-3 font-mono font-semibold text-slate-700">${a.code}</td>
          <td class="py-2 px-3 font-medium text-slate-900">
            ${a.full}
            ${a.code === '3.4.2.01' ? '<span class="ml-1.5 px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-[10px] font-extrabold">AKUN PENUTUP LABA RUGI</span>' : ''}
          </td>
          <td class="py-2 px-3 text-center">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${a.normal === 'Debit' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">${a.normal}</span>
          </td>
          <td class="py-2 px-3 text-center font-mono text-slate-500">${a.lvl3}</td>
          <td class="py-2 px-3 text-right font-bold ${a.initBalance !== 0 ? 'text-amber-800 bg-amber-50/60' : 'text-slate-500'}">${fmtRp(a.initBalance || 0)}</td>
          <td class="py-2 px-3 text-right font-medium text-slate-600">${fmtRp(a.mutasiNetJurnal || 0)}</td>
          <td class="py-2 px-3 text-right font-extrabold text-slate-900 bg-slate-50">${fmtRp(a.saldoAkhir)}</td>
          <td class="py-2 px-3 text-center whitespace-nowrap space-x-1">
            <button type="button" data-coa-action="edit" data-code="${a.code}" class="coa-action-btn px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold">Edit / Saldo Awal</button>
            <button type="button" data-coa-action="delete" data-code="${a.code}" class="coa-action-btn px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold">Hapus</button>
          </td>
        </tr>
      `).join("");
    }

    function renderIdentityForm() {
      document.getElementById("idCoopName").value = state.identity.coopName || "";
      document.getElementById("idUnitUsaha").value = state.identity.unitUsaha || "";
      document.getElementById("idProvince").value = state.identity.province || "";
      document.getElementById("idCity").value = state.identity.city || "";
      document.getElementById("idAddress").value = state.identity.address || "";
      document.getElementById("idStartDate").value = state.identity.startDate || "";
      document.getElementById("idEndDate").value = state.identity.endDate || "";
      document.getElementById("idChairmanName").value = state.identity.chairmanName || "";
      document.getElementById("idChairmanNik").value = state.identity.chairmanNik || "";
      document.getElementById("idAccountantName").value = state.identity.accountantName || "";
      document.getElementById("idAccountantNik").value = state.identity.accountantNik || "";
    }

    // ==================== RENDER PENGATURAN AKUN & PANEL ADMIN (TANPA BINTANG-BINTANG - POIN 1 & POIN 2) ====================
    function renderAccountSettingsAndAdminTab() {
    if (!currentUser) return;
    const adminMode = Boolean(cloud.session?.user?.isAdmin);
    document.getElementById('accSetUsername').value = currentUser.username || '';
    document.getElementById('accSetRole').value = activeSubSession.operatorPosition || currentUser.role;
    document.getElementById('accSetFullName').value = currentUser.fullName || '';
    document.getElementById('accSetCoopName').value = currentUser.coopName || '';
    document.getElementById('currentAccountPlainUsername').textContent = currentUser.username || '';
    document.getElementById('currentAccountPlainPassword').textContent = 'Tidak dapat dilihat / hanya dapat diganti';
    for (const input of document.getElementById('changePasswordForm').querySelectorAll('input,button')) input.disabled = cloud.session?.sessionRole === 'employee' || isSupervisingFromSysAdmin;
    document.getElementById('adminActiveNoticeBox').classList.toggle('hidden', !adminMode);
    document.getElementById('adminUsersManagementPanel').classList.toggle('hidden', !adminMode);
    if (!adminMode) return;
    document.getElementById('adminTotalUsersBadge').textContent = 'Total: ' + usersList.length + ' akun';
    const table = document.getElementById('adminUsersTableBody'); table.replaceChildren();
    usersList.forEach((u, index) => {
      const tr = document.createElement('tr');
      for (const value of [index+1, u.username, u.fullName + ' ('+u.adminEmail+')', u.role, u.coopName, 'Tidak ditampilkan', 'Lihat ruang kerja']) {
        const td = document.createElement('td'); td.className = 'py-2.5 px-3 text-xs'; td.textContent = value; tr.append(td);
      }
      const actions = document.createElement('td'); actions.className = 'py-2.5 px-3 space-x-1';
      for (const [action, label] of [['switch','Buka Ruang Kerja'], ...(!u.isAdmin ? [['resetpwd','Ganti Password'],['delete','Hapus Akun']] : [])]) {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'admin-user-btn px-2 py-1 rounded bg-slate-100 text-blue-800 text-xs';
        button.dataset.adminAct = action; button.dataset.uid = u.uid; button.textContent = label; actions.append(button);
      }
      tr.append(actions); table.append(tr);
    });
  }

    function populateItemDropdowns(invSummary) {
      const qtSelect = document.getElementById("qtItemCode");
      if (qtSelect) {
        const cur = qtSelect.value;
        qtSelect.innerHTML = invSummary.map(it => {
          const isKons = (it.account || "").startsWith("1.1.4.04");
          const tag = isKons ? "[KONSINYASI] " : "";
          return `<option value="${it.code}">${tag}${it.code} - ${it.name} (Stok: ${it.finalQty} ${it.unit})</option>`;
        }).join("") + `<option value="__NEW_KONS_ITEM__">+ Buat Barang Konsinyasi / Persediaan Baru Sekaligus...</option>`;
        if (cur && (invSummary.some(i => i.code === cur) || cur === "__NEW_KONS_ITEM__")) qtSelect.value = cur;
      }

      // Populate Supplier Dropdown inside QuickTrans Modal (Point 5)
      const qtSupSel = document.getElementById("qtSupplierSelect");
      if (qtSupSel) {
        const curSup = qtSupSel.value;
        const uniqueSups = [];
        const seenCodes = new Set();
        (state.suppliers || []).forEach(s => {
          if (s.code && !seenCodes.has(s.code)) {
            seenCodes.add(s.code);
            uniqueSups.push(s);
          }
        });
        qtSupSel.innerHTML = uniqueSups.map(s =>
          `<option value="${s.code}">${s.code} - ${s.name}</option>`
        ).join("") + `<option value="__NEW__">+ Tambah Supplier Baru Sekaligus...</option>`;
        if (curSup && (seenCodes.has(curSup) || curSup === "__NEW__")) {
          qtSupSel.value = curSup;
        }
      }

      const supItemSel = document.getElementById("supItemCodeSelect");
      if (supItemSel) {
        const curS = supItemSel.value;
        supItemSel.innerHTML = invSummary.map(it =>
          `<option value="${it.code}">${it.code} - ${it.name} (HPP Saat Ini: ${fmtRp(it.cost)})</option>`
        ).join("") + `<option value="__NEW_SUP_ITEM__">+ Buat Barang Persediaan Baru dari Supplier Ini...</option>`;
        if (curS && (invSummary.some(i => i.code === curS) || curS === "__NEW_SUP_ITEM__")) {
          supItemSel.value = curS;
        } else if (invSummary.length > 0) {
          supItemSel.value = invSummary[0].code;
        } else {
          supItemSel.value = "__NEW_SUP_ITEM__";
        }
        const supNewWrap = document.getElementById("supNewItemFields");
        if (supNewWrap) {
          supNewWrap.classList.toggle("hidden", supItemSel.value !== "__NEW_SUP_ITEM__");
        }
      }

      const cardSelect = document.getElementById("filterCardItemSelect");
      if (cardSelect) {
        const curC = cardSelect.value || "ALL";
        cardSelect.innerHTML = `<option value="ALL">Tampilkan Semua Barang</option>` +
          invSummary.map(it => `<option value="${it.name}">${it.name} (Stok Akhir: ${it.finalQty} ${it.unit})</option>`).join("");
        cardSelect.value = curC;
      }

      const imAccSel = document.getElementById("imAccount");
      if (imAccSel) {
        const curAcc = imAccSel.value;
        const invCoas = state.coa.filter(a => a.code.startsWith("1.1.4"));
        if (invCoas.length > 0) {
          imAccSel.innerHTML = invCoas.map(a => `<option value="${a.full}">${a.full}</option>`).join("");
          if (invCoas.some(a => a.full === curAcc)) imAccSel.value = curAcc;
        }
      }

      updateQuickTransPreview();
    }

    // ==================== DYNAMIC JOURNAL FORM LINES WITH TYPEAHEAD & NAMA PETUGAS / KARYAWAN PENGINPUT ====================
    function createJournalLineRow(defaultAcc = "", defaultDebit = 0, defaultKredit = 0) {
      const tr = document.createElement("tr");
      const officerOptions = buildEmployeeOptionsHtml();
      const itemOptions = `<option value="">-- Tanpa Barang --</option>` + state.items.map(it =>
        `<option value="${it.name}">${it.name} (${it.unit})</option>`
      ).join("");
      const cfOptions = CASHFLOW_COMPONENTS.map(c =>
        `<option value="${c}">${c || '-- Pilih Jika Kas/Bank --'}</option>`
      ).join("");

      tr.innerHTML = `
        <td class="p-2 relative">
          <input type="text" placeholder="Ketik kode atau nama akun..." class="jline-account-input w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500" value="${defaultAcc}" autocomplete="off" />
          <input type="hidden" class="jline-account" value="${defaultAcc}" />
          <div class="jline-coa-dropdown hidden absolute left-2 right-2 top-full mt-0.5 z-40 bg-white border border-slate-300 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100"></div>
        </td>
        <td class="p-2">
          <select class="jline-member w-full border border-slate-300 rounded px-2 py-1.5 bg-white text-xs font-medium text-slate-800">${officerOptions}</select>
        </td>
        <td class="p-2">
          <select class="jline-item w-full border border-slate-300 rounded px-2 py-1.5 bg-white text-xs">${itemOptions}</select>
        </td>
        <td class="p-2">
          <input type="number" min="0" step="1" class="jline-qty w-full border border-slate-300 rounded px-2 py-1.5 text-right text-xs" value="0" />
        </td>
        <td class="p-2">
          <input type="text" inputmode="numeric" class="jline-debit nominal-rp-input w-full border border-slate-300 rounded px-2 py-1.5 text-right text-xs font-semibold" value="${fmtNominalInput(defaultDebit)}" />
        </td>
        <td class="p-2">
          <input type="text" inputmode="numeric" class="jline-kredit nominal-rp-input w-full border border-slate-300 rounded px-2 py-1.5 text-right text-xs font-semibold" value="${fmtNominalInput(defaultKredit)}" />
        </td>
        <td class="p-2">
          <select class="jline-cf w-full border border-slate-300 rounded px-2 py-1.5 bg-white text-xs">${cfOptions}</select>
        </td>
        <td class="p-2 text-center">
          <button type="button" class="jline-remove text-rose-600 hover:text-rose-800 font-bold px-2">Hapus</button>
        </td>
      `;

      const officerSel = tr.querySelector(".jline-member");
      if (officerSel) officerSel.value = getDefaultActiveOfficerValue();

      const accInput = tr.querySelector(".jline-account-input");
      const accHidden = tr.querySelector(".jline-account");
      const dropdown = tr.querySelector(".jline-coa-dropdown");
      const itemSel = tr.querySelector(".jline-item");
      const qtyInp = tr.querySelector(".jline-qty");
      const debInp = tr.querySelector(".jline-debit");
      const kreInp = tr.querySelector(".jline-kredit");

      function renderCoaSuggestions(queryText) {
        const q = (queryText || "").trim().toLowerCase();
        if (!q) {
          dropdown.classList.add("hidden");
          dropdown.innerHTML = "";
          return;
        }
        const matches = state.coa.filter(a => a.full.toLowerCase().includes(q) || a.code.toLowerCase().includes(q)).slice(0, 25);
        if (matches.length === 0) {
          dropdown.innerHTML = `<div class="px-3 py-2 text-slate-400 text-[11px]">Tidak ditemukan akun dengan kata kunci "${queryText}"</div>`;
          dropdown.classList.remove("hidden");
          return;
        }
        dropdown.innerHTML = matches.map(a => `
          <div data-full="${a.full}" class="coa-opt-item px-3 py-2 hover:bg-red-50 cursor-pointer flex items-center justify-between gap-2">
            <span class="font-medium text-slate-800">${a.full}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded ${a.normal === 'Debit' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'} font-bold">${a.normal}</span>
          </div>
        `).join("");
        dropdown.classList.remove("hidden");

        dropdown.querySelectorAll(".coa-opt-item").forEach(opt => {
          opt.addEventListener("mousedown", (ev) => {
            ev.preventDefault();
            const chosen = opt.getAttribute("data-full");
            accInput.value = chosen;
            accHidden.value = chosen;
            dropdown.classList.add("hidden");
          });
        });
      }

      accInput.addEventListener("input", () => {
        const val = accInput.value;
        accHidden.value = val;
        renderCoaSuggestions(val);
      });

      accInput.addEventListener("focus", () => {
        if (accInput.value.trim().length > 0) {
          renderCoaSuggestions(accInput.value);
        }
      });

      accInput.addEventListener("blur", () => {
        setTimeout(() => {
          dropdown.classList.add("hidden");
          const raw = accInput.value.trim();
          if (raw) {
            const exact = getAccountObj(raw);
            if (exact) {
              accInput.value = exact.full;
              accHidden.value = exact.full;
            } else {
              const partial = state.coa.find(a => a.full.toLowerCase().includes(raw.toLowerCase()));
              if (partial) {
                accInput.value = partial.full;
                accHidden.value = partial.full;
              }
            }
          }
        }, 150);
      });

      function onItemOrQtyChange() {
        const itName = itemSel.value;
        const q = Number(qtyInp.value) || 0;
        if (itName && q > 0) {
          const itObj = state.items.find(i => i.name === itName);
          if (itObj) {
            const calcVal = q * (Number(itObj.cost) || 0);
            if (parseNominal(debInp.value) === 0 && parseNominal(kreInp.value) === 0 && calcVal > 0) {
              debInp.value = fmtNominalInput(calcVal);
            }
          }
        }
        updateJournalFormTotals();
      }

      itemSel.addEventListener("change", () => {
        if (itemSel.value) {
          const itObj = state.items.find(i => i.name === itemSel.value);
          if (itObj) {
            accInput.value = itObj.account;
            accHidden.value = itObj.account;
          }
        }
        onItemOrQtyChange();
      });
      qtyInp.addEventListener("input", onItemOrQtyChange);
      debInp.addEventListener("input", updateJournalFormTotals);
      kreInp.addEventListener("input", updateJournalFormTotals);
      tr.querySelector(".jline-remove").addEventListener("click", () => {
        if (document.querySelectorAll("#journalFormLines tr").length > 2) {
          tr.remove();
          updateJournalFormTotals();
        } else {
          showToast("Jurnal minimal harus memiliki 2 baris akun (Debit & Kredit).", "error");
        }
      });

      return tr;
    }

    function initJournalFormLines() {
      const container = document.getElementById("journalFormLines");
      container.innerHTML = "";
      container.appendChild(createJournalLineRow("", 0, 0));
      container.appendChild(createJournalLineRow("", 0, 0));
      updateJournalFormTotals();
      syncAllTransactionDocNoInputs();
      updateDocNoWarningUI("jDocNo", "jDocNoWarning", "jDate", null);
    }

    function updateJournalFormTotals() {
      let d = 0;
      let k = 0;
      document.querySelectorAll("#journalFormLines tr").forEach(tr => {
        d += parseNominal(tr.querySelector(".jline-debit")?.value || 0);
        k += parseNominal(tr.querySelector(".jline-kredit")?.value || 0);
      });
      document.getElementById("jFormTotalDebit").textContent = fmtRp(d);
      document.getElementById("jFormTotalKredit").textContent = fmtRp(k);
      const diff = Math.round(d - k);
      const badge = document.getElementById("jFormBalanceStatus");
      if (diff === 0 && d > 0) {
        badge.textContent = "Balance (Siap Disimpan)";
        badge.className = "text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold";
      } else if (diff === 0 && d === 0) {
        badge.textContent = "Isi Nominal Debit & Kredit";
        badge.className = "text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700";
      } else {
        badge.textContent = `Belum Balance (Selisih ${fmtRp(diff)})`;
        badge.className = "text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold";
      }
    }

    // ==================== WIZARD SIMPAN PINJAM ANGGOTA, PINJAMAN & HIBAH LOGIC (TERINTEGRASI COA) ====================
    function isMemberRequiredForSpType(type) {
      return ["SETOR_POKOK", "SETOR_WAJIB", "SETOR_SUKARELA", "TARIK_SUKARELA", "CAIR_PINJAMAN", "ANGSURAN_PINJAMAN"].includes(type);
    }

    function updateSimpanPinjamPreview() {
      const type = document.getElementById("spType")?.value || "SETOR_POKOK";
      const mCode = document.getElementById("spMemberCode")?.value;
      const amount = parseNominal(document.getElementById("spAmount")?.value || 0);
      const interest = parseNominal(document.getElementById("spInterest")?.value || 0);
      const cashAcc = document.getElementById("spCashAccount")?.value || resolveCoaFull("1.1.1.01", "1.1.1.01 Kas Tunai");
      const targetAcc = document.getElementById("spTargetCoaAccount")?.value || resolveCoaFull("3.1.1.01", "3.1.1.01 Simpanan Pokok");
      const intAcc = document.getElementById("spInterestCoaAccount")?.value || resolveCoaFull("4.1.3.02", "4.1.3.02 Pendapatan Jasa Pinjaman (Anggota)");

      const needsMember = isMemberRequiredForSpType(type);
      const memWrap = document.getElementById("spMemberSectionWrap");
      const newMemFields = document.getElementById("spNewMemberInlineFields");
      if (memWrap) memWrap.classList.toggle("hidden", !needsMember);
      if (newMemFields) newMemFields.classList.toggle("hidden", !needsMember || mCode !== "__NEW_MEMBER__");

      const hasInterest = (type === "ANGSURAN_PINJAMAN" || type === "BAYAR_PINJAMAN_BANK");
      const interestWrap = document.getElementById("spInterestWrap");
      const interestCoaWrap = document.getElementById("spInterestCoaWrap");
      const principalLbl = document.getElementById("spPrincipalLabel");
      const interestLbl = document.getElementById("spInterestLabel");

      if (hasInterest) {
        interestWrap?.classList.remove("hidden");
        interestCoaWrap?.classList.remove("hidden");
        if (principalLbl) principalLbl.textContent = "Nominal Angsuran Pokok (Rp)";
        if (interestLbl) interestLbl.textContent = type === "BAYAR_PINJAMAN_BANK" ? "Nominal Bunga Pinjaman Bank (Rp)" : "Nominal Jasa Pinjaman Anggota (Rp)";
      } else {
        interestWrap?.classList.add("hidden");
        interestCoaWrap?.classList.add("hidden");
        if (principalLbl) principalLbl.textContent = "Nominal Transaksi (Rp)";
      }

      const memSummary = computeMembersSummary();
      const mem = mCode === "__NEW_MEMBER__"
        ? {
            code: document.getElementById("spNewMemCode")?.value || "ANG-BARU",
            name: document.getElementById("spNewMemName")?.value || "Anggota Baru",
            pokok: 0, wajib: 0, sukarela: 0, pinjaman: 0
          }
        : (memSummary.find(m => m.code === mCode) || memSummary[0]);

      const hintEl = document.getElementById("spMemberSaldoHint");
      if (hintEl && needsMember) {
        if (mem && mCode !== "__NEW_MEMBER__") {
          hintEl.textContent = `Saldo ${mem.name}: Simpanan Pokok ${fmtRp(mem.pokok)} | Wajib ${fmtRp(mem.wajib)} | Sukarela ${fmtRp(mem.sukarela)} | Sisa Pinjaman ${fmtRp(mem.pinjaman)}`;
        } else {
          hintEl.textContent = "Anggota baru akan otomatis ditambahkan ke Database Anggota saat transaksi disimpan.";
        }
      }

      const totalVal = hasInterest ? (amount + interest) : amount;
      document.getElementById("spTotalBadge").textContent = `Total: ${fmtRp(totalVal)}`;

      const previewEl = document.getElementById("spJournalPreview");
      if (!previewEl) return;
      const memName = mem ? mem.name : "Anggota";

      if (type === "SETOR_POKOK" || type === "SETOR_WAJIB" || type === "SETOR_SUKARELA") {
        previewEl.innerHTML = `
          <div>- <strong>Database Anggota:</strong> Saldo Simpanan <strong>${memName}</strong> bertambah <strong>+${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit:</strong> ${cashAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Kredit:</strong> ${targetAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
        `;
      } else if (type === "TARIK_SUKARELA") {
        previewEl.innerHTML = `
          <div>- <strong>Database Anggota:</strong> Saldo Simpanan <strong>${memName}</strong> berkurang <strong>-${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit:</strong> ${targetAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Kredit:</strong> ${cashAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
        `;
      } else if (type === "CAIR_PINJAMAN") {
        previewEl.innerHTML = `
          <div>- <strong>Database Anggota:</strong> Sisa Pinjaman <strong>${memName}</strong> bertambah <strong>+${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit:</strong> ${targetAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Kredit:</strong> ${cashAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
        `;
      } else if (type === "ANGSURAN_PINJAMAN") {
        previewEl.innerHTML = `
          <div>- <strong>Database Anggota:</strong> Sisa Pinjaman <strong>${memName}</strong> berkurang <strong>-${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit:</strong> ${cashAcc} sebesar <strong>${fmtRp(totalVal)}</strong></div>
          <div>- <strong>Jurnal Kredit Pokok:</strong> ${targetAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Kredit Jasa:</strong> ${intAcc} sebesar <strong>${fmtRp(interest)}</strong></div>
        `;
      } else if (type === "TERIMA_HIBAH" || type === "TAMBAH_CADANGAN") {
        previewEl.innerHTML = `
          <div>- <strong>Ekuitas & Neraca (COA):</strong> Saldo <strong>${targetAcc}</strong> bertambah <strong>+${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit:</strong> ${cashAcc} sebesar <strong>${fmtRp(amount)}</strong> (Arus Kas Pendanaan: Hibah / Modal)</div>
          <div>- <strong>Jurnal Kredit:</strong> ${targetAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
        `;
      } else if (type === "GUNAKAN_HIBAH") {
        previewEl.innerHTML = `
          <div>- <strong>Ekuitas & Neraca (COA):</strong> Saldo <strong>${targetAcc}</strong> berkurang <strong>-${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit:</strong> ${targetAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Kredit:</strong> ${cashAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
        `;
      } else if (type === "TERIMA_PINJAMAN_BANK") {
        previewEl.innerHTML = `
          <div>- <strong>Kewajiban Pinjaman (COA):</strong> Saldo <strong>${targetAcc}</strong> bertambah <strong>+${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit:</strong> ${cashAcc} sebesar <strong>${fmtRp(amount)}</strong> (Arus Kas: Pinjaman Jangka Panjang)</div>
          <div>- <strong>Jurnal Kredit:</strong> ${targetAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
        `;
      } else if (type === "BAYAR_PINJAMAN_BANK") {
        previewEl.innerHTML = `
          <div>- <strong>Kewajiban Pinjaman (COA):</strong> Pokok <strong>${targetAcc}</strong> berkurang <strong>-${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit Pokok:</strong> ${targetAcc} sebesar <strong>${fmtRp(amount)}</strong></div>
          <div>- <strong>Jurnal Debit Bunga:</strong> ${intAcc} sebesar <strong>${fmtRp(interest)}</strong></div>
          <div>- <strong>Jurnal Kredit Kas/Bank:</strong> ${cashAcc} sebesar <strong>${fmtRp(totalVal)}</strong> (Arus Kas: Pembayaran Utang Jangka Panjang)</div>
        `;
      }
    }

    function openMemberCardModal(memberCode) {
      const memSummary = computeMembersSummary();
      const m = memSummary.find(x => x.code === memberCode);
      if (!m) return;

      document.getElementById("mcModalTitle").textContent = `KARTU SIMPAN PINJAM ANGGOTA - ${m.name} (${m.code})`;
      document.getElementById("mcModalSub").textContent = `NIK: ${m.nik || "-"} - Desa: ${m.village || "-"} (RT ${m.rt || "00"}/RW ${m.rw || "00"}) - Tgl Bergabung: ${m.joinDate || "-"}`;

      document.getElementById("mcSummaryBoxes").innerHTML = `
        <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <span class="text-[11px] text-emerald-800">Simpanan Pokok</span>
          <p class="text-sm font-extrabold text-emerald-900">${fmtRp(m.pokok)}</p>
        </div>
        <div class="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <span class="text-[11px] text-blue-800">Simpanan Wajib</span>
          <p class="text-sm font-extrabold text-blue-900">${fmtRp(m.wajib)}</p>
        </div>
        <div class="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
          <span class="text-[11px] text-indigo-800">Simpanan Sukarela</span>
          <p class="text-sm font-extrabold text-indigo-900">${fmtRp(m.sukarela)}</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-900 text-white">
          <span class="text-[11px] text-slate-300">Total Simpanan</span>
          <p class="text-sm font-extrabold">${fmtRp(m.totalSimpanan)}</p>
        </div>
        <div class="p-3 rounded-lg bg-amber-50 border border-amber-200">
          <span class="text-[11px] text-amber-800">Sisa Pinjaman</span>
          <p class="text-sm font-extrabold text-amber-900">${fmtRp(m.pinjaman)}</p>
        </div>
      `;

      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      document.getElementById("mcMonthlyWajibGrid").innerHTML = monthNames.map((mName, idx) => {
        const val = m.monthlyWajib[idx] || 0;
        return `
          <div class="p-2 rounded border ${val > 0 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}">
            <span class="block text-[10px] font-semibold text-slate-500 uppercase">${mName}</span>
            <span class="font-bold ${val > 0 ? 'text-blue-800' : 'text-slate-400'}">${fmtRp(val)}</span>
          </div>
        `;
      }).join("");

      const tbody = document.getElementById("mcTableBody");
      if (m.transactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="py-4 px-3 text-center text-slate-400">Belum ada riwayat transaksi simpan pinjam untuk anggota ini.</td></tr>`;
      } else {
        tbody.innerHTML = m.transactions.map(t => `
          <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">${t.date}</td>
            <td class="py-2 px-3 font-mono">${t.docNo}</td>
            <td class="py-2 px-3 font-medium">${t.account}</td>
            <td class="py-2 px-3 text-slate-600">${t.desc || "-"}</td>
            <td class="py-2 px-3 text-right font-semibold text-emerald-700">${t.debit > 0 ? fmtRp(t.debit) : "-"}</td>
            <td class="py-2 px-3 text-right font-semibold text-blue-700">${t.kredit > 0 ? fmtRp(t.kredit) : "-"}</td>
          </tr>
        `).join("");
      }

      const modal = document.getElementById("modalMemberCard");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }

    // ==================== WIZARD TRANSAKSI BARANG & BARANG KONSINYASI (OTOMATIS COA KONSINYASI & PEMISAH RIBUAN) ====================
    function updateQuickTransPreview() {
      const type = document.getElementById("qtType")?.value || "IN_BUY";
      const isKonsinyasi = type.startsWith("KONS_");
      const code = document.getElementById("qtItemCode")?.value;
      const qty = Number(document.getElementById("qtQty")?.value || 0);
      const priceInput = document.getElementById("qtUnitPrice");
      const payAcc = document.getElementById("qtPayAccount")?.value || "1.1.1.02 Kas di Bank BRI";

      const btnReg = document.getElementById("btnQtModeReguler");
      const btnKons = document.getElementById("btnQtModeKonsinyasi");
      if (btnReg && btnKons) {
        btnReg.classList.toggle("active", !isKonsinyasi);
        btnKons.classList.toggle("active", isKonsinyasi);
      }

      const newItemFields = document.getElementById("qtNewConsignItemFields");
      if (newItemFields) {
        newItemFields.classList.toggle("hidden", code !== "__NEW_KONS_ITEM__");
      }

      const supWrap = document.getElementById("qtSupplierSectionWrap");
      const supSelect = document.getElementById("qtSupplierSelect");
      const newSupFields = document.getElementById("qtNewSupplierInlineFields");
      const showSupBox = (type === "IN_BUY" || type === "KONS_IN" || type === "KONS_PAY_PARTNER");
      if (supWrap) {
        supWrap.classList.toggle("hidden", !showSupBox);
      }
      if (supSelect && newSupFields) {
        newSupFields.classList.toggle("hidden", !showSupBox || supSelect.value !== "__NEW__");
      }

      const konsWrap = document.getElementById("qtConsignmentFieldsWrap");
      if (konsWrap) {
        konsWrap.classList.toggle("hidden", !isKonsinyasi);
      }

      const invSummary = computeInventorySummary();
      const item = code === "__NEW_KONS_ITEM__"
        ? {
            code: document.getElementById("qtNewItemCode")?.value || "KONS-BARU",
            name: document.getElementById("qtNewItemName")?.value || "Barang Konsinyasi Baru",
            unit: document.getElementById("qtNewItemUnit")?.value || "Pcs",
            account: isKonsinyasi ? resolveCoaFull("1.1.4.04", "1.1.4.04 Persediaan Barang Konsinyasi (Titipan)") : "1.1.4.01 Persediaan Barang Dagangan",
            finalQty: 0,
            cost: parseNominal(document.getElementById("qtConsignPartnerCost")?.value || priceInput?.value || 0),
            price: parseNominal(document.getElementById("qtConsignSellPrice")?.value || priceInput?.value || 0)
          }
        : (invSummary.find(i => i.code === code) || invSummary[0]);

      const previewEl = document.getElementById("qtJournalPreview");
      if (!item) {
        if (previewEl) previewEl.innerHTML = `<div>Belum ada master barang persediaan.</div>`;
        return;
      }

      document.getElementById("qtItemStockHint").textContent =
        `Akun COA: ${item.account} | Stok Tersedia: ${fmtNum(item.finalQty)} ${item.unit} | HPP/Setor Mitra: ${fmtRp(item.cost)} | Harga Jual: ${fmtRp(item.price)}`;

      const unitPrice = parseNominal(priceInput?.value || 0);
      const partnerCostUnit = isKonsinyasi
        ? (parseNominal(document.getElementById("qtConsignPartnerCost")?.value || 0) || Number(item.cost) || unitPrice)
        : (Number(item.cost) || 0);
      const consignSellUnit = isKonsinyasi
        ? (parseNominal(document.getElementById("qtConsignSellPrice")?.value || 0) || unitPrice || Number(item.price) || 0)
        : unitPrice;

      const commPerUnit = Math.max(0, consignSellUnit - partnerCostUnit);
      const commHint = document.getElementById("qtConsignCommissionHint");
      if (commHint) {
        commHint.textContent = `Komisi Konsinyasi Koperasi (4.1.1.02): ${fmtRp(commPerUnit)} / ${item.unit} (Total Komisi: ${fmtRp(commPerUnit * qty)})`;
      }

      const totalTrans = qty * unitPrice;
      const totalHPP = qty * (Number(item.cost) || 0);

      if (!isKonsinyasi) {
        document.getElementById("qtTotalBadge").textContent = `Total: ${fmtRp(totalTrans)}`;
        if (type === "IN_BUY") {
          const chosenSup = supSelect?.value === "__NEW__"
            ? (document.getElementById("qtNewSupCode")?.value || "Supplier Baru")
            : (supSelect?.value || item.supplierCode || "SUP-001");
          previewEl.innerHTML = `
            <div>- <strong>Stok Gudang & Data Supplier:</strong> ${item.name} bertambah <strong>+${fmtNum(qty)} ${item.unit}</strong> dari Supplier <strong>${chosenSup}</strong> & HPP diupdate ke <strong>${fmtRp(unitPrice)}</strong></div>
            <div>- <strong>Jurnal Debit:</strong> ${item.account} sebesar <strong>${fmtRp(totalTrans)}</strong></div>
            <div>- <strong>Jurnal Kredit:</strong> ${payAcc} sebesar <strong>${fmtRp(totalTrans)}</strong></div>
          `;
        } else if (type === "OUT_SALE_MEMBER" || type === "OUT_SALE_NON") {
          const revAcc = type === "OUT_SALE_MEMBER"
            ? resolveCoaFull("4.1.1.01", "4.1.1.01 Pendapatan Penjualan Barang Dagangan (Anggota)")
            : resolveCoaFull("4.2.1.01", "4.2.1.01 Pendapatan Penjualan Barang Dagangan (Non-Anggota)");
          previewEl.innerHTML = `
            <div>- <strong>Stok Gudang:</strong> ${item.name} berkurang <strong>-${fmtNum(qty)} ${item.unit}</strong> (Sisa: ${fmtNum(item.finalQty - qty)} ${item.unit})</div>
            <div>- <strong>Jurnal Penjualan:</strong> Debit ${payAcc} <strong>${fmtRp(totalTrans)}</strong> / Kredit ${revAcc} <strong>${fmtRp(totalTrans)}</strong></div>
            <div>- <strong>Jurnal HPP Otomatis:</strong> Debit 5.1.1.01 HPP Barang Dagangan <strong>${fmtRp(totalHPP)}</strong> / Kredit ${item.account} <strong>${fmtRp(totalHPP)}</strong></div>
          `;
        } else {
          previewEl.innerHTML = `
            <div>- <strong>Stok Gudang:</strong> ${item.name} berkurang <strong>-${fmtNum(qty)} ${item.unit}</strong></div>
            <div>- <strong>Jurnal Pemakaian:</strong> Debit 6.1.2.01 Beban ATK <strong>${fmtRp(totalHPP)}</strong> / Kredit ${item.account} <strong>${fmtRp(totalHPP)}</strong></div>
          `;
        }
      } else {
        const totalPartnerVal = qty * partnerCostUnit;
        const totalSellVal = qty * consignSellUnit;
        const totalCommVal = Math.max(0, totalSellVal - totalPartnerVal);

        if (type === "KONS_IN") {
          document.getElementById("qtTotalBadge").textContent = `Nilai Titipan: ${fmtRp(totalPartnerVal)}`;
          previewEl.innerHTML = `
            <div>- <strong>Stok Konsinyasi Masuk:</strong> ${item.name} bertambah <strong>+${fmtNum(qty)} ${item.unit}</strong> pada COA <strong>1.1.4.04 Persediaan Barang Konsinyasi (Titipan)</strong></div>
            <div>- <strong>Jurnal Debit (Aset Konsinyasi):</strong> 1.1.4.04 Persediaan Barang Konsinyasi (Titipan) sebesar <strong>${fmtRp(totalPartnerVal)}</strong></div>
            <div>- <strong>Jurnal Kredit (Kewajiban Konsinyasi):</strong> 2.1.3.03 Utang Konsinyasi (Titipan Mitra/Supplier) sebesar <strong>${fmtRp(totalPartnerVal)}</strong></div>
          `;
        } else if (type === "KONS_OUT_SALE_MEMBER" || type === "KONS_OUT_SALE_NON") {
          document.getElementById("qtTotalBadge").textContent = `Total Penjualan: ${fmtRp(totalSellVal)}`;
          const revKonsAcc = type === "KONS_OUT_SALE_MEMBER"
            ? resolveCoaFull("4.1.1.03", "4.1.1.03 Pendapatan Penjualan Barang Konsinyasi (Anggota)")
            : resolveCoaFull("4.2.1.02", "4.2.1.02 Pendapatan Penjualan Barang Konsinyasi (Non-Anggota)");
          previewEl.innerHTML = `
            <div>- <strong>Stok Konsinyasi Keluar:</strong> ${item.name} berkurang <strong>-${fmtNum(qty)} ${item.unit}</strong></div>
            <div>- <strong>Jurnal Kas/Piutang [Debit]:</strong> ${payAcc} sebesar <strong>${fmtRp(totalSellVal)}</strong></div>
            <div>- <strong>Jurnal Pendapatan Konsinyasi [Kredit]:</strong> ${revKonsAcc} sebesar <strong>${fmtRp(totalPartnerVal)}</strong></div>
            <div>- <strong>Jurnal Komisi Koperasi [Kredit]:</strong> 4.1.1.02 Pendapatan Komisi Konsinyasi sebesar <strong>${fmtRp(totalCommVal)}</strong></div>
            <div>- <strong>Jurnal HPP Konsinyasi:</strong> Debit 5.1.1.03 HPP Barang Konsinyasi <strong>${fmtRp(totalPartnerVal)}</strong> / Kredit 1.1.4.04 Persediaan Barang Konsinyasi <strong>${fmtRp(totalPartnerVal)}</strong></div>
          `;
        } else if (type === "KONS_PAY_PARTNER") {
          document.getElementById("qtTotalBadge").textContent = `Total Setor Mitra: ${fmtRp(totalPartnerVal)}`;
          previewEl.innerHTML = `
            <div>- <strong>Pelunasan ke Mitra Konsinyasi:</strong> Membayar hasil penjualan barang konsinyasi (${fmtNum(qty)} ${item.unit} ${item.name})</div>
            <div>- <strong>Jurnal Debit:</strong> 2.1.3.03 Utang Konsinyasi (Titipan Mitra/Supplier) sebesar <strong>${fmtRp(totalPartnerVal)}</strong></div>
            <div>- <strong>Jurnal Kredit:</strong> ${payAcc} sebesar <strong>${fmtRp(totalPartnerVal)}</strong></div>
          `;
        } else if (type === "KONS_OUT_RETURN") {
          document.getElementById("qtTotalBadge").textContent = `Nilai Retur: ${fmtRp(totalPartnerVal)}`;
          previewEl.innerHTML = `
            <div>- <strong>Retur Barang Konsinyasi:</strong> Stok ${item.name} berkurang <strong>-${fmtNum(qty)} ${item.unit}</strong> (dikembalikan ke Mitra)</div>
            <div>- <strong>Jurnal Debit:</strong> 2.1.3.03 Utang Konsinyasi (Titipan Mitra/Supplier) sebesar <strong>${fmtRp(totalPartnerVal)}</strong></div>
            <div>- <strong>Jurnal Kredit:</strong> 1.1.4.04 Persediaan Barang Konsinyasi (Titipan) sebesar <strong>${fmtRp(totalPartnerVal)}</strong></div>
          `;
        }
      }
    }

    function openStockCardModal(itemCode) {
      const invSummary = computeInventorySummary();
      const it = invSummary.find(i => i.code === itemCode);
      if (!it) return;

      document.getElementById("scModalTitle").textContent = `KARTU STOK BARANG - ${it.name} (${it.code})`;
      document.getElementById("scModalSub").textContent = `Akun: ${it.account} - Satuan: ${it.unit} - HPP Satuan: ${fmtRp(it.cost)} - Supplier: ${(it.supplierCodes || []).join(", ")}`;

      document.getElementById("scSummaryBoxes").innerHTML = `
        <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span class="text-[11px] text-slate-500">Stok Awal</span>
          <p class="text-sm font-extrabold text-slate-800">${fmtNum(it.initQty)} ${it.unit}</p>
        </div>
        <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <span class="text-[11px] text-emerald-700">Total Masuk (+)</span>
          <p class="text-sm font-extrabold text-emerald-800">+${fmtNum(it.qtyIn)} ${it.unit}</p>
        </div>
        <div class="p-3 rounded-lg bg-rose-50 border border-rose-200">
          <span class="text-[11px] text-rose-700">Total Keluar (-)</span>
          <p class="text-sm font-extrabold text-rose-800">-${fmtNum(it.qtyOut)} ${it.unit}</p>
        </div>
        <div class="p-3 rounded-lg bg-slate-900 text-white">
          <span class="text-[11px] text-slate-300">Stok Akhir Tersedia</span>
          <p class="text-sm font-extrabold">${fmtNum(it.finalQty)} ${it.unit} (${fmtRp(it.finalVal)})</p>
        </div>
      `;

      let runningQty = Number(it.initQty) || 0;
      const startDateLabel = activeBookYear === "ALL" ? state.identity.startDate : `${activeBookYear}-01-01`;
      const rowsHtml = [
        `<tr class="bg-slate-50 font-semibold">
          <td class="py-2 px-3">${startDateLabel}</td>
          <td class="py-2 px-3 font-mono">SALDO-AWAL</td>
          <td class="py-2 px-3">Stok Awal Periode</td>
          <td class="py-2 px-3 text-right">-</td>
          <td class="py-2 px-3 text-right">-</td>
          <td class="py-2 px-3 text-right font-bold">${fmtNum(runningQty)} ${it.unit}</td>
          <td class="py-2 px-3 text-right font-bold">${fmtRp(runningQty * it.cost)}</td>
        </tr>`
      ];

      it.mutations.forEach(m => {
        runningQty += (m.qtyIn - m.qtyOut);
        rowsHtml.push(`
          <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">${m.date}</td>
            <td class="py-2 px-3 font-mono">${m.docNo}</td>
            <td class="py-2 px-3">${m.desc || '-'}</td>
            <td class="py-2 px-3 text-right text-emerald-700 font-semibold">${m.qtyIn > 0 ? '+' + fmtNum(m.qtyIn) : '-'}</td>
            <td class="py-2 px-3 text-right text-rose-700 font-semibold">${m.qtyOut > 0 ? '-' + fmtNum(m.qtyOut) : '-'}</td>
            <td class="py-2 px-3 text-right font-extrabold">${fmtNum(runningQty)} ${it.unit}</td>
            <td class="py-2 px-3 text-right font-semibold">${fmtRp(runningQty * it.cost)}</td>
          </tr>
        `);
      });

      document.getElementById("scTableBody").innerHTML = rowsHtml.join("");
      const modal = document.getElementById("modalStockCard");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }

    // ==================== MODAL CONFIRMATION HELPER ====================
    let pendingConfirmCallback = null;

    function openConfirmModal(title, message, onConfirm, showInput = false, inputLabel = "Masukkan Nilai:", defaultVal = "2022") {
      document.getElementById("confirmModalTitle").textContent = title;
      document.getElementById("confirmModalMessage").textContent = message;
      const yearWrap = document.getElementById("customYearInputWrap");
      const inp = document.getElementById("customYearInput");
      const lbl = document.getElementById("customModalInputLabel");
      if(inp) inp.type = /password|kata sandi/i.test(title) ? 'password' : 'text';
      if (showInput) {
        yearWrap.classList.remove("hidden");
        if (lbl) lbl.textContent = inputLabel;
        if (inp) inp.value = defaultVal;
      } else {
        yearWrap.classList.add("hidden");
      }
      pendingConfirmCallback = onConfirm;
      const m = document.getElementById("modalConfirmDelete");
      m.classList.remove("hidden");
      m.classList.add("flex");
    }

    function closeConfirmModal() {
      const m = document.getElementById("modalConfirmDelete");
      m.classList.add("hidden");
      m.classList.remove("flex");
      pendingConfirmCallback = null;
    }

    // ==================== AUTHENTICATION & 2-STEP LOGIN + REAL EMAIL OTP LOGIC (POIN 8 GAMBAR 7) ====================
    function clearAllAuthInputs() {
      const ids = [
        "loginUsername", "loginPassword",
        "karLoginCoopName", "karLoginEmpUsername", "karLoginEmpPassword",
        "regUsername", "regPassword", "regAdminEmail", "regFullName", "regCoopName",
        "sysAdminUsername", "sysAdminPassword", "sysAdminUniqueCode",
        "step2AdminEmailInput", "step2AdminOtpCodeInput",
        "step2EmpIdInput", "step2EmpPasswordInput"
      ];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      document.querySelectorAll(".otp-digit-box").forEach(b => { b.value = ""; });
      const otpBanner = document.getElementById("otpSimulatedInboxBanner");
      if (otpBanner) otpBanner.classList.add("hidden");
      const errBox = document.getElementById("authErrorBox");
      if (errBox) errBox.classList.add("hidden");
    }

    function loginWithUser(user, operator = null, supervising = false) {
    if (!cloud.session || !cloud.cache.has(user?.uid)) return;
    currentUser = user; isSupervisingFromSysAdmin = supervising;
    activeSubSession = operator || {type:user.isAdmin ? 'SYS_ADMIN':'ADMIN_USAHA',operatorId:user.uid,operatorName:user.fullName,operatorPosition:user.role};
    loadStateForUser(user); clearAllAuthInputs();
    document.getElementById('authOverlay').classList.add('hidden');
    document.getElementById('authOverlay').classList.remove('flex');
    initJournalFormLines(); renderAll();
    showToast('Selamat datang, ' + activeSubSession.operatorName + '. Data dimuat dari cloud.');
  }

    function showAuthModal() {
      clearAllAuthInputs();
      pendingStep1BizUser = null;
      isSupervisingFromSysAdmin = false;
      document.getElementById("authTopTabs")?.classList.remove("hidden");
      document.getElementById("step2BusinessRolePanel")?.classList.add("hidden");
      document.getElementById("btnSwitchLogin")?.click();
      const ov = document.getElementById("authOverlay");
      ov.classList.remove("hidden");
      ov.classList.add("flex");
    }

    function openStep2BusinessRoleSelection(user) {
    pendingStep1BizUser = user; clearAllAuthInputs();
    document.getElementById('authTopTabs').classList.add('hidden');
    for (const id of ['loginForm','registerForm','sysAdminLoginForm','karyawanDirectLoginForm']) document.getElementById(id).classList.add('hidden');
    document.getElementById('step2BusinessRolePanel').classList.remove('hidden');
    document.getElementById('step2BizAccountTitle').textContent = user.fullName + ' — ' + user.coopName;
    document.getElementById('step2AdminEmailHint').textContent = 'Kode dikirim hanya ke email terdaftar akun ini.';
    document.getElementById('btnChooseRoleAdminUsaha').click();
  }

    // ==================== EXPORT TO EXCEL (.XLSX) RAPI & TERFORMAT LENGKAP ====================
    function exportToExcelWorkbook() {
      if (typeof XLSX === "undefined") {
        showToast("Pustaka ekspor Excel sedang dimuat, silakan coba sesaat lagi.", "error");
        return;
      }
      const wb = XLSX.utils.book_new();
      const memSummary = computeMembersSummary();
      const invSummary = computeInventorySummary();
      const phu = computePHU(12);
      const lpe = computeLPE();
      const neraca = computeNeraca();
      const arusKas = computeArusKas();
      const tb = computeTrialBalance();
      const periodStr = activeBookYear === "ALL" ? "Semua Tahun (Akumulasi)" : `Tahun Buku ${activeBookYear}`;

      function appendFormattedSheet(sheetName, titleLine, subtitleLine, headers, dataRows, colWidths) {
        const coopTitle = (state.identity.coopName || (currentUser && currentUser.coopName) || "KOPERASI DESA MERAH PUTIH").toUpperCase();
        const cityTitle = (state.identity.city || "-").toUpperCase();
        const provTitle = (state.identity.province || "-").toUpperCase();
        const aoa = [
          [coopTitle],
          [`${cityTitle}, PROVINSI ${provTitle}`],
          [titleLine.toUpperCase()],
          [subtitleLine],
          [],
          headers,
          ...dataRows
        ];
        const ws = XLSX.utils.aoa_to_sheet(aoa);
        const maxCol = Math.max(headers.length - 1, 1);
        ws["!merges"] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: maxCol } },
          { s: { r: 1, c: 0 }, e: { r: 1, c: maxCol } },
          { s: { r: 2, c: 0 }, e: { r: 2, c: maxCol } },
          { s: { r: 3, c: 0 }, e: { r: 3, c: maxCol } }
        ];
        if (Array.isArray(colWidths)) {
          ws["!cols"] = colWidths.map(w => ({ wch: w }));
        }
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      }

      // 1. Sheet Home / Identitas Koperasi
      appendFormattedSheet(
        "Home Identitas",
        "IDENTITAS KOPERASI DESA MERAH PUTIH",
        `Periode Aktif: ${periodStr}`,
        ["Atribut Identitas", "Nilai / Keterangan"],
        [
          ["Nama Koperasi", state.identity.coopName],
          ["KP / Unit Usaha", state.identity.unitUsaha],
          ["Provinsi", state.identity.province],
          ["Kabupaten / Kota", state.identity.city],
          ["Alamat Domisili", state.identity.address],
          ["Awal Tahun Buku", state.identity.startDate],
          ["Akhir Tahun Buku", state.identity.endDate],
          ["Nama Ketua Koperasi", state.identity.chairmanName],
          ["NIK Ketua Koperasi", state.identity.chairmanNik],
          ["Nama Petugas Akuntansi", state.identity.accountantName],
          ["NIK Petugas Akuntansi", state.identity.accountantNik]
        ],
        [30, 50]
      );

      // 2. Sheet Database Anggota
      const memRows = memSummary.map((m, idx) => [
        idx + 1, m.code, m.name, m.nik || "", m.gender || "L", m.address || "", m.village || "", m.rt || "", m.rw || "", m.joinDate || "",
        m.pokok, m.wajib, m.sukarela, m.totalSimpanan, m.pinjaman,
        ...m.monthlyWajib
      ]);
      memRows.push([
        "", "TOTAL", "REKAPITULASI SALDO ANGGOTA", "", "", "", "", "", "", "",
        memSummary.reduce((s, m) => s + m.pokok, 0),
        memSummary.reduce((s, m) => s + m.wajib, 0),
        memSummary.reduce((s, m) => s + m.sukarela, 0),
        memSummary.reduce((s, m) => s + m.totalSimpanan, 0),
        memSummary.reduce((s, m) => s + m.pinjaman, 0),
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]);
      appendFormattedSheet(
        "Database Anggota",
        "DAFTAR REKAP DATABASE ANGGOTA & SIMPAN PINJAM KOPERASI",
        `Untuk Periode ${periodStr} (dalam Rupiah)`,
        ["No", "Kode Anggota", "Nama Anggota", "NIK", "L/P", "Alamat Lengkap", "Desa", "RT", "RW", "Tgl Bergabung", "Simpanan Pokok (Rp)", "Simpanan Wajib (Rp)", "Simpanan Sukarela (Rp)", "Total Simpanan (Rp)", "Sisa Pinjaman (Rp)", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
        memRows,
        [6, 14, 26, 20, 6, 28, 16, 6, 6, 14, 18, 18, 18, 20, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
      );

      // 3. Sheet Database Karyawan
      const empRows = (state.employees || []).map((e, idx) => [
        idx + 1, e.id, e.name, e.position || "", e.department || "", e.address || "", e.phone || "",
        Number(e.baseSalary) || 0, Number(e.allowance) || 0, (Number(e.baseSalary) || 0) + (Number(e.allowance) || 0)
      ]);
      appendFormattedSheet(
        "Database Karyawan",
        "DAFTAR DATABASE KARYAWAN & OTORITAS PETUGAS KOPERASI",
        `Untuk Periode ${periodStr} (dalam Rupiah)`,
        ["No", "ID Karyawan", "Nama Lengkap Karyawan", "Jabatan", "Departemen / Unit", "Alamat Lengkap", "No. Telepon", "Gaji Pokok (Rp)", "Tunjangan (Rp)", "Total Gaji (Rp)"],
        empRows,
        [6, 14, 28, 24, 24, 30, 16, 18, 18, 20]
      );

      // 4. Sheet Data Supplier
      const supRows = (state.suppliers || []).map((s, idx) => [
        idx + 1, s.code, s.name, s.address || "", s.phone || "", s.itemCode || "", s.itemName || "",
        Number(s.qtyBought) || 0, Number(s.buyPrice) || 0, (Number(s.qtyBought) || 0) * (Number(s.buyPrice) || 0), s.date || "", s.docNo || ""
      ]);
      appendFormattedSheet(
        "Data Supplier",
        "DAFTAR DATA SUPPLIER, KUANTITAS PEMBELIAN & HPP OTOMATIS",
        `Untuk Periode ${periodStr} (dalam Rupiah)`,
        ["No", "Kode Supplier", "Nama Supplier", "Alamat Supplier", "No. Telepon", "Kode Barang", "Nama Barang", "Kuantitas Dibeli", "Harga Beli / HPP Satuan (Rp)", "Total Nilai Pembelian (Rp)", "Tanggal", "Nomor Bukti"],
        supRows,
        [6, 24, 30, 32, 16, 14, 28, 16, 22, 22, 14, 24]
      );

      // 5. Sheet Persediaan
      const invRows = invSummary.map(it => [
        it.code, it.name, (it.supplierCodes || []).join(", "), it.account, it.unit,
        it.initQty, it.qtyIn, it.qtyOut, it.finalQty, it.cost, it.price, it.finalVal, it.status
      ]);
      invRows.push([
        "TOTAL", "REKAPITULASI PERSEDIAAN BARANG", "", "", "",
        invSummary.reduce((s, i) => s + i.initQty, 0),
        invSummary.reduce((s, i) => s + i.qtyIn, 0),
        invSummary.reduce((s, i) => s + i.qtyOut, 0),
        invSummary.reduce((s, i) => s + i.finalQty, 0),
        "", "",
        invSummary.reduce((s, i) => s + i.finalVal, 0),
        ""
      ]);
      appendFormattedSheet(
        "Persediaan",
        "REKAPITULASI & CEK BARANG PERSEDIAAN OTOMATIS",
        `Untuk Periode ${periodStr} (dalam Rupiah)`,
        ["Kode Barang", "Nama Barang Persediaan", "Kode Supplier", "Akun Persediaan (COA)", "Satuan", "Stok Awal", "Total Masuk (+)", "Total Keluar (-)", "Stok Akhir", "HPP Satuan (Rp)", "Harga Jual (Rp)", "Total Nilai Persediaan (Rp)", "Status Stok"],
        invRows,
        [14, 30, 24, 32, 10, 12, 15, 15, 14, 18, 18, 22, 14]
      );

      // 6. Sheet COA (Daftar Akun + Saldo Awal Manual)
      const coaRows = tb.map((a, idx) => [
        idx + 1, a.code, a.name, a.full, a.normal, a.lvl1, a.lvl2, a.lvl3, a.initBalance || 0, a.mutasiNetJurnal || 0, a.saldoAkhir || 0
      ]);
      appendFormattedSheet(
        "COA",
        "BAGAN AKUN STANDAR KOPERASI (CHART OF ACCOUNTS & SALDO AWAL)",
        `Untuk Periode ${periodStr} (dalam Rupiah)`,
        ["No", "Kode Akun", "Nama Akun", "Kode dan Nama Akun", "Saldo Normal", "Level 1", "Level 2", "Level 3", "Saldo Awal Manual (Rp)", "Mutasi Jurnal (Rp)", "Saldo Akhir (Rp)"],
        coaRows,
        [6, 14, 34, 42, 14, 10, 10, 10, 22, 22, 22]
      );

      // 7. Sheet Jurnal Harian
      const jurRows = state.journals.map(j => [
        j.date, j.docNo, j.account, j.officerName || getDefaultActiveOfficerValue(),
        j.memberCode || "", j.memberName || "", j.itemName || "", j.qty || 0,
        Number(j.debit) || 0, Number(j.kredit) || 0, j.desc || "", j.cashflow || ""
      ]);
      jurRows.push([
        "", "TOTAL", "JUMLAH TOTAL DEBIT & KREDIT JURNAL", "", "", "", "", "",
        state.journals.reduce((s, j) => s + (Number(j.debit) || 0), 0),
        state.journals.reduce((s, j) => s + (Number(j.kredit) || 0), 0),
        "BALANCE", ""
      ]);
      appendFormattedSheet(
        "Jurnal",
        "BUKU JURNAL HARIAN TRANSAKSI KOPERASI",
        `Untuk Periode ${periodStr} (dalam Rupiah)`,
        ["Tanggal", "Nomor Bukti", "Kode dan Nama Akun", "Nama Petugas / Karyawan Penginput", "Kode Anggota", "Nama Anggota", "Nama Barang Persediaan", "Qty", "Sisi Kiri (Debit)", "Sisi Kanan (Kredit)", "Keterangan Transaksi", "Komponen Laporan Arus Kas"],
        jurRows,
        [14, 24, 38, 32, 14, 22, 26, 10, 20, 20, 36, 34]
      );

      // 8. Sheet Neraca Saldo
      const tbRows = tb.map(r => [
        r.code, r.normal, r.full, r.initBalance || 0, r.mutDebit, r.mutKredit, r.saldoDebit, r.saldoKredit, r.saldoAkhir
      ]);
      tbRows.push([
        "", "TOTAL", "JUMLAH TOTAL NERACA SALDO",
        tb.reduce((s, r) => s + (r.initBalance || 0), 0),
        tb.reduce((s, r) => s + r.mutDebit, 0),
        tb.reduce((s, r) => s + r.mutKredit, 0),
        tb.reduce((s, r) => s + r.saldoDebit, 0),
        tb.reduce((s, r) => s + r.saldoKredit, 0),
        0
      ]);
      appendFormattedSheet(
        "Neraca Saldo",
        "NERACA SALDO SETELAH PENYESUAIAN",
        `Per 31 Desember ${activeBookYear === "ALL" ? "2026" : activeBookYear} (dalam Rupiah)`,
        ["Kode Akun", "Saldo Normal", "Kode dan Nama Akun", "Saldo Awal Manual (Rp)", "Mutasi Debit (Rp)", "Mutasi Kredit (Rp)", "Saldo Debit (Rp)", "Saldo Kredit (Rp)", "Saldo Akhir Normal (Rp)"],
        tbRows,
        [14, 14, 42, 22, 20, 20, 20, 20, 22]
      );

      // 9. Sheet Hasil Usaha (PHU)
      const phuRows = phu.rows.map(r => [
        r.code || "", r.no || "", r.label, r.mVal !== undefined ? r.mVal : "", r.yVal !== undefined ? r.yVal : ""
      ]);
      appendFormattedSheet(
        "Hasil Usaha",
        "LAPORAN PERHITUNGAN HASIL USAHA (PHU)",
        `Untuk Periode yang Berakhir sampai dengan 31 Desember ${activeBookYear === "ALL" ? "2026" : activeBookYear} (dalam Rupiah)`,
        ["Kode", "Nomor Urut", "Uraian Pos Perhitungan Hasil Usaha", "Bulan Terpilih (Rp)", "s.d. Akhir Tahun (Rp)"],
        phuRows,
        [12, 12, 48, 22, 24]
      );

      // 10. Sheet LPE
      const lpeRows = [
        [1, "SALDO AWAL TAHUN", lpe.awal["3.1.1"], lpe.awal["3.1.2"], lpe.awal["3.1.3"], lpe.awal["3.2.1"], lpe.awal["3.3.1"], lpe.awal["3.4.2"], lpe.awal["3.4.1"], lpe.totAwal],
        [2, "Penambahan (Pengurangan) Periode Berjalan", lpe.mutasi["3.1.1"], lpe.mutasi["3.1.2"], lpe.mutasi["3.1.3"], lpe.mutasi["3.2.1"], lpe.mutasi["3.3.1"], lpe.mutasi["3.4.2"], lpe.mutasi["3.4.1"], lpe.totMutasi],
        [3, "SALDO AKHIR EKUITAS", lpe.akhir["3.1.1"], lpe.akhir["3.1.2"], lpe.akhir["3.1.3"], lpe.akhir["3.2.1"], lpe.akhir["3.3.1"], lpe.akhir["3.4.2"], lpe.akhir["3.4.1"], lpe.totAkhir]
      ];
      appendFormattedSheet(
        "LPE",
        "LAPORAN PERUBAHAN EKUITAS (LPE)",
        `Untuk Periode yang Berakhir sampai dengan 31 Desember ${activeBookYear === "ALL" ? "2026" : activeBookYear} (dalam Rupiah)`,
        ["No", "Uraian Perubahan Ekuitas", "Simpanan Pokok (3.1.1)", "Simpanan Wajib (3.1.2)", "Simpanan Lainnya (3.1.3)", "Hibah (3.2.1)", "Cadangan (3.3.1)", "Laba Ditahan / Retained Earning (3.4.2)", "SHU Tahun Berjalan (3.4.1)", "Total Ekuitas (Rp)"],
        lpeRows,
        [6, 42, 22, 22, 22, 20, 20, 28, 24, 24]
      );

      // 11. Sheet Neraca
      const neracaRows = neraca.rows.map(r => [
        r.code || "", r.no || "", r.label, r.end !== undefined ? r.end : "", r.start !== undefined ? r.start : ""
      ]);
      appendFormattedSheet(
        "Neraca",
        "LAPORAN POSISI KEUANGAN (NERACA)",
        `Per 31 Desember ${activeBookYear === "ALL" ? "2026" : activeBookYear} dan Saldo Awal Tahun (dalam Rupiah)`,
        ["Kode", "No", "Uraian Pos Neraca (Aset, Kewajiban & Ekuitas)", "Saldo Akhir Periode (Rp)", "Saldo Awal Tahun (Rp)"],
        neracaRows,
        [12, 8, 48, 24, 24]
      );

      // 12. Sheet Laporan Arus Kas
      const cfRows = arusKas.rows.map(r => [
        r.no || "", r.label, r.val !== undefined ? r.val : ""
      ]);
      appendFormattedSheet(
        "Laporan Arus Kas",
        "LAPORAN ARUS KAS (METODE LANGSUNG)",
        `Untuk Tahun yang Berakhir sampai dengan 31 Desember ${activeBookYear === "ALL" ? "2026" : activeBookYear} (dalam Rupiah)`,
        ["No", "Uraian Komponen Arus Kas", "Nilai (Rp)"],
        cfRows,
        [8, 52, 24]
      );

      const safeCoop = (state.identity.coopName || "KDMP").replace(/[^a-zA-Z0-9]/g, "_");
      XLSX.writeFile(wb, `Aplikasi_Akuntansi_${safeCoop}_${activeBookYear}.xlsx`);
      showToast("File Excel (.xlsx) lengkap dengan format laporan keuangan, anggota, karyawan & supplier berhasil diunduh.");
    }

    // ==================== SIDEBAR HAMBURGER DRAWER HELPERS ====================
    function openSidebarDrawer() {
      document.getElementById("navDrawerBackdrop")?.classList.remove("hidden");
      document.getElementById("navSidebarDrawer")?.classList.remove("-translate-x-full");
    }

    function closeSidebarDrawer() {
      document.getElementById("navDrawerBackdrop")?.classList.add("hidden");
      document.getElementById("navSidebarDrawer")?.classList.add("-translate-x-full");
    }

    // ==================== EVENT LISTENERS INITIALIZATION ====================
    window.addEventListener("DOMContentLoaded", async () => {
      loadUsers(); initJournalFormLines(); renderAll(); showAuthModal();

      // Sidebar Hamburger Drawer Listeners
      document.getElementById("btnOpenSidebarDrawer").addEventListener("click", openSidebarDrawer);
      document.getElementById("btnCloseSidebarDrawer").addEventListener("click", closeSidebarDrawer);
      document.getElementById("navDrawerBackdrop").addEventListener("click", closeSidebarDrawer);

      // Tombol Kembali ke Akun Admin Aplikasi (Poin 2)
      document.getElementById("btnReturnToSysAdmin")?.addEventListener("click", async () => { try { if(cloud.session?.user?.isAdmin) await openCloudWorkspace(cloud.session.user.uid); } catch(error) { showToast(error.message,'error'); } });

      // Auth Portal Mode Switching (4 Portal: Login Admin Usaha, Login Karyawan Terpisah, Buat Akun Baru, Admin Aplikasi)
      const btnSwitchLogin = document.getElementById("btnSwitchLogin");
      const btnSwitchKaryawanLogin = document.getElementById("btnSwitchKaryawanLogin");
      const btnSwitchRegister = document.getElementById("btnSwitchRegister");
      const btnSwitchSysAdmin = document.getElementById("btnSwitchSysAdmin");
      const loginForm = document.getElementById("loginForm");
      const karyawanDirectLoginForm = document.getElementById("karyawanDirectLoginForm");
      const registerForm = document.getElementById("registerForm");
      const sysAdminLoginForm = document.getElementById("sysAdminLoginForm");
      const step2Panel = document.getElementById("step2BusinessRolePanel");
      const authErrorBox = document.getElementById("authErrorBox");

      function setActiveAuthTab(activeBtn, activeForm) {
        clearAllAuthInputs();
        updateRegisteredCoopsDatalist();
        [btnSwitchLogin, btnSwitchKaryawanLogin, btnSwitchRegister, btnSwitchSysAdmin].forEach(b => {
          if (!b) return;
          b.classList.remove("active");
          b.classList.add("text-slate-600");
        });
        activeBtn?.classList.add("active");
        activeBtn?.classList.remove("text-slate-600");

        [loginForm, karyawanDirectLoginForm, registerForm, sysAdminLoginForm, step2Panel].forEach(f => f?.classList.add("hidden"));
        activeForm?.classList.remove("hidden");
        authErrorBox?.classList.add("hidden");
      }

      btnSwitchLogin.addEventListener("click", () => setActiveAuthTab(btnSwitchLogin, loginForm));
      btnSwitchKaryawanLogin?.addEventListener("click", () => setActiveAuthTab(btnSwitchKaryawanLogin, karyawanDirectLoginForm));
      btnSwitchRegister.addEventListener("click", () => setActiveAuthTab(btnSwitchRegister, registerForm));
      btnSwitchSysAdmin.addEventListener("click", () => setActiveAuthTab(btnSwitchSysAdmin, sysAdminLoginForm));

      // Poin 6: Login Khusus Karyawan (Cukup sebutkan Nama Koperasi, Username/Nama Karyawan, dan Password Karyawan)
      function matchEmployeeRecord() { return false; }

      karyawanDirectLoginForm?.addEventListener("submit", async e => { e.preventDefault(); await authTask(e.currentTarget, async () => {
    await cloudRequest('employee_login', {cooperative:document.getElementById('karLoginCoopName').value, employeeId:document.getElementById('karLoginEmpUsername').value, password:document.getElementById('karLoginEmpPassword').value});
    await restoreCloudSession();
  }); });

      // Step 1: Business Account Login -> Pulls latest accounts from Cloud first so login from another laptop works!
      loginForm.addEventListener("submit", async e => { e.preventDefault(); await authTask(e.currentTarget, async () => {
    const data = await cloudRequest('login_begin', {username:document.getElementById('loginUsername').value,password:document.getElementById('loginPassword').value});
    await startCloudLogin(data);
  }); });

      document.getElementById("btnBackToStep1Login").addEventListener("click", () => {
        pendingStep1BizUser = null;
        document.getElementById("authTopTabs")?.classList.remove("hidden");
        setActiveAuthTab(btnSwitchLogin, loginForm);
      });

      // Step 2 Role Toggle: Admin Utama Usaha (OTP) vs Karyawan Usaha (ID & Password)
      const btnChooseAdminUsaha = document.getElementById("btnChooseRoleAdminUsaha");
      const btnChooseKaryawanUsaha = document.getElementById("btnChooseRoleKaryawanUsaha");
      const adminOtpForm = document.getElementById("adminUsahaOtpForm");
      const karyawanLoginForm = document.getElementById("karyawanUsahaLoginForm");

      btnChooseAdminUsaha.addEventListener("click", () => {
        btnChooseAdminUsaha.classList.add("active");
        btnChooseKaryawanUsaha.classList.remove("active");
        adminOtpForm.classList.remove("hidden");
        karyawanLoginForm.classList.add("hidden");
        authErrorBox.classList.add("hidden");
      });

      btnChooseKaryawanUsaha.addEventListener("click", () => {
        btnChooseKaryawanUsaha.classList.add("active");
        btnChooseAdminUsaha.classList.remove("active");
        karyawanLoginForm.classList.remove("hidden");
        adminOtpForm.classList.add("hidden");
        authErrorBox.classList.add("hidden");
      });

      // Poin 8: Integrasi Pengiriman OTP Real-Time (Arsitektur PHPMailer / Mailer API) + 6 Kotak Input Auto-Paste + Countdown Timer
      
      let otpCountdownInterval = null;
      let otpRemainingSecs = 0;



      const otpBoxInputs = Array.from(document.querySelectorAll("#otpSixBoxesContainer .otp-digit-box"));
      const mainOtpInput = document.getElementById("step2AdminOtpCodeInput");

      function syncBoxesToMainOtp() {
        const joined = otpBoxInputs.map(b => (b.value || "").replace(/[^0-9]/g, "")).join("");
        if (mainOtpInput) mainOtpInput.value = joined;
      }

      function syncMainOtpToBoxes(valStr) {
        const clean = String(valStr || "").replace(/[^0-9]/g, "").slice(0, 6);
        otpBoxInputs.forEach((b, idx) => {
          b.value = clean[idx] || "";
        });
      }

      otpBoxInputs.forEach((box, idx) => {
        box.addEventListener("input", () => {
          box.value = (box.value || "").replace(/[^0-9]/g, "").slice(-1);
          syncBoxesToMainOtp();
          if (box.value && idx < otpBoxInputs.length - 1) {
            otpBoxInputs[idx + 1].focus();
          }
        });
        box.addEventListener("keydown", (ev) => {
          if (ev.key === "Backspace" && !box.value && idx > 0) {
            otpBoxInputs[idx - 1].focus();
          }
        });
        box.addEventListener("paste", (ev) => {
          ev.preventDefault();
          const pasted = ((ev.clipboardData || window.clipboardData)?.getData("text") || "").replace(/[^0-9]/g, "").slice(0, 6);
          if (!pasted) return;
          syncMainOtpToBoxes(pasted);
          if (mainOtpInput) mainOtpInput.value = pasted;
          const nextIdx = Math.min(pasted.length, otpBoxInputs.length - 1);
          otpBoxInputs[nextIdx]?.focus();
        });
      });

      mainOtpInput?.addEventListener("input", () => {
        mainOtpInput.value = (mainOtpInput.value || "").replace(/[^0-9]/g, "").slice(0, 6);
        syncMainOtpToBoxes(mainOtpInput.value);
      });

      function startOtpCountdown(seconds = 120) {
        if (otpCountdownInterval) clearInterval(otpCountdownInterval);
        otpRemainingSecs = seconds;
        const badge = document.getElementById("otpTimerBadge");
        const updateTimerUI = () => {
          if (!badge) return;
          if (otpRemainingSecs <= 0) {
            clearInterval(otpCountdownInterval);
            
            badge.textContent = "OTP Kedaluwarsa! Silakan Kirim Ulang";
            badge.className = "text-[10px] font-mono font-bold bg-rose-100 px-2 py-0.5 rounded border border-rose-300 text-rose-800";
          } else {
            badge.textContent = `Sisa Waktu: ${otpRemainingSecs} detik`;
            badge.className = "text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-800";
          }
        };
        updateTimerUI();
        otpCountdownInterval = setInterval(() => {
          otpRemainingSecs--;
          updateTimerUI();
        }, 1000);
      }

      document.getElementById("btnSendAdminOtp").addEventListener("click", async e => {
    const button = e.currentTarget; button.disabled = true; button.textContent = 'Mengirim…';
    document.getElementById('authErrorBox').classList.add('hidden');
    try {
      const data = await cloudRequest('send_otp');
      startOtpCountdown(data.remainingSeconds);
      document.getElementById('otpSimulatedInboxBanner').classList.remove('hidden');
      document.getElementById('otpEmailBodyPreview').textContent = 'Kode telah diterima layanan email untuk dikirim. Periksa Inbox/Spam. Berlaku dua menit dan satu kali pakai.';
      button.textContent = 'Kirim Ulang OTP';
      setTimeout(() => { button.disabled = false; }, data.resendAfter * 1000);
    } catch (error) {
      document.getElementById('otpSimulatedInboxBanner').classList.add('hidden');
      showAuthError(error); button.textContent = 'Kirim Ulang OTP'; button.disabled = false;
    }
  });

      // Verify OTP & Login as Admin Utama Usaha
      adminOtpForm.addEventListener("submit", async e => { e.preventDefault(); await authTask(e.currentTarget, async () => {
    await cloudRequest('verify_otp', {otp:document.getElementById('step2AdminOtpCodeInput').value});
    if(otpCountdownInterval) clearInterval(otpCountdownInterval);
    await restoreCloudSession();
  }); });

      // Step 2B: Login as Karyawan Usaha
      karyawanLoginForm.addEventListener("submit", async e => { e.preventDefault(); showAuthError(new Error('Gunakan tab Login Karyawan dengan username usaha dan ID karyawan.')); });

      // Portal Khusus Administrator Aplikasi Login (Username + Password + Encrypted Unique Code Verification)
      sysAdminLoginForm.addEventListener("submit", async e => { e.preventDefault(); await authTask(e.currentTarget, async () => {
    const data = await cloudRequest('login_begin', {username:document.getElementById('sysAdminUsername').value,password:document.getElementById('sysAdminPassword').value,uniqueCode:document.getElementById('sysAdminUniqueCode').value});
    await startCloudLogin(data);
  }); });

      // Register New Business Account (+ Sync to Cloud so other laptops can immediately login!)
      registerForm.addEventListener("submit", async e => { e.preventDefault(); await authTask(e.currentTarget, async () => {
    const data = await cloudRequest('register_begin', {username:document.getElementById('regUsername').value,password:document.getElementById('regPassword').value,adminEmail:document.getElementById('regAdminEmail').value,fullName:document.getElementById('regFullName').value,coopName:document.getElementById('regCoopName').value});
    await startCloudLogin(data);
  }); });

      document.getElementById("btnLogoutUser").addEventListener("click", async () => { try { await signOutCloud(); } catch(error) { showToast(error.message,'error'); } });

      document.getElementById("btnOpenAccountSettings").addEventListener("click", () => {
        document.querySelector('.tab-btn[data-tab="pengaturan"]')?.click();
      });

      // Multi-Year Selector & Add Custom Year
      document.getElementById("activeYearSelect").addEventListener("change", (e) => {
        activeBookYear = e.target.value;
        if (activeBookYear !== "ALL") {
          state.identity.startDate = `${activeBookYear}-01-01`;
          state.identity.endDate = `${activeBookYear}-12-31`;
          document.getElementById("jDate").value = `${activeBookYear}-01-10`;
          document.getElementById("qtDate").value = `${activeBookYear}-01-12`;
          document.getElementById("spDate").value = `${activeBookYear}-01-15`;
        }
        syncAllTransactionDocNoInputs();
        renderAll();
        showToast(`Periode tahun buku diubah ke: ${activeBookYear === "ALL" ? "Semua Tahun (Akumulasi)" : activeBookYear}`);
      });

      document.getElementById("btnAddCustomYear").addEventListener("click", () => {
        openConfirmModal(
          "Tambah Tahun Buku (Termasuk Tahun Sebelumnya)",
          "Masukkan tahun buku yang ingin Anda kelola atau tambahkan (contoh: 2020, 2021, 2022, atau 2028):",
          () => {
            const yVal = String(document.getElementById("customYearInput").value || "").trim();
            if (/^\d{4}$/.test(yVal)) {
              if (!Array.isArray(state.customYears)) state.customYears = [];
              if (!state.customYears.includes(yVal)) state.customYears.push(yVal);
              activeBookYear = yVal;
              state.identity.startDate = `${yVal}-01-01`;
              state.identity.endDate = `${yVal}-12-31`;
              document.getElementById("jDate").value = `${yVal}-01-10`;
              document.getElementById("qtDate").value = `${yVal}-01-12`;
              document.getElementById("spDate").value = `${yVal}-01-15`;
              saveState();
              syncAllTransactionDocNoInputs();
              renderAll();
              showToast(`Tahun buku ${yVal} berhasil ditambahkan dan diaktifkan.`);
            } else {
              showToast("Masukkan format tahun 4 digit yang valid.", "error");
            }
          },
          true,
          "Masukkan Tahun Buku (4 Digit):",
          "2022"
        );
      });

      // Confirm Modal Listeners
      document.getElementById("btnCloseConfirmModal").addEventListener("click", closeConfirmModal);
      document.getElementById("btnCancelConfirmModal").addEventListener("click", closeConfirmModal);
      document.getElementById("btnProceedConfirmModal").addEventListener("click", () => {
        if (typeof pendingConfirmCallback === "function") {
          pendingConfirmCallback();
        }
        closeConfirmModal();
      });

      // Main Navigation Tabs (inside Hamburger Drawer)
      const menuLabelMap = {
        dashboard: "Ringkasan & Dashboard",
        anggota: "Database Anggota & Simpan Pinjam",
        karyawan: "Database Karyawan & Otoritas",
        supplier: "Data Supplier & Pembelian (HPP)",
        persediaan: "Stok & Barang Persediaan",
        jurnal: "Jurnal Harian",
        bukubesar: "Buku Besar & Neraca Saldo",
        laporan: "Laporan Keuangan",
        coa: "Daftar Akun (COA)",
        identitas: "Identitas Koperasi",
        pengaturan: "Pengaturan Akun & Admin"
      };

      document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-tab");
          if (activeSubSession.type === "KARYAWAN_USAHA" && (target === "identitas" || target === "pengaturan")) {
            showToast("Akses dibatasi: Menu Identitas Koperasi & Pengaturan Akun hanya untuk Admin Utama Usaha.", "error");
            return;
          }
          document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          document.querySelectorAll(".tab-panel").forEach(p => p.classList.add("hidden"));
          document.getElementById(`tab-${target}`)?.classList.remove("hidden");
          const menuBadge = document.getElementById("currentActiveMenuBadge");
          if (menuBadge) menuBadge.textContent = `Menu: ${menuLabelMap[target] || target}`;
          closeSidebarDrawer();
          renderAll();
        });
      });

      // Shortcut buttons on Dashboard
      document.getElementById("btnGoToAnggota").addEventListener("click", () => {
        document.querySelector('.tab-btn[data-tab="anggota"]')?.click();
      });
      document.getElementById("btnGoToPersediaan").addEventListener("click", () => {
        document.querySelector('.tab-btn[data-tab="persediaan"]')?.click();
      });
      document.getElementById("btnGoToJurnal").addEventListener("click", () => {
        document.querySelector('.tab-btn[data-tab="jurnal"]')?.click();
      });
      document.getElementById("btnResetDemoData").addEventListener("click", () => {
        openConfirmModal(
          "Reset Semua Angka ke 0",
          "Apakah Anda yakin ingin mereset seluruh transaksi jurnal, saldo awal COA, saldo simpanan anggota, dan stok persediaan pada akun ini kembali ke angka 0?",
          () => {
            state = createFreshZeroState(currentUser);
            saveState();
            initJournalFormLines();
            renderAll();
            showToast("Seluruh data angka pada akun ini berhasil direset kembali ke 0.");
          }
        );
      });

      // Subtabs Buku Besar & Neraca Saldo
      document.querySelectorAll(".bb-subtab").forEach(btn => {
        btn.addEventListener("click", () => {
          const t = btn.getAttribute("data-bbtab");
          document.querySelectorAll(".bb-subtab").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById("bb-panel-gl").classList.toggle("hidden", t !== "gl");
          document.getElementById("bb-panel-tb").classList.toggle("hidden", t !== "tb");
        });
      });

      // Subtabs Laporan Keuangan (Termasuk Mode "5. Semua Laporan Sekaligus" untuk Cetak Semua)
      document.querySelectorAll(".rep-subtab").forEach(btn => {
        btn.addEventListener("click", () => {
          const t = btn.getAttribute("data-reptab");
          document.querySelectorAll(".rep-subtab").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          ["phu", "lpe", "neraca", "aruskas"].forEach(k => {
            const panel = document.getElementById(`rep-panel-${k}`);
            if (panel) {
              panel.classList.toggle("hidden", t !== "semua" && k !== t);
            }
          });
        });
      });

      // Filters & Toggles
      document.getElementById("searchMemberInput").addEventListener("input", renderAll);
      document.getElementById("filterMemberLogSelect").addEventListener("change", renderAll);
      document.getElementById("searchEmployeeInput").addEventListener("input", renderEmployeesTab);
      document.getElementById("searchSupplierInput").addEventListener("input", () => renderSuppliersTab(computeInventorySummary()));
      document.getElementById("searchInventoryInput").addEventListener("input", renderAll);
      document.getElementById("filterInventoryCat").addEventListener("change", renderAll);
      document.getElementById("filterInventoryStatus").addEventListener("change", renderAll);
      document.getElementById("filterCardItemSelect").addEventListener("change", renderAll);
      document.getElementById("filterJournalMonth").addEventListener("change", renderJournalTab);
      document.getElementById("searchJournalInput").addEventListener("input", renderJournalTab);
      document.getElementById("glAccountSelect").addEventListener("change", () => renderBukuBesarAndTB(computeTrialBalance()));
      document.getElementById("tbHideZeroToggle").addEventListener("change", () => renderBukuBesarAndTB(computeTrialBalance()));
      document.getElementById("reportMonthSelect").addEventListener("change", renderAll);
      document.getElementById("searchCoaInput").addEventListener("input", () => renderCoaTab(computeTrialBalance()));
      document.getElementById("filterCoaGroup").addEventListener("change", () => renderCoaTab(computeTrialBalance()));

      // Real-time Auto-Increment & Format Sync on Date/DocNo Inputs (Poin 3 - Gambar 3 & 4)
      document.getElementById("jDate").addEventListener("change", (e) => {
        document.getElementById("jDocNo").value = generateNextTransactionDocNo(e.target.value, null);
        updateDocNoWarningUI("jDocNo", "jDocNoWarning", "jDate", null);
      });
      document.getElementById("qtDate").addEventListener("change", (e) => {
        document.getElementById("qtDocNo").value = generateNextTransactionDocNo(e.target.value, null);
        updateDocNoWarningUI("qtDocNo", "qtDocNoWarning", "qtDate", null);
      });
      document.getElementById("spDate").addEventListener("change", (e) => {
        document.getElementById("spDocNo").value = generateNextTransactionDocNo(e.target.value, "USP");
        updateDocNoWarningUI("spDocNo", "spDocNoWarning", "spDate", "USP");
      });

      document.getElementById("jDocNo").addEventListener("change", () => updateDocNoWarningUI("jDocNo", "jDocNoWarning", "jDate", null));
      document.getElementById("qtDocNo").addEventListener("change", () => updateDocNoWarningUI("qtDocNo", "qtDocNoWarning", "qtDate", null));
      document.getElementById("spDocNo").addEventListener("change", () => updateDocNoWarningUI("spDocNo", "spDocNoWarning", "spDate", "USP"));

      // Export & Print (Termasuk Fitur Cetak Semua Laporan Keuangan Sekaligus - Poin 5)
      function printAllFinancialReportsAtOnce() {
        document.querySelector('.tab-btn[data-tab="laporan"]')?.click();
        document.querySelector('.rep-subtab[data-reptab="semua"]')?.click();
        document.body.classList.add("print-all-reports-mode");
        renderAll();
        showToast("Menyiapkan cetak seluruh Laporan Keuangan (PHU, LPE, Neraca & Arus Kas)...");
        setTimeout(() => {
          window.print();
          setTimeout(() => {
            document.body.classList.remove("print-all-reports-mode");
          }, 500);
        }, 250);
      }

      document.getElementById("btnExportExcel").addEventListener("click", exportToExcelWorkbook);
      document.getElementById("btnPrintReport").addEventListener("click", () => window.print());
      document.getElementById("btnPrintAllFinancialReports")?.addEventListener("click", printAllFinancialReportsAtOnce);
      document.getElementById("btnPrintAllReportsInTab")?.addEventListener("click", printAllFinancialReportsAtOnce);

      // ==================== TUTUP BUKU AKHIR TAHUN KE COA LABA DITAHAN (3.4.2.01) - POIN 7 ====================
      document.getElementById("btnCloseBookToRetainedEarnings")?.addEventListener("click", () => {
        const yr = activeBookYear === "ALL" ? "2026" : activeBookYear;
        const ej = enrichJournals();
        const plBalances = {};

        state.coa.forEach(acc => {
          if (["4", "5", "6", "9"].includes(acc.lvl1)) {
            let netD = 0;
            let netK = 0;
            const ib = Number(acc.initBalance) || 0;
            if (ib > 0) {
              if (acc.normal === "Debit") netD += ib;
              else netK += ib;
            }
            ej.forEach(j => {
              if (j.account === acc.full || j.code === acc.code) {
                netD += j.debit;
                netK += j.kredit;
              }
            });
            const diff = Math.round(netD - netK);
            if (diff !== 0) {
              plBalances[acc.full] = { acc, netD, netK, diff };
            }
          }
        });

        const keys = Object.keys(plBalances);
        if (keys.length === 0) {
          showToast(`Seluruh akun Laba Rugi (Pendapatan & Beban) pada Tahun Buku ${yr} sudah bersaldo Rp 0 (sudah ditutup).`, "error");
          return;
        }

        const unclosedSHU = computeCurrentYearUnclosedSHU();
        const nextYr = String(parseInt(yr, 10) + 1);
        openConfirmModal(
          `Tutup Buku Tahun ${yr} ke COA 3.4.2.01 Laba Ditahan`,
          `Sistem akan membuat Jurnal Penutup Akhir Tahun (${yr}-12-31) untuk menutup ${keys.length} akun Pendapatan & Beban dan memindahkan SHU Bersih sebesar ${fmtRp(unclosedSHU)} ke akun "3.4.2.01 Laba Ditahan" agar siap menjadi saldo awal Tahun Anggaran ${nextYr}. Lanjutkan?`,
          () => {
            ensureRetainedEarningsAccountInCoa();
            const closeDate = `${yr}-12-31`;
            const closeDocNo = generateNextTransactionDocNo(closeDate, "TUTUP-BUKU");
            const officer = getDefaultActiveOfficerValue();
            const ts = Date.now() + "-" + crypto.randomUUID().slice(0,8);
            let totalCloseDebit = 0;
            let totalCloseKredit = 0;
            const closingLines = [];

            keys.forEach((k, idx) => {
              const item = plBalances[k];
              // Untuk menihilkan akun: jika netD > netK (saldo debit), maka di-kredit; jika netK > netD (saldo kredit), maka di-debit
              const dVal = item.diff < 0 ? Math.abs(item.diff) : 0;
              const kVal = item.diff > 0 ? Math.abs(item.diff) : 0;
              totalCloseDebit += dVal;
              totalCloseKredit += kVal;
              closingLines.push({
                id: `J-CLOSE-${ts}-${idx}`,
                date: closeDate,
                docNo: closeDocNo,
                account: item.acc.full,
                officerName: officer,
                memberCode: "",
                memberName: "",
                itemName: "",
                qty: 0,
                debit: dVal,
                kredit: kVal,
                desc: `Jurnal Penutup Laba Rugi Tahun ${yr} ke Laba Ditahan`,
                cashflow: "",
                isClosingEntry: true
              });
            });

            const netDiff = Math.round(totalCloseDebit - totalCloseKredit);
            const reAccObj = getAccountObj("3.4.2.01");
            const reAccFull = reAccObj ? reAccObj.full : "3.4.2.01 Laba Ditahan (Retained Earnings)";
            if (netDiff !== 0) {
              closingLines.push({
                id: `J-CLOSE-${ts}-RE`,
                date: closeDate,
                docNo: closeDocNo,
                account: reAccFull,
                officerName: officer,
                memberCode: "",
                memberName: "",
                itemName: "",
                qty: 0,
                debit: netDiff < 0 ? Math.abs(netDiff) : 0,
                kredit: netDiff > 0 ? Math.abs(netDiff) : 0,
                desc: `Penutupan SHU Bersih Tahun ${yr} ke Laba Ditahan untuk Tahun Anggaran ${nextYr}`,
                cashflow: "",
                isClosingEntry: true
              });
            }

            state.journals.push(...closingLines);
            if (!Array.isArray(state.customYears)) state.customYears = [];
            if (!state.customYears.includes(nextYr)) state.customYears.push(nextYr);
            saveState();
            renderAll();
            showToast(`Jurnal Penutup (${closeDocNo}) berhasil dibuat! Saldo Laba Rugi ${fmtRp(unclosedSHU)} telah ditutup ke akun 3.4.2.01 Laba Ditahan.`);
          }
        );
      });

      // ==================== DATABASE KARYAWAN HANDLERS ====================
      const closeEmployeeModal = () => {
        const m = document.getElementById("modalEmployeeMaster");
        m.classList.add("hidden");
        m.classList.remove("flex");
      };
      document.getElementById("btnCloseEmployeeModal").addEventListener("click", closeEmployeeModal);
      document.getElementById("btnCancelEmployeeModal").addEventListener("click", closeEmployeeModal);

      document.getElementById("btnOpenAddEmployeeModal").addEventListener("click", () => {
        if (!isCurrentOperatorAdminUsaha()) {
          showToast("Hanya Admin Utama Usaha yang dapat menambah database karyawan.", "error");
          return;
        }
        document.getElementById("empEditMode").value = "ADD";
        document.getElementById("empOrigId").value = "";
        document.getElementById("modalEmployeeTitle").textContent = "Tambah Database Karyawan & Otoritas Login";
        const nextNum = (state.employees || []).length + 1;
        document.getElementById("empIdInput").value = `KAR-${pad3(nextNum)}`;
        document.getElementById("empPasswordInput").value = "";
        document.getElementById("empPasswordInput").required = true;
        document.getElementById("empNameInput").value = "";
        document.getElementById("empPositionInput").value = "Staf Operasional";
        document.getElementById("empDeptInput").value = "Unit Usaha Koperasi";
        document.getElementById("empPhoneInput").value = "";
        document.getElementById("empAddressInput").value = "";
        document.getElementById("empSalaryInput").value = 0;
        document.getElementById("empAllowanceInput").value = 0;
        const m = document.getElementById("modalEmployeeMaster");
        m.classList.remove("hidden");
        m.classList.add("flex");
      });

      document.getElementById("employeeMasterForm").addEventListener("submit", async e => { e.preventDefault(); if(!isCurrentOperatorAdminUsaha())return;
    const get=id=>document.getElementById(id).value;
    const mode=get('empEditMode'), orig=get('empOrigId'), id=get('empIdInput').trim().toUpperCase(), password=get('empPasswordInput');
    const existing=(state.employees||[]).find(x=>x.id===orig);
    if((mode!=='EDIT'||id!==orig||password)&&password.length<12) return showToast('Kata sandi karyawan minimal 12 karakter.','error');
    if(state.employees.some(x=>x.id===id&&x!==existing))return showToast('ID karyawan sudah digunakan.','error');
    const employee={...(existing||{}),id,name:get('empNameInput').trim(),position:get('empPositionInput').trim(),department:get('empDeptInput').trim(),phone:get('empPhoneInput').trim(),address:get('empAddressInput').trim(),baseSalary:parseNominal(get('empSalaryInput')),allowance:parseNominal(get('empAllowanceInput'))};
    if(password)employee.newPassword=password;
    if(existing)state.employees[state.employees.indexOf(existing)]=employee;else state.employees.push(employee);
    document.getElementById('empPasswordInput').value='';saveState();closeEmployeeModal();renderAll();await flushCloudChanges();
    if(!cloud.dirty)showToast('Data karyawan tersimpan; password hanya disimpan sebagai hash di server.');
  });

      document.getElementById("employeeTableBody").addEventListener("click", (e) => {
        const btn = e.target.closest(".emp-action-btn");
        if (!btn || !isCurrentOperatorAdminUsaha()) return;
        const id = btn.getAttribute("data-id");
        const act = btn.getAttribute("data-emp-action");
        const emp = (state.employees || []).find(x => x.id === id);
        if (!emp) return;

        if (act === "edit") {
          document.getElementById("empEditMode").value = "EDIT";
          document.getElementById("empOrigId").value = emp.id;
          document.getElementById("modalEmployeeTitle").textContent = `Edit Data Karyawan (${emp.id})`;
          document.getElementById("empIdInput").value = emp.id;
          document.getElementById("empPasswordInput").value = "";
          document.getElementById("empPasswordInput").required = false;
          document.getElementById("empNameInput").value = emp.name;
          document.getElementById("empPositionInput").value = emp.position || "";
          document.getElementById("empDeptInput").value = emp.department || "";
          document.getElementById("empPhoneInput").value = emp.phone || "";
          document.getElementById("empAddressInput").value = emp.address || "";
          document.getElementById("empSalaryInput").value = fmtNominalInput(emp.baseSalary || 0);
          document.getElementById("empAllowanceInput").value = fmtNominalInput(emp.allowance || 0);
          const m = document.getElementById("modalEmployeeMaster");
          m.classList.remove("hidden");
          m.classList.add("flex");
        } else if (act === "delete") {
          openConfirmModal(
            "Hapus Data Karyawan",
            `Apakah Anda yakin ingin menghapus karyawan "${emp.name}" (${emp.id}) beserta hak akses loginnya?`,
            () => {
              state.employees = state.employees.filter(x => x.id !== id);
              saveState();
              renderAll();
              showToast(`Karyawan "${emp.name}" (${emp.id}) berhasil dihapus.`);
            }
          );
        }
      });

      // ==================== DATA SUPPLIER HANDLERS (FORMAT KODE: URUT/SUP/NAMAUSAHA/TAHUN - POIN 4 GAMBAR 5) ====================
      const closeSupplierModal = () => {
        const m = document.getElementById("modalSupplierMaster");
        m.classList.add("hidden");
        m.classList.remove("flex");
      };
      document.getElementById("btnCloseSupplierModal").addEventListener("click", closeSupplierModal);
      document.getElementById("btnCancelSupplierModal").addEventListener("click", closeSupplierModal);

      document.getElementById("supTransDate")?.addEventListener("change", (e) => {
        const yr = (e.target.value || "2026-01-10").substring(0, 4);
        const nextSupCode = generateNextSupplierCode(yr);
        document.getElementById("supCodeInput").value = nextSupCode;
        document.getElementById("supDocNoInput").value = nextSupCode;
      });

      document.getElementById("supItemCodeSelect")?.addEventListener("change", (e) => {
        const wrap = document.getElementById("supNewItemFields");
        if (wrap) wrap.classList.toggle("hidden", e.target.value !== "__NEW_SUP_ITEM__");
      });

      document.getElementById("btnOpenAddSupplierModal").addEventListener("click", () => {
        populateAllCoaLinkedDropdowns();
        populateItemDropdowns(computeInventorySummary());
        document.getElementById("supEditMode").value = "ADD";
        document.getElementById("supOrigId").value = "";
        document.getElementById("modalSupplierTitle").textContent = "Input Data Supplier & Pembelian Barang (Otomatis Jadi HPP & Link Stok)";
        const yr = activeBookYear !== "ALL" ? activeBookYear : "2026";
        const nextSupCode = generateNextSupplierCode(yr);
        document.getElementById("supCodeInput").value = nextSupCode;
        document.getElementById("supNameInput").value = "";
        document.getElementById("supAddressInput").value = "";
        document.getElementById("supPhoneInput").value = "";
        document.getElementById("supQtyInput").value = 0;
        document.getElementById("supCostInput").value = 0;
        const nextBrgNum = (state.items || []).length + 1;
        if (document.getElementById("supNewItemCode")) document.getElementById("supNewItemCode").value = `BRG-${pad3(nextBrgNum)}`;
        if (document.getElementById("supNewItemName")) document.getElementById("supNewItemName").value = "";
        if (document.getElementById("supNewItemUnit")) document.getElementById("supNewItemUnit").value = "Pcs";
        const supItemSel = document.getElementById("supItemCodeSelect");
        const supNewWrap = document.getElementById("supNewItemFields");
        if (supItemSel && supNewWrap) {
          supNewWrap.classList.toggle("hidden", supItemSel.value !== "__NEW_SUP_ITEM__");
        }
        document.getElementById("supAutoJournalCheck").checked = true;
        document.getElementById("supAutoJournalWrap").classList.remove("hidden");
        document.getElementById("supTransDate").value = `${yr}-01-10`;
        document.getElementById("supDocNoInput").value = nextSupCode;
        const m = document.getElementById("modalSupplierMaster");
        m.classList.remove("hidden");
        m.classList.add("flex");
      });

      document.getElementById("supplierMasterForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const mode = document.getElementById("supEditMode").value;
        const origId = document.getElementById("supOrigId").value;
        const date = document.getElementById("supTransDate").value || `${activeBookYear !== "ALL" ? activeBookYear : "2026"}-01-10`;
        let code = document.getElementById("supCodeInput").value.trim().toUpperCase();
        const name = document.getElementById("supNameInput").value.trim();
        const address = document.getElementById("supAddressInput").value.trim();
        const phone = document.getElementById("supPhoneInput").value.trim();
        let itemCode = document.getElementById("supItemCodeSelect").value;
        const qtyBought = Number(document.getElementById("supQtyInput").value || 0);
        const buyPrice = parseNominal(document.getElementById("supCostInput").value || 0);
        const autoJournal = document.getElementById("supAutoJournalCheck").checked;
        let docNo = document.getElementById("supDocNoInput").value.trim().toUpperCase() || code;
        const payAcc = document.getElementById("supPayAccSelect").value;

        if (itemCode === "__NEW_SUP_ITEM__") {
          const newICode = (document.getElementById("supNewItemCode")?.value || "").trim().toUpperCase() || `BRG-${pad3((state.items || []).length + 1)}`;
          const newIName = (document.getElementById("supNewItemName")?.value || "").trim();
          const newIUnit = (document.getElementById("supNewItemUnit")?.value || "Pcs").trim();
          if (!newIName) {
            showToast("Masukkan Nama Barang Baru yang dibeli dari supplier ini.", "error");
            return;
          }
          const defaultInvCoa = resolveCoaFull("1.1.4.01", "1.1.4.01 Persediaan Barang Dagangan");
          state.items.push({
            code: newICode,
            name: newIName,
            unit: newIUnit,
            account: defaultInvCoa,
            initQty: 0,
            minQty: 0,
            cost: buyPrice,
            price: buyPrice,
            supplierCode: code
          });
          itemCode = newICode;
        }

        const itemObj = state.items.find(i => i.code === itemCode);
        const itemName = itemObj ? itemObj.name : "";

        if (!Array.isArray(state.suppliers)) state.suppliers = [];

        if (mode === "ADD" && autoJournal && qtyBought > 0) {
          docNo = autoIncrementDuplicateDocNo(docNo, date, "SUP");
          code = docNo;
        }

        // Update HPP (cost) dan supplierCode pada Master Barang secara otomatis
        if (itemObj) {
          itemObj.supplierCode = code;
          if (buyPrice > 0) {
            itemObj.cost = buyPrice;
          }
        }

        if (mode === "EDIT") {
          const idx = state.suppliers.findIndex(s => s.id === origId);
          if (idx > -1) {
            state.suppliers[idx] = {
              ...state.suppliers[idx],
              code, name, address, phone, itemCode, itemName, qtyBought, buyPrice
            };
          }
          showToast(`Data Supplier "${name}" (${code}) & HPP barang "${itemName}" berhasil diperbarui.`);
        } else {
          const newSupId = `SUP-REC-${Date.now()}`;
          state.suppliers.push({
            id: newSupId,
            code,
            name,
            address,
            phone,
            itemCode,
            itemName,
            qtyBought,
            buyPrice,
            date: qtyBought > 0 ? date : "-",
            docNo: qtyBought > 0 && autoJournal ? docNo : code
          });

          if (autoJournal && qtyBought > 0 && itemObj) {
            const totalBeli = qtyBought * buyPrice;
            const ts = Date.now() + "-" + crypto.randomUUID().slice(0,8);
            const officer = getDefaultActiveOfficerValue();
            const isCash = payAcc.startsWith("1.1.1");
            state.journals.push(
              {
                id: `J-${ts}-1`,
                date,
                docNo,
                account: itemObj.account,
                officerName: officer,
                itemName: itemObj.name,
                qty: qtyBought,
                debit: totalBeli,
                kredit: 0,
                desc: `Pembelian dari Supplier ${code} (${name}) - ${qtyBought} ${itemObj.unit} ${itemObj.name} @ ${fmtRp(buyPrice)}`,
                cashflow: ""
              },
              {
                id: `J-${ts}-2`,
                date,
                docNo,
                account: payAcc,
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: totalBeli,
                desc: `Pembayaran Pembelian ke Supplier ${code} (${name})`,
                cashflow: isCash ? "Pembelian Harga Pokok Barang" : ""
              }
            );
          }
          showToast(`Data Supplier "${name}" (${code}) berhasil disimpan, Stok Masuk (+${qtyBought}) & HPP "${itemName}" otomatis diupdate.`);
        }

        saveState();
        closeSupplierModal();
        renderAll();
      });

      document.getElementById("supplierTableBody").addEventListener("click", (e) => {
        const btn = e.target.closest(".sup-action-btn");
        if (!btn) return;
        const act = btn.getAttribute("data-sup-action");
        if (act === "detail") {
          const sc = btn.getAttribute("data-code");
          const ic = btn.getAttribute("data-item");
          openSupplierDetailModal(ic, sc);
          return;
        }
        const id = btn.getAttribute("data-id");
        const sup = (state.suppliers || []).find(s => s.id === id);
        if (!sup) return;

        if (act === "edit") {
          document.getElementById("supEditMode").value = "EDIT";
          document.getElementById("supOrigId").value = sup.id;
          document.getElementById("modalSupplierTitle").textContent = `Edit Data Supplier (${sup.code})`;
          document.getElementById("supCodeInput").value = sup.code;
          document.getElementById("supNameInput").value = sup.name;
          document.getElementById("supAddressInput").value = sup.address || "";
          document.getElementById("supPhoneInput").value = sup.phone || "";
          document.getElementById("supItemCodeSelect").value = sup.itemCode || "";
          document.getElementById("supQtyInput").value = sup.qtyBought || 0;
          document.getElementById("supCostInput").value = fmtNominalInput(sup.buyPrice || 0);
          document.getElementById("supAutoJournalWrap").classList.add("hidden");
          const m = document.getElementById("modalSupplierMaster");
          m.classList.remove("hidden");
          m.classList.add("flex");
        } else if (act === "delete") {
          openConfirmModal(
            "Hapus Data Supplier",
            `Apakah Anda yakin ingin menghapus data supplier "${sup.name}" (${sup.code})?`,
            () => {
              state.suppliers = state.suppliers.filter(s => s.id !== id);
              saveState();
              renderAll();
              showToast(`Data supplier "${sup.name}" (${sup.code}) berhasil dihapus.`);
            }
          );
        }
      });

      const closeSupplierDetail = () => {
        const m = document.getElementById("modalSupplierDetail");
        m.classList.add("hidden");
        m.classList.remove("flex");
      };
      document.getElementById("btnCloseSupplierDetail").addEventListener("click", closeSupplierDetail);
      document.getElementById("btnJumpToSupplierTab").addEventListener("click", () => {
        closeSupplierDetail();
        document.querySelector('.tab-btn[data-tab="supplier"]')?.click();
      });

      // ==================== DATABASE ANGGOTA & SIMPAN PINJAM HANDLERS ====================
      function openAddMemberModal() {
        document.getElementById("mmEditMode").value = "ADD";
        document.getElementById("mmOrigCode").value = "";
        document.getElementById("modalMemberTitle").textContent = "Tambah Anggota Koperasi Baru";
        const nextNum = (state.members || []).length + 1;
        document.getElementById("mmCode").value = `ANG-${pad3(nextNum)}`;
        document.getElementById("mmName").value = "";
        document.getElementById("mmNik").value = "";
        document.getElementById("mmGender").value = "L";
        document.getElementById("mmAddress").value = "";
        document.getElementById("mmVillage").value = "Banyurojo";
        document.getElementById("mmRt").value = "001";
        document.getElementById("mmRw").value = "001";
        const joinDt = activeBookYear !== "ALL" ? `${activeBookYear}-01-01` : "2026-01-01";
        document.getElementById("mmJoinDate").value = joinDt;
        document.getElementById("mmInitPokok").value = 0;
        document.getElementById("mmInitWajib").value = 0;
        document.getElementById("mmInitDocNo").value = generateNextTransactionDocNo(joinDt, "SP");
        document.getElementById("mmInitialDepositSection").classList.remove("hidden");
        const m = document.getElementById("modalMemberMaster");
        m.classList.remove("hidden");
        m.classList.add("flex");
      }

      document.getElementById("btnOpenAddMemberModal").addEventListener("click", openAddMemberModal);
      const closeMemberModal = () => {
        const m = document.getElementById("modalMemberMaster");
        m.classList.add("hidden");
        m.classList.remove("flex");
      };
      document.getElementById("btnCloseMemberModal").addEventListener("click", closeMemberModal);
      document.getElementById("btnCancelMemberModal").addEventListener("click", closeMemberModal);

      document.getElementById("memberMasterForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const mode = document.getElementById("mmEditMode").value;
        const origCode = document.getElementById("mmOrigCode").value;
        const code = document.getElementById("mmCode").value.trim();
        const name = document.getElementById("mmName").value.trim();
        const nik = document.getElementById("mmNik").value.trim();
        const gender = document.getElementById("mmGender").value;
        const address = document.getElementById("mmAddress").value.trim();
        const village = document.getElementById("mmVillage").value.trim();
        const rt = document.getElementById("mmRt").value.trim();
        const rw = document.getElementById("mmRw").value.trim();
        const joinDate = document.getElementById("mmJoinDate").value;

        if (!Array.isArray(state.members)) state.members = [];

        if (mode === "EDIT") {
          const idx = state.members.findIndex(m => m.code === origCode);
          if (idx > -1) {
            if (state.members.some((m, k) => k !== idx && m.code.toLowerCase() === code.toLowerCase())) {
              showToast("Kode Anggota tersebut sudah digunakan anggota lain.", "error");
              return;
            }
            const oldCode = state.members[idx].code;
            state.members[idx] = {
              ...state.members[idx],
              code, name, nik, gender, address, village, rt, rw, joinDate
            };
            state.journals.forEach(j => {
              if (j.memberCode === oldCode) {
                j.memberCode = code;
                j.memberName = name;
              }
            });
            showToast(`Data anggota "${name}" (${code}) berhasil diperbarui.`);
          }
        } else {
          if (state.members.some(m => m.code.toLowerCase() === code.toLowerCase())) {
            showToast("Kode Anggota sudah terdaftar.", "error");
            return;
          }
          const initPokok = parseNominal(document.getElementById("mmInitPokok").value || 0);
          const initWajib = parseNominal(document.getElementById("mmInitWajib").value || 0);
          const rawDocNo = document.getElementById("mmInitDocNo").value.trim();
          const initDocNo = autoIncrementDuplicateDocNo(rawDocNo, joinDate, "SP");
          const cashAcc = document.getElementById("mmInitCashAcc").value;

          state.members.push({
            code, name, nik, gender, address, village, rt, rw, joinDate,
            initPokok: 0, initWajib: 0, initSukarela: 0, initPinjaman: 0
          });

          const totalInit = initPokok + initWajib;
          if (totalInit > 0) {
            const ts = Date.now() + "-" + crypto.randomUUID().slice(0,8);
            const officer = getDefaultActiveOfficerValue();
            state.journals.push({
              id: `J-${ts}-1`,
              date: joinDate,
              docNo: initDocNo,
              account: cashAcc,
              officerName: officer,
              memberCode: code,
              memberName: name,
              itemName: "",
              qty: 0,
              debit: totalInit,
              kredit: 0,
              desc: `Setoran Simpanan Awal Anggota Baru: ${name}`,
              cashflow: "Simpanan Anggota"
            });
            if (initPokok > 0) {
              state.journals.push({
                id: `J-${ts}-2`,
                date: joinDate,
                docNo: initDocNo,
                account: resolveCoaFull("3.1.1.01", "3.1.1.01 Simpanan Pokok"),
                officerName: officer,
                memberCode: code,
                memberName: name,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: initPokok,
                desc: `Setoran Simpanan Pokok ${name}`,
                cashflow: ""
              });
            }
            if (initWajib > 0) {
              state.journals.push({
                id: `J-${ts}-3`,
                date: joinDate,
                docNo: initDocNo,
                account: resolveCoaFull("3.1.2.01", "3.1.2.01 Simpanan Wajib"),
                officerName: officer,
                memberCode: code,
                memberName: name,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: initWajib,
                desc: `Setoran Simpanan Wajib ${name}`,
                cashflow: ""
              });
            }
          }
          showToast(`Anggota baru "${name}" (${code}) berhasil ditambahkan.`);
        }

        saveState();
        closeMemberModal();
        initJournalFormLines();
        renderAll();
      });

      document.getElementById("memberTableBody").addEventListener("click", (e) => {
        const btn = e.target.closest(".mem-action-btn");
        if (!btn) return;
        const code = btn.getAttribute("data-code");
        const act = btn.getAttribute("data-mem-action");
        const mem = (state.members || []).find(m => m.code === code);
        if (!mem) return;

        if (act === "card") {
          openMemberCardModal(code);
        } else if (act === "sp") {
          openSimpanPinjamModal(code);
        } else if (act === "edit") {
          document.getElementById("mmEditMode").value = "EDIT";
          document.getElementById("mmOrigCode").value = mem.code;
          document.getElementById("modalMemberTitle").textContent = `Edit Data Anggota (${mem.code})`;
          document.getElementById("mmCode").value = mem.code;
          document.getElementById("mmName").value = mem.name;
          document.getElementById("mmNik").value = mem.nik || "";
          document.getElementById("mmGender").value = mem.gender || "L";
          document.getElementById("mmAddress").value = mem.address || "";
          document.getElementById("mmVillage").value = mem.village || "";
          document.getElementById("mmRt").value = mem.rt || "";
          document.getElementById("mmRw").value = mem.rw || "";
          document.getElementById("mmJoinDate").value = mem.joinDate || "2026-01-01";
          document.getElementById("mmInitialDepositSection").classList.add("hidden");
          const m = document.getElementById("modalMemberMaster");
          m.classList.remove("hidden");
          m.classList.add("flex");
        } else if (act === "delete") {
          openConfirmModal(
            "Hapus Anggota Koperasi",
            `Apakah Anda yakin ingin menghapus anggota "${mem.name}" (${mem.code}) dari Database Anggota?`,
            () => {
              state.members = state.members.filter(m => m.code !== code);
              saveState();
              initJournalFormLines();
              renderAll();
              showToast(`Anggota "${mem.name}" (${mem.code}) berhasil dihapus.`);
            }
          );
        }
      });

      document.getElementById("btnCloseMemberCard").addEventListener("click", () => {
        const m = document.getElementById("modalMemberCard");
        m.classList.add("hidden");
        m.classList.remove("flex");
      });

      // Wizard Simpan Pinjam, Pinjaman & Hibah Modal
      function openSimpanPinjamModal(defaultMemberCode = null) {
        populateAllCoaLinkedDropdowns();
        populateMemberDropdowns(computeMembersSummary());
        const m = document.getElementById("modalSimpanPinjam");
        m.classList.remove("hidden");
        m.classList.add("flex");
        if (defaultMemberCode) {
          document.getElementById("spMemberCode").value = defaultMemberCode;
        }
        const nextMemNum = (state.members || []).length + 1;
        if (document.getElementById("spNewMemCode")) document.getElementById("spNewMemCode").value = `ANG-${pad3(nextMemNum)}`;
        if (document.getElementById("spNewMemName")) document.getElementById("spNewMemName").value = "";
        const spDateVal = document.getElementById("spDate").value || `${activeBookYear !== "ALL" ? activeBookYear : "2026"}-01-15`;
        document.getElementById("spDocNo").value = generateNextTransactionDocNo(spDateVal, "USP");
        document.getElementById("spDocNoWarning").classList.add("hidden");
        syncSimpanPinjamDefaults(true);
      }

      function syncSimpanPinjamDefaults(resetTargetCoa = false) {
        const type = document.getElementById("spType").value;
        if (resetTargetCoa) {
          const targetSel = document.getElementById("spTargetCoaAccount");
          if (targetSel) targetSel.value = "";
          const intSel = document.getElementById("spInterestCoaAccount");
          if (intSel) intSel.value = "";
          populateSimpanPinjamTargetCoaByType(type);
        }
        const mCode = document.getElementById("spMemberCode").value;
        const mem = mCode === "__NEW_MEMBER__"
          ? { name: document.getElementById("spNewMemName")?.value || "Anggota Baru" }
          : ((state.members || []).find(m => m.code === mCode) || (state.members || [])[0]);
        const descEl = document.getElementById("spDesc");
        const targetAcc = document.getElementById("spTargetCoaAccount")?.value || "";
        if (descEl) {
          const memLbl = mem ? mem.name : "Anggota";
          const labels = {
            SETOR_POKOK: `Setoran Simpanan Pokok Anggota - ${memLbl}`,
            SETOR_WAJIB: `Setoran Simpanan Wajib Anggota - ${memLbl}`,
            SETOR_SUKARELA: `Setoran Simpanan Sukarela Anggota - ${memLbl}`,
            TARIK_SUKARELA: `Penarikan Simpanan Sukarela Anggota - ${memLbl}`,
            CAIR_PINJAMAN: `Pencairan Pinjaman Anggota - ${memLbl}`,
            ANGSURAN_PINJAMAN: `Angsuran Pinjaman & Jasa Anggota - ${memLbl}`,
            TERIMA_HIBAH: `Penerimaan Dana Hibah Koperasi (${targetAcc})`,
            GUNAKAN_HIBAH: `Penyaluran / Penyesuaian Dana Hibah (${targetAcc})`,
            TAMBAH_CADANGAN: `Penambahan Dana Cadangan Koperasi (${targetAcc})`,
            TERIMA_PINJAMAN_BANK: `Penerimaan Pinjaman Eksternal / Bank (${targetAcc})`,
            BAYAR_PINJAMAN_BANK: `Pembayaran Angsuran Pokok & Bunga Pinjaman (${targetAcc})`
          };
          descEl.value = labels[type] || `Transaksi Koperasi`;
        }
        updateSimpanPinjamPreview();
      }

      document.getElementById("btnOpenSimpanPinjamWizard").addEventListener("click", () => openSimpanPinjamModal());
      document.getElementById("btnOpenSimpanPinjamWizard2").addEventListener("click", () => openSimpanPinjamModal());
      document.getElementById("btnOpenSimpanPinjamFromJurnal").addEventListener("click", () => openSimpanPinjamModal());

      const closeSimpanPinjam = () => {
        const m = document.getElementById("modalSimpanPinjam");
        m.classList.add("hidden");
        m.classList.remove("flex");
      };
      document.getElementById("btnCloseSimpanPinjam").addEventListener("click", closeSimpanPinjam);
      document.getElementById("btnCancelSimpanPinjam").addEventListener("click", closeSimpanPinjam);

      document.getElementById("spType").addEventListener("change", () => syncSimpanPinjamDefaults(true));
      document.getElementById("spMemberCode").addEventListener("change", () => syncSimpanPinjamDefaults(false));
      document.getElementById("spNewMemName")?.addEventListener("input", () => syncSimpanPinjamDefaults(false));
      document.getElementById("spAmount").addEventListener("input", updateSimpanPinjamPreview);
      document.getElementById("spInterest").addEventListener("input", updateSimpanPinjamPreview);
      document.getElementById("spCashAccount").addEventListener("change", updateSimpanPinjamPreview);
      document.getElementById("spTargetCoaAccount")?.addEventListener("change", () => syncSimpanPinjamDefaults(false));
      document.getElementById("spInterestCoaAccount")?.addEventListener("change", updateSimpanPinjamPreview);

      document.getElementById("simpanPinjamForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const type = document.getElementById("spType").value;
        const date = document.getElementById("spDate").value;
        const rawDocNo = document.getElementById("spDocNo").value.trim();
        const docNo = autoIncrementDuplicateDocNo(rawDocNo, date, "USP");
        let mCode = document.getElementById("spMemberCode").value;
        const amount = parseNominal(document.getElementById("spAmount").value || 0);
        const interest = parseNominal(document.getElementById("spInterest").value || 0);
        const cashAcc = document.getElementById("spCashAccount").value || resolveCoaFull("1.1.1.01", "1.1.1.01 Kas Tunai");
        const targetAcc = document.getElementById("spTargetCoaAccount")?.value || resolveCoaFull("3.1.1.01", "3.1.1.01 Simpanan Pokok");
        const intAcc = document.getElementById("spInterestCoaAccount")?.value || resolveCoaFull("4.1.3.02", "4.1.3.02 Pendapatan Jasa Pinjaman (Anggota)");
        const desc = document.getElementById("spDesc").value.trim();

        if (amount <= 0) {
          showToast("Masukkan nominal transaksi lebih dari Rp 0.", "error");
          return;
        }

        const needsMember = isMemberRequiredForSpType(type);
        let mem = null;
        if (needsMember) {
          if (mCode === "__NEW_MEMBER__") {
            const newMCode = (document.getElementById("spNewMemCode")?.value || "").trim().toUpperCase() || `ANG-${pad3((state.members || []).length + 1)}`;
            const newMName = (document.getElementById("spNewMemName")?.value || "").trim();
            if (!newMName) {
              showToast("Masukkan Nama Lengkap Anggota Baru terlebih dahulu.", "error");
              return;
            }
            if (!Array.isArray(state.members)) state.members = [];
            state.members.push({
              code: newMCode,
              name: newMName,
              nik: "",
              gender: "L",
              address: "",
              village: "",
              rt: "001",
              rw: "001",
              joinDate: date,
              initPokok: 0,
              initWajib: 0,
              initSukarela: 0,
              initPinjaman: 0
            });
            mCode = newMCode;
          }
          const memSummary = computeMembersSummary();
          mem = memSummary.find(m => m.code === mCode);
          if (!mem) {
            showToast("Pilih anggota koperasi atau tambahkan anggota baru terlebih dahulu.", "error");
            return;
          }
          if (type === "TARIK_SUKARELA" && amount > mem.sukarela) {
            showToast(`Saldo Simpanan Sukarela ${mem.name} tidak mencukupi (Tersedia: ${fmtRp(mem.sukarela)}).`, "error");
            return;
          }
        }

        const ts = Date.now() + "-" + crypto.randomUUID().slice(0,8);
        const officer = getDefaultActiveOfficerValue();
        const memCodeVal = mem ? mem.code : "";
        const memNameVal = mem ? mem.name : "";

        if (type === "SETOR_POKOK" || type === "SETOR_WAJIB" || type === "SETOR_SUKARELA") {
          const cfTag = type === "SETOR_SUKARELA" ? "Simpanan Lainnya" : "Simpanan Anggota";
          state.journals.push(
            {
              id: `J-${ts}-1`,
              date,
              docNo,
              account: cashAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: amount,
              kredit: 0,
              desc,
              cashflow: cfTag
            },
            {
              id: `J-${ts}-2`,
              date,
              docNo,
              account: targetAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: 0,
              kredit: amount,
              desc,
              cashflow: ""
            }
          );
        } else if (type === "TARIK_SUKARELA") {
          state.journals.push(
            {
              id: `J-${ts}-1`,
              date,
              docNo,
              account: targetAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: amount,
              kredit: 0,
              desc,
              cashflow: ""
            },
            {
              id: `J-${ts}-2`,
              date,
              docNo,
              account: cashAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: 0,
              kredit: amount,
              desc,
              cashflow: "Simpanan Lainnya"
            }
          );
        } else if (type === "CAIR_PINJAMAN") {
          state.journals.push(
            {
              id: `J-${ts}-1`,
              date,
              docNo,
              account: targetAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: amount,
              kredit: 0,
              desc,
              cashflow: ""
            },
            {
              id: `J-${ts}-2`,
              date,
              docNo,
              account: cashAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: 0,
              kredit: amount,
              desc,
              cashflow: ""
            }
          );
        } else if (type === "ANGSURAN_PINJAMAN") {
          const totalIn = amount + interest;
          state.journals.push(
            {
              id: `J-${ts}-1`,
              date,
              docNo,
              account: cashAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: totalIn,
              kredit: 0,
              desc,
              cashflow: interest > 0 ? "Penerimaan Kas dari Pelayanan kepada Anggota" : ""
            },
            {
              id: `J-${ts}-2`,
              date,
              docNo,
              account: targetAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: 0,
              kredit: amount,
              desc: `Angsuran Pokok Pinjaman - ${memNameVal}`,
              cashflow: ""
            }
          );
          if (interest > 0) {
            state.journals.push({
              id: `J-${ts}-3`,
              date,
              docNo,
              account: intAcc,
              officerName: officer,
              memberCode: memCodeVal,
              memberName: memNameVal,
              itemName: "",
              qty: 0,
              debit: 0,
              kredit: interest,
              desc: `Jasa Pinjaman Anggota - ${memNameVal}`,
              cashflow: ""
            });
          }
        } else if (type === "TERIMA_HIBAH" || type === "TAMBAH_CADANGAN") {
          state.journals.push(
            {
              id: `J-${ts}-1`,
              date,
              docNo,
              account: cashAcc,
              officerName: officer,
              memberCode: "",
              memberName: "",
              itemName: "",
              qty: 0,
              debit: amount,
              kredit: 0,
              desc,
              cashflow: type === "TERIMA_HIBAH" ? "Hibah" : "Simpanan Lainnya"
            },
            {
              id: `J-${ts}-2`,
              date,
              docNo,
              account: targetAcc,
              officerName: officer,
              memberCode: "",
              memberName: "",
              itemName: "",
              qty: 0,
              debit: 0,
              kredit: amount,
              desc,
              cashflow: ""
            }
          );
        } else if (type === "GUNAKAN_HIBAH") {
          state.journals.push(
            {
              id: `J-${ts}-1`,
              date,
              docNo,
              account: targetAcc,
              officerName: officer,
              memberCode: "",
              memberName: "",
              itemName: "",
              qty: 0,
              debit: amount,
              kredit: 0,
              desc,
              cashflow: ""
            },
            {
              id: `J-${ts}-2`,
              date,
              docNo,
              account: cashAcc,
              officerName: officer,
              memberCode: "",
              memberName: "",
              itemName: "",
              qty: 0,
              debit: 0,
              kredit: amount,
              desc,
              cashflow: "Hibah"
            }
          );
        } else if (type === "TERIMA_PINJAMAN_BANK") {
          state.journals.push(
            {
              id: `J-${ts}-1`,
              date,
              docNo,
              account: cashAcc,
              officerName: officer,
              memberCode: "",
              memberName: "",
              itemName: "",
              qty: 0,
              debit: amount,
              kredit: 0,
              desc,
              cashflow: "Pinjaman Jangka Panjang"
            },
            {
              id: `J-${ts}-2`,
              date,
              docNo,
              account: targetAcc,
              officerName: officer,
              memberCode: "",
              memberName: "",
              itemName: "",
              qty: 0,
              debit: 0,
              kredit: amount,
              desc,
              cashflow: ""
            }
          );
        } else if (type === "BAYAR_PINJAMAN_BANK") {
          const totalOut = amount + interest;
          state.journals.push({
            id: `J-${ts}-1`,
            date,
            docNo,
            account: targetAcc,
            officerName: officer,
            memberCode: "",
            memberName: "",
            itemName: "",
            qty: 0,
            debit: amount,
            kredit: 0,
            desc: `Pembayaran Pokok Pinjaman (${targetAcc})`,
            cashflow: ""
          });
          if (interest > 0) {
            state.journals.push({
              id: `J-${ts}-2`,
              date,
              docNo,
              account: intAcc,
              officerName: officer,
              memberCode: "",
              memberName: "",
              itemName: "",
              qty: 0,
              debit: interest,
              kredit: 0,
              desc: `Pembayaran Bunga Pinjaman (${intAcc})`,
              cashflow: ""
            });
          }
          state.journals.push({
            id: `J-${ts}-3`,
            date,
            docNo,
            account: cashAcc,
            officerName: officer,
            memberCode: "",
            memberName: "",
            itemName: "",
            qty: 0,
            debit: 0,
            kredit: totalOut,
            desc,
            cashflow: "Pembayaran Utang Jangka Panjang"
          });
        }

        const transYear = date.substring(0, 4);
        if (activeBookYear !== "ALL" && transYear !== activeBookYear) {
          activeBookYear = transYear;
        }
        saveState();
        closeSimpanPinjam();
        syncAllTransactionDocNoInputs();
        renderAll();
        showToast(`Transaksi (${docNo}) berhasil dijurnal & terhubung otomatis ke COA (${targetAcc}).`);
      });

      // ==================== PENGATURAN AKUN, GANTI PASSWORD & ADMIN PANEL HANDLERS ====================
      document.getElementById("changePasswordForm").addEventListener("submit", async e => { e.preventDefault();
    const pass = document.getElementById('accNewPassword').value;
    if(pass !== document.getElementById('accConfirmPassword').value) return showToast('Konfirmasi kata sandi tidak cocok.','error');
    try {
      await flushCloudChanges(); if(cloud.dirty) throw new Error('Selesaikan sinkronisasi ruang kerja sebelum mengganti password.');
      await cloudRequest('profile_update',{oldPassword:document.getElementById('accOldPassword').value,newPassword:pass,fullName:document.getElementById('accSetFullName').value,coopName:document.getElementById('accSetCoopName').value});
      cloud.session=null; cloud.uid=null; currentUser=null; usersList=[]; cloud.cache.clear(); state=createFreshZeroState(null); renderAll(); showAuthModal();
      showToast('Profil diperbarui. Semua sesi akun ini dicabut; silakan login dengan kata sandi baru.');
    } catch(error) { showToast(error.message,'error'); }
  });

      document.getElementById("adminUsersTableBody").addEventListener("click", async e => {
    const button=e.target.closest('.admin-user-btn'); if(!button||!cloud.session?.user?.isAdmin)return;
    const user=usersList.find(u=>u.uid===button.dataset.uid); if(!user)return;
    const action=button.dataset.adminAct;
    try {
      if(action==='switch') { await openCloudWorkspace(user.uid,!user.isAdmin); return; }
      if(action==='resetpwd') openConfirmModal('Ganti Password Akun','Masukkan kata sandi baru minimal 12 karakter.',async()=>{
        try { await cloudRequest('account_reset',{uid:user.uid,password:document.getElementById('customYearInput').value}); showToast('Password diperbarui dan sesi lama dicabut.'); } catch(error) { showToast(error.message,'error'); }
      },true,'Kata sandi baru:','');
      if(action==='delete') openConfirmModal('Hapus Akun','Hapus akun '+user.username+' beserta data ruang kerjanya?',async()=>{
        try { await cloudRequest('account_delete',{uid:user.uid}); if(cloud.uid===user.uid) {cloud.dirty=false; await openCloudWorkspace(cloud.session.user.uid);} await restoreCloudSession(); showToast('Akun dan ruang kerja telah dihapus.'); } catch(error) { showToast(error.message,'error'); }
      });
    } catch(error) { showToast(error.message,'error'); }
  });

      // Inventory Table Delegation (Supplier Link, Kartu Stok, Edit, & Hapus)
      document.getElementById("inventoryTableBody").addEventListener("click", (e) => {
        const btn = e.target.closest(".inv-action-btn");
        if (!btn) return;
        const code = btn.getAttribute("data-code");
        const act = btn.getAttribute("data-action");
        if (act === "supplier-link") {
          const supCode = btn.getAttribute("data-sup");
          openSupplierDetailModal(code, supCode);
        } else if (act === "card") {
          openStockCardModal(code);
        } else if (act === "edit") {
          const it = state.items.find(i => i.code === code);
          if (!it) return;
          document.getElementById("imEditMode").value = "EDIT";
          document.getElementById("imOrigCode").value = it.code;
          document.getElementById("modalItemTitle").textContent = `Edit Barang Persediaan (${it.code})`;
          document.getElementById("imCode").value = it.code;
          document.getElementById("imCode").readOnly = false;
          document.getElementById("imName").value = it.name;
          document.getElementById("imUnit").value = it.unit;
          document.getElementById("imAccount").value = it.account;
          document.getElementById("imInitQty").value = it.initQty;
          document.getElementById("imMinQty").value = it.minQty;
          document.getElementById("imCost").value = fmtNominalInput(it.cost);
          document.getElementById("imPrice").value = fmtNominalInput(it.price);
          document.getElementById("imSupplierCode").value = it.supplierCode || generateNextSupplierCode();
          const m = document.getElementById("modalItemMaster");
          m.classList.remove("hidden");
          m.classList.add("flex");
        } else if (act === "delete") {
          const it = state.items.find(i => i.code === code);
          if (!it) return;
          openConfirmModal(
            "Hapus Barang Persediaan",
            `Apakah Anda yakin ingin menghapus barang "${it.name}" (${it.code}) dari daftar persediaan?`,
            () => {
              state.items = state.items.filter(i => i.code !== code);
              saveState();
              initJournalFormLines();
              renderAll();
              showToast(`Barang "${it.name}" (${it.code}) berhasil dihapus dari persediaan.`);
            }
          );
        }
      });

      // Close Stock Card Modal
      document.getElementById("btnCloseStockCard").addEventListener("click", () => {
        const m = document.getElementById("modalStockCard");
        m.classList.add("hidden");
        m.classList.remove("flex");
      });

      // Add/Edit Item Master Modal
      function openAddItemModal() {
        document.getElementById("imEditMode").value = "ADD";
        document.getElementById("imOrigCode").value = "";
        document.getElementById("modalItemTitle").textContent = "Tambah Master Barang Persediaan Baru";
        const nextNum = state.items.length + 1;
        document.getElementById("imCode").value = `BRG-${pad3(nextNum)}`;
        document.getElementById("imCode").readOnly = false;
        document.getElementById("imName").value = "";
        document.getElementById("imUnit").value = "Pcs";
        document.getElementById("imInitQty").value = 0;
        document.getElementById("imMinQty").value = 0;
        document.getElementById("imCost").value = 0;
        document.getElementById("imPrice").value = 0;
        document.getElementById("imSupplierCode").value = generateNextSupplierCode();
        const m = document.getElementById("modalItemMaster");
        m.classList.remove("hidden");
        m.classList.add("flex");
      }

      document.getElementById("btnOpenAddItemModal").addEventListener("click", openAddItemModal);
      const closeItemModal = () => {
        const m = document.getElementById("modalItemMaster");
        m.classList.add("hidden");
        m.classList.remove("flex");
      };
      document.getElementById("btnCloseItemModal").addEventListener("click", closeItemModal);
      document.getElementById("btnCancelItemModal").addEventListener("click", closeItemModal);

      document.getElementById("itemMasterForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const mode = document.getElementById("imEditMode").value;
        const origCode = document.getElementById("imOrigCode").value;
        const code = document.getElementById("imCode").value.trim();
        const name = document.getElementById("imName").value.trim();
        const unit = document.getElementById("imUnit").value.trim() || "Pcs";
        const account = document.getElementById("imAccount").value;
        const initQty = Number(document.getElementById("imInitQty").value || 0);
        const minQty = Number(document.getElementById("imMinQty").value || 0);
        const cost = parseNominal(document.getElementById("imCost").value || 0);
        const price = parseNominal(document.getElementById("imPrice").value || 0);
        const supplierCode = document.getElementById("imSupplierCode").value.trim().toUpperCase() || generateNextSupplierCode();

        if (mode === "EDIT") {
          const idx = state.items.findIndex(i => i.code === origCode);
          if (idx > -1) {
            if (state.items.some((i, k) => k !== idx && (i.code.toLowerCase() === code.toLowerCase() || i.name.toLowerCase() === name.toLowerCase()))) {
              showToast("Kode atau Nama Barang tersebut sudah dipakai oleh barang lain.", "error");
              return;
            }
            const oldName = state.items[idx].name;
            state.items[idx] = { code, name, unit, account, initQty, minQty, cost, price, supplierCode };
            if (oldName !== name) {
              state.journals.forEach(j => {
                if (j.itemName === oldName) j.itemName = name;
              });
            }
          }
          showToast(`Data barang "${name}" berhasil diperbarui.`);
        } else {
          if (state.items.some(i => i.code.toLowerCase() === code.toLowerCase() || i.name.toLowerCase() === name.toLowerCase())) {
            showToast("Kode atau Nama Barang sudah terdaftar.", "error");
            return;
          }
          state.items.push({ code, name, unit, account, initQty, minQty, cost, price, supplierCode });
          showToast(`Barang baru "${name}" berhasil ditambahkan ke Master Persediaan.`);
        }
        saveState();
        closeItemModal();
        initJournalFormLines();
        renderAll();
      });

      // ==================== COA EDIT (TERMASUK SALDO AWAL MANUAL) & DELETE DELEGATION ====================
      const closeCoaEditModal = () => {
        const m = document.getElementById("modalCoaEdit");
        m.classList.add("hidden");
        m.classList.remove("flex");
      };
      document.getElementById("btnCloseCoaEditModal").addEventListener("click", closeCoaEditModal);
      document.getElementById("btnCancelCoaEditModal").addEventListener("click", closeCoaEditModal);

      document.getElementById("coaTableBody").addEventListener("click", (e) => {
        const btn = e.target.closest(".coa-action-btn");
        if (!btn) return;
        const code = btn.getAttribute("data-code");
        const act = btn.getAttribute("data-coa-action");
        const acc = state.coa.find(a => a.code === code);
        if (!acc) return;

        if (act === "edit") {
          document.getElementById("editCoaOrigCode").value = acc.code;
          document.getElementById("editCoaCode").value = acc.code;
          document.getElementById("editCoaName").value = acc.name;
          document.getElementById("editCoaNormal").value = acc.normal;
          document.getElementById("editCoaInitBalance").value = fmtNominalInput(Number(acc.initBalance) || 0, true);
          const m = document.getElementById("modalCoaEdit");
          m.classList.remove("hidden");
          m.classList.add("flex");
        } else if (act === "delete") {
          openConfirmModal(
            "Hapus Akun COA",
            `Apakah Anda yakin ingin menghapus akun "${acc.full}" dari Daftar Akun (COA)?`,
            () => {
              state.coa = state.coa.filter(a => a.code !== code);
              saveState();
              initJournalFormLines();
              renderAll();
              showToast(`Akun "${acc.full}" berhasil dihapus dari COA.`);
            }
          );
        }
      });

      document.getElementById("editCoaForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const origCode = document.getElementById("editCoaOrigCode").value;
        const newCode = document.getElementById("editCoaCode").value.trim();
        const newName = document.getElementById("editCoaName").value.trim();
        const newNormal = document.getElementById("editCoaNormal").value;
        const newInitBalance = parseNominal(document.getElementById("editCoaInitBalance").value || 0);
        const newFull = `${newCode} ${newName}`;

        const idx = state.coa.findIndex(a => a.code === origCode);
        if (idx === -1) return;

        if (state.coa.some((a, k) => k !== idx && (a.code === newCode || a.full.toLowerCase() === newFull.toLowerCase()))) {
          showToast("Kode atau Nama Akun tersebut sudah digunakan akun lain.", "error");
          return;
        }

        const oldFull = state.coa[idx].full;
        state.coa[idx] = {
          ...state.coa[idx],
          code: newCode,
          name: newName,
          full: newFull,
          normal: newNormal,
          initBalance: newInitBalance,
          lvl1: newCode.substring(0, 1),
          lvl2: newCode.substring(0, 3),
          lvl3: newCode.substring(0, 5)
        };

        if (oldFull !== newFull) {
          state.journals.forEach(j => {
            if (j.account === oldFull) j.account = newFull;
          });
          state.items.forEach(it => {
            if (it.account === oldFull) it.account = newFull;
          });
        }

        state.coa.sort((a, b) => a.code.localeCompare(b.code));
        saveState();
        closeCoaEditModal();
        initJournalFormLines();
        renderAll();
        showToast(`Akun COA "${newFull}" & Saldo Awal (${fmtRp(newInitBalance)}) berhasil disimpan.`);
      });

      // ==================== WIZARD TRANSAKSI BARANG & WIZARD BARANG KONSINYASI (POIN 2 & POIN 3) ====================
      function openQuickTransModal(defaultMode = "REGULER") {
        const m = document.getElementById("modalQuickTrans");
        m.classList.remove("hidden");
        m.classList.add("flex");
        const qtDateVal = document.getElementById("qtDate").value || `${activeBookYear !== "ALL" ? activeBookYear : "2026"}-01-12`;
        document.getElementById("qtDocNo").value = generateNextTransactionDocNo(qtDateVal, defaultMode === "KONSINYASI" ? "KONS" : null);
        document.getElementById("qtDocNoWarning").classList.add("hidden");
        document.getElementById("qtNewSupCode").value = generateNextSupplierCode(qtDateVal.substring(0, 4));
        const nextKonsNum = (state.items || []).filter(i => (i.code || "").startsWith("KONS-")).length + 1;
        const newKonsCodeInp = document.getElementById("qtNewItemCode");
        if (newKonsCodeInp) newKonsCodeInp.value = `KONS-${pad3(nextKonsNum)}`;

        const qtTypeSel = document.getElementById("qtType");
        if (defaultMode === "KONSINYASI") {
          if (qtTypeSel) qtTypeSel.value = "KONS_IN";
          const konsItem = (state.items || []).find(i => (i.account || "").startsWith("1.1.4.04"));
          if (konsItem && document.getElementById("qtItemCode")) {
            document.getElementById("qtItemCode").value = konsItem.code;
          }
        } else {
          if (qtTypeSel && qtTypeSel.value.startsWith("KONS_")) {
            qtTypeSel.value = "IN_BUY";
          }
        }
        SyncQuickTransDefaults();
      }

      function SyncQuickTransDefaults() {
        const type = document.getElementById("qtType").value;
        const isKons = type.startsWith("KONS_");
        const code = document.getElementById("qtItemCode").value;
        const item = state.items.find(i => i.code === code) || state.items[0];
        const priceInput = document.getElementById("qtUnitPrice");
        const partnerCostInput = document.getElementById("qtConsignPartnerCost");
        const sellPriceInput = document.getElementById("qtConsignSellPrice");
        const descInput = document.getElementById("qtDesc");
        const supSel = document.getElementById("qtSupplierSelect");

        if (item && supSel && item.supplierCode && Array.from(supSel.options).some(o => o.value === item.supplierCode)) {
          supSel.value = item.supplierCode;
        }

        const itemNameLbl = code === "__NEW_KONS_ITEM__"
          ? (document.getElementById("qtNewItemName")?.value || "Barang Konsinyasi")
          : (item ? item.name : "Barang");

        const itemCost = item ? (Number(item.cost) || 0) : 0;
        const itemPrice = item ? (Number(item.price) || 0) : 0;

        if (!isKons) {
          if (type === "IN_BUY") {
            priceInput.value = fmtNominalInput(itemCost);
            descInput.value = `Pembelian stok ${itemNameLbl}`;
          } else if (type === "OUT_SALE_MEMBER" || type === "OUT_SALE_NON") {
            priceInput.value = fmtNominalInput(itemPrice);
            descInput.value = `Penjualan ${itemNameLbl} (${type === "OUT_SALE_MEMBER" ? "Anggota" : "Non-Anggota"})`;
          } else {
            priceInput.value = fmtNominalInput(itemCost);
            descInput.value = `Pemakaian internal ${itemNameLbl}`;
          }
        } else {
          if (partnerCostInput) partnerCostInput.value = fmtNominalInput(itemCost);
          if (sellPriceInput) sellPriceInput.value = fmtNominalInput(itemPrice >= itemCost ? itemPrice : itemCost);
          if (type === "KONS_IN") {
            priceInput.value = fmtNominalInput(itemCost);
            descInput.value = `Terima titipan barang konsinyasi ${itemNameLbl}`;
          } else if (type === "KONS_OUT_SALE_MEMBER" || type === "KONS_OUT_SALE_NON") {
            priceInput.value = fmtNominalInput(itemPrice);
            descInput.value = `Penjualan barang konsinyasi ${itemNameLbl} (${type === "KONS_OUT_SALE_MEMBER" ? "Anggota" : "Non-Anggota"})`;
          } else if (type === "KONS_PAY_PARTNER") {
            priceInput.value = fmtNominalInput(itemCost);
            descInput.value = `Setor / pelunasan hasil penjualan konsinyasi ${itemNameLbl} ke Mitra`;
          } else if (type === "KONS_OUT_RETURN") {
            priceInput.value = fmtNominalInput(itemCost);
            descInput.value = `Retur barang konsinyasi tidak terjual (${itemNameLbl}) ke Mitra`;
          }
        }
        updateQuickTransPreview();
      }

      document.getElementById("btnQuickTransModal").addEventListener("click", () => openQuickTransModal("REGULER"));
      document.getElementById("btnOpenTransPersediaan2").addEventListener("click", () => openQuickTransModal("REGULER"));
      document.getElementById("btnOpenQuickTransFromJurnal").addEventListener("click", () => openQuickTransModal("REGULER"));

      document.getElementById("btnOpenConsignmentWizard")?.addEventListener("click", () => openQuickTransModal("KONSINYASI"));
      document.getElementById("btnOpenConsignmentWizard2")?.addEventListener("click", () => openQuickTransModal("KONSINYASI"));
      document.getElementById("btnOpenConsignmentFromJurnal")?.addEventListener("click", () => openQuickTransModal("KONSINYASI"));

      document.getElementById("btnQtModeReguler")?.addEventListener("click", () => {
        document.getElementById("qtType").value = "IN_BUY";
        SyncQuickTransDefaults();
      });
      document.getElementById("btnQtModeKonsinyasi")?.addEventListener("click", () => {
        document.getElementById("qtType").value = "KONS_IN";
        const konsItem = (state.items || []).find(i => (i.account || "").startsWith("1.1.4.04"));
        if (konsItem && document.getElementById("qtItemCode")) {
          document.getElementById("qtItemCode").value = konsItem.code;
        }
        SyncQuickTransDefaults();
      });

      const closeQuickTrans = () => {
        const m = document.getElementById("modalQuickTrans");
        m.classList.add("hidden");
        m.classList.remove("flex");
      };
      document.getElementById("btnCloseQuickTrans").addEventListener("click", closeQuickTrans);
      document.getElementById("btnCancelQuickTrans").addEventListener("click", closeQuickTrans);

      document.getElementById("qtType").addEventListener("change", SyncQuickTransDefaults);
      document.getElementById("qtItemCode").addEventListener("change", SyncQuickTransDefaults);
      document.getElementById("qtNewItemName")?.addEventListener("input", updateQuickTransPreview);
      document.getElementById("qtSupplierSelect")?.addEventListener("change", updateQuickTransPreview);
      document.getElementById("qtNewSupCode")?.addEventListener("input", updateQuickTransPreview);
      document.getElementById("qtQty").addEventListener("input", updateQuickTransPreview);
      document.getElementById("qtUnitPrice").addEventListener("input", () => {
        const t = document.getElementById("qtType").value;
        if (t === "KONS_IN" || t === "KONS_PAY_PARTNER" || t === "KONS_OUT_RETURN") {
          const pInp = document.getElementById("qtConsignPartnerCost");
          if (pInp) pInp.value = document.getElementById("qtUnitPrice").value;
        } else if (t === "KONS_OUT_SALE_MEMBER" || t === "KONS_OUT_SALE_NON") {
          const sInp = document.getElementById("qtConsignSellPrice");
          if (sInp) sInp.value = document.getElementById("qtUnitPrice").value;
        }
        updateQuickTransPreview();
      });
      document.getElementById("qtConsignPartnerCost")?.addEventListener("input", updateQuickTransPreview);
      document.getElementById("qtConsignSellPrice")?.addEventListener("input", () => {
        const t = document.getElementById("qtType").value;
        if (t === "KONS_OUT_SALE_MEMBER" || t === "KONS_OUT_SALE_NON") {
          document.getElementById("qtUnitPrice").value = document.getElementById("qtConsignSellPrice").value;
        }
        updateQuickTransPreview();
      });
      document.getElementById("qtPayAccount").addEventListener("change", updateQuickTransPreview);

      document.getElementById("quickTransForm").addEventListener("submit", (e) => {
        e.preventDefault();
        ensureRetainedEarningsAccountInCoa();
        const type = document.getElementById("qtType").value;
        const isKons = type.startsWith("KONS_");
        const date = document.getElementById("qtDate").value;
        const rawDocNo = document.getElementById("qtDocNo").value.trim();
        const docNo = autoIncrementDuplicateDocNo(rawDocNo, date, isKons ? "KONS" : null);
        let code = document.getElementById("qtItemCode").value;
        const qty = Number(document.getElementById("qtQty").value || 0);
        const unitPrice = parseNominal(document.getElementById("qtUnitPrice").value || 0);
        const payAcc = document.getElementById("qtPayAccount").value;
        const desc = document.getElementById("qtDesc").value.trim();

        if (qty <= 0) {
          showToast("Masukkan kuantitas (Qty) barang lebih dari 0.", "error");
          return;
        }

        if (code === "__NEW_KONS_ITEM__") {
          const newCode = (document.getElementById("qtNewItemCode")?.value || "").trim().toUpperCase() || `KONS-${Date.now().toString().slice(-3)}`;
          const newName = (document.getElementById("qtNewItemName")?.value || "").trim();
          const newUnit = (document.getElementById("qtNewItemUnit")?.value || "Pcs").trim();
          if (!newName) {
            showToast("Masukkan Nama Barang baru terlebih dahulu.", "error");
            return;
          }
          const newAcc = isKons ? resolveCoaFull("1.1.4.04", "1.1.4.04 Persediaan Barang Konsinyasi (Titipan)") : "1.1.4.01 Persediaan Barang Dagangan";
          const partnerCostInit = parseNominal(document.getElementById("qtConsignPartnerCost")?.value || unitPrice);
          const sellPriceInit = parseNominal(document.getElementById("qtConsignSellPrice")?.value || unitPrice);
          state.items.push({
            code: newCode,
            name: newName,
            unit: newUnit,
            account: newAcc,
            initQty: 0,
            minQty: 0,
            cost: partnerCostInit,
            price: sellPriceInit,
            supplierCode: generateNextSupplierCode(date.substring(0, 4))
          });
          code = newCode;
        }

        const invSummary = computeInventorySummary();
        const item = invSummary.find(i => i.code === code);
        if (!item) {
          showToast("Pilih barang persediaan yang valid.", "error");
          return;
        }

        const requiresStockCheck = (
          type === "OUT_SALE_MEMBER" ||
          type === "OUT_SALE_NON" ||
          type === "OUT_USE" ||
          type === "KONS_OUT_SALE_MEMBER" ||
          type === "KONS_OUT_SALE_NON" ||
          type === "KONS_OUT_RETURN"
        );
        if (requiresStockCheck && qty > item.finalQty) {
          showToast(`Stok ${item.name} tidak mencukupi! Tersedia: ${item.finalQty} ${item.unit}.`, "error");
          return;
        }

        const totalTrans = qty * unitPrice;
        const totalHPP = qty * (Number(item.cost) || 0);
        const isCash = payAcc.startsWith("1.1.1");
        const ts = Date.now() + "-" + crypto.randomUUID().slice(0,8);
        const officer = getDefaultActiveOfficerValue();

        if (!isKons) {
          if (type === "IN_BUY") {
            const supSelVal = document.getElementById("qtSupplierSelect")?.value || "";
            let finalSupCode = supSelVal;
            let finalSupName = "Supplier Koperasi";
            let finalSupAddr = "-";
            let finalSupPhone = "-";

            if (supSelVal === "__NEW__") {
              finalSupCode = (document.getElementById("qtNewSupCode")?.value || "").trim().toUpperCase() || generateNextSupplierCode(date.substring(0, 4));
              finalSupName = (document.getElementById("qtNewSupName")?.value || "").trim() || "Supplier Baru";
              finalSupAddr = (document.getElementById("qtNewSupAddress")?.value || "").trim() || "-";
              finalSupPhone = (document.getElementById("qtNewSupPhone")?.value || "").trim() || "-";
            } else {
              const existingSup = (state.suppliers || []).find(s => s.code === supSelVal);
              if (existingSup) {
                finalSupCode = existingSup.code;
                finalSupName = existingSup.name;
                finalSupAddr = existingSup.address || "-";
                finalSupPhone = existingSup.phone || "-";
              }
            }

            if (!Array.isArray(state.suppliers)) state.suppliers = [];
            state.suppliers.push({
              id: `SUP-REC-${ts}`,
              code: finalSupCode,
              name: finalSupName,
              address: finalSupAddr,
              phone: finalSupPhone,
              itemCode: item.code,
              itemName: item.name,
              qtyBought: qty,
              buyPrice: unitPrice,
              date,
              docNo
            });

            const masterIdx = state.items.findIndex(i => i.code === code);
            if (masterIdx > -1) {
              state.items[masterIdx].supplierCode = finalSupCode;
              if (unitPrice > 0) {
                state.items[masterIdx].cost = unitPrice;
              }
            }

            state.journals.push(
              {
                id: `J-${ts}-1`,
                date,
                docNo,
                account: item.account,
                officerName: officer,
                itemName: item.name,
                qty,
                debit: totalTrans,
                kredit: 0,
                desc: `${desc} (Supplier: ${finalSupCode} - ${finalSupName})`,
                cashflow: ""
              },
              {
                id: `J-${ts}-2`,
                date,
                docNo,
                account: payAcc,
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: totalTrans,
                desc: `${desc} (Supplier: ${finalSupCode} - ${finalSupName})`,
                cashflow: isCash ? "Pembelian Harga Pokok Barang" : ""
              }
            );
            showToast(`Barang Masuk (+${qty} ${item.unit} ${item.name}) dari Supplier "${finalSupName}" (${finalSupCode}) & Jurnal Pembelian berhasil disimpan.`);
          } else if (type === "OUT_SALE_MEMBER" || type === "OUT_SALE_NON") {
            const revAcc = type === "OUT_SALE_MEMBER"
              ? resolveCoaFull("4.1.1.01", "4.1.1.01 Pendapatan Penjualan Barang Dagangan (Anggota)")
              : resolveCoaFull("4.2.1.01", "4.2.1.01 Pendapatan Penjualan Barang Dagangan (Non-Anggota)");
            const cfTag = isCash
              ? (type === "OUT_SALE_MEMBER" ? "Penerimaan Kas dari Pelayanan kepada Anggota" : "Penerimaan Kas dari Non Anggota")
              : "";

            state.journals.push(
              {
                id: `J-${ts}-1`,
                date,
                docNo,
                account: payAcc,
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: totalTrans,
                kredit: 0,
                desc,
                cashflow: cfTag
              },
              {
                id: `J-${ts}-2`,
                date,
                docNo,
                account: revAcc,
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: totalTrans,
                desc,
                cashflow: ""
              },
              {
                id: `J-${ts}-3`,
                date,
                docNo,
                account: resolveCoaFull("5.1.1.01", "5.1.1.01 Harga Pokok Penjualan Barang Dagangan"),
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: totalHPP,
                kredit: 0,
                desc: `HPP ${desc}`,
                cashflow: ""
              },
              {
                id: `J-${ts}-4`,
                date,
                docNo,
                account: item.account,
                officerName: officer,
                itemName: item.name,
                qty,
                debit: 0,
                kredit: totalHPP,
                desc: `Pengeluaran Stok ${qty} ${item.unit} ${item.name}`,
                cashflow: ""
              }
            );
            showToast(`Penjualan (-${qty} ${item.unit} ${item.name}) & Jurnal HPP otomatis berhasil disimpan.`);
          } else {
            state.journals.push(
              {
                id: `J-${ts}-1`,
                date,
                docNo,
                account: resolveCoaFull("6.1.2.01", "6.1.2.01 Beban ATK"),
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: totalHPP,
                kredit: 0,
                desc,
                cashflow: ""
              },
              {
                id: `J-${ts}-2`,
                date,
                docNo,
                account: item.account,
                officerName: officer,
                itemName: item.name,
                qty,
                debit: 0,
                kredit: totalHPP,
                desc,
                cashflow: ""
              }
            );
            showToast(`Pemakaian Barang (-${qty} ${item.unit} ${item.name}) berhasil dijurnal.`);
          }
        } else {
          // ==================== PROSES JURNAL OTOMATIS WIZARD BARANG KONSINYASI (SESUAI COA KONSINYASI) ====================
          const partnerCostUnit = parseNominal(document.getElementById("qtConsignPartnerCost")?.value || 0) || Number(item.cost) || unitPrice;
          const sellPriceUnit = parseNominal(document.getElementById("qtConsignSellPrice")?.value || 0) || unitPrice || Number(item.price) || partnerCostUnit;
          const totalPartnerVal = qty * partnerCostUnit;
          const totalSellVal = qty * sellPriceUnit;
          const totalCommVal = Math.max(0, totalSellVal - totalPartnerVal);

          const masterIdx = state.items.findIndex(i => i.code === code);
          if (masterIdx > -1) {
            state.items[masterIdx].account = resolveCoaFull("1.1.4.04", "1.1.4.04 Persediaan Barang Konsinyasi (Titipan)");
            if (partnerCostUnit > 0) state.items[masterIdx].cost = partnerCostUnit;
            if (sellPriceUnit > 0) state.items[masterIdx].price = sellPriceUnit;
          }

          if (type === "KONS_IN") {
            const supSelVal = document.getElementById("qtSupplierSelect")?.value || "";
            let finalSupCode = supSelVal;
            let finalSupName = "Mitra Konsinyasi";
            let finalSupAddr = "-";
            let finalSupPhone = "-";

            if (supSelVal === "__NEW__") {
              finalSupCode = (document.getElementById("qtNewSupCode")?.value || "").trim().toUpperCase() || generateNextSupplierCode(date.substring(0, 4));
              finalSupName = (document.getElementById("qtNewSupName")?.value || "").trim() || "Mitra Konsinyasi Baru";
              finalSupAddr = (document.getElementById("qtNewSupAddress")?.value || "").trim() || "-";
              finalSupPhone = (document.getElementById("qtNewSupPhone")?.value || "").trim() || "-";
            } else {
              const existingSup = (state.suppliers || []).find(s => s.code === supSelVal);
              if (existingSup) {
                finalSupCode = existingSup.code;
                finalSupName = existingSup.name;
                finalSupAddr = existingSup.address || "-";
                finalSupPhone = existingSup.phone || "-";
              }
            }

            if (!Array.isArray(state.suppliers)) state.suppliers = [];
            state.suppliers.push({
              id: `SUP-KONS-${ts}`,
              code: finalSupCode,
              name: finalSupName,
              address: finalSupAddr,
              phone: finalSupPhone,
              itemCode: item.code,
              itemName: item.name,
              qtyBought: qty,
              buyPrice: partnerCostUnit,
              date,
              docNo
            });
            if (masterIdx > -1) state.items[masterIdx].supplierCode = finalSupCode;

            state.journals.push(
              {
                id: `J-${ts}-1`,
                date,
                docNo,
                account: resolveCoaFull("1.1.4.04", "1.1.4.04 Persediaan Barang Konsinyasi (Titipan)"),
                officerName: officer,
                itemName: item.name,
                qty,
                debit: totalPartnerVal,
                kredit: 0,
                desc: `${desc} (Mitra Konsinyasi: ${finalSupCode} - ${finalSupName})`,
                cashflow: ""
              },
              {
                id: `J-${ts}-2`,
                date,
                docNo,
                account: resolveCoaFull("2.1.3.03", "2.1.3.03 Utang Konsinyasi (Titipan Mitra/Supplier)"),
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: totalPartnerVal,
                desc: `Kewajiban Titipan Konsinyasi ke Mitra ${finalSupName} (${qty} ${item.unit} ${item.name})`,
                cashflow: ""
              }
            );
            showToast(`Penerimaan Barang Konsinyasi (+${qty} ${item.unit} ${item.name}) berhasil dicatat ke COA 1.1.4.04 & 2.1.3.03.`);
          } else if (type === "KONS_OUT_SALE_MEMBER" || type === "KONS_OUT_SALE_NON") {
            const revKonsAcc = type === "KONS_OUT_SALE_MEMBER"
              ? resolveCoaFull("4.1.1.03", "4.1.1.03 Pendapatan Penjualan Barang Konsinyasi (Anggota)")
              : resolveCoaFull("4.2.1.02", "4.2.1.02 Pendapatan Penjualan Barang Konsinyasi (Non-Anggota)");
            const cfTag = isCash
              ? (type === "KONS_OUT_SALE_MEMBER" ? "Penerimaan Kas dari Pelayanan kepada Anggota" : "Penerimaan Kas dari Non Anggota")
              : "";

            state.journals.push(
              {
                id: `J-${ts}-1`,
                date,
                docNo,
                account: payAcc,
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: totalSellVal,
                kredit: 0,
                desc,
                cashflow: cfTag
              },
              {
                id: `J-${ts}-2`,
                date,
                docNo,
                account: revKonsAcc,
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: totalPartnerVal,
                desc: `Pendapatan Pokok Penjualan Konsinyasi ${item.name}`,
                cashflow: ""
              }
            );
            if (totalCommVal > 0) {
              state.journals.push({
                id: `J-${ts}-3`,
                date,
                docNo,
                account: resolveCoaFull("4.1.1.02", "4.1.1.02 Pendapatan Komisi Konsinyasi"),
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: totalCommVal,
                desc: `Komisi Konsinyasi Koperasi atas ${qty} ${item.unit} ${item.name}`,
                cashflow: ""
              });
            }
            state.journals.push(
              {
                id: `J-${ts}-4`,
                date,
                docNo,
                account: resolveCoaFull("5.1.1.03", "5.1.1.03 Harga Pokok Penjualan (HPP) Barang Konsinyasi"),
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: totalPartnerVal,
                kredit: 0,
                desc: `HPP Konsinyasi ${item.name}`,
                cashflow: ""
              },
              {
                id: `J-${ts}-5`,
                date,
                docNo,
                account: resolveCoaFull("1.1.4.04", "1.1.4.04 Persediaan Barang Konsinyasi (Titipan)"),
                officerName: officer,
                itemName: item.name,
                qty,
                debit: 0,
                kredit: totalPartnerVal,
                desc: `Pengeluaran Stok Konsinyasi ${qty} ${item.unit} ${item.name}`,
                cashflow: ""
              }
            );
            showToast(`Penjualan Konsinyasi (-${qty} ${item.unit} ${item.name}) & Komisi Konsinyasi (${fmtRp(totalCommVal)}) berhasil dijurnal!`);
          } else if (type === "KONS_PAY_PARTNER") {
            const payTargetAcc = payAcc.startsWith("2.") ? "1.1.1.01 Kas Tunai" : payAcc;
            state.journals.push(
              {
                id: `J-${ts}-1`,
                date,
                docNo,
                account: resolveCoaFull("2.1.3.03", "2.1.3.03 Utang Konsinyasi (Titipan Mitra/Supplier)"),
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: totalPartnerVal,
                kredit: 0,
                desc,
                cashflow: ""
              },
              {
                id: `J-${ts}-2`,
                date,
                docNo,
                account: payTargetAcc,
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: 0,
                kredit: totalPartnerVal,
                desc,
                cashflow: payTargetAcc.startsWith("1.1.1") ? "Pembelian Harga Pokok Barang" : ""
              }
            );
            showToast(`Pelunasan / Setor Hasil Konsinyasi sebesar ${fmtRp(totalPartnerVal)} ke Mitra berhasil dijurnal.`);
          } else if (type === "KONS_OUT_RETURN") {
            state.journals.push(
              {
                id: `J-${ts}-1`,
                date,
                docNo,
                account: resolveCoaFull("2.1.3.03", "2.1.3.03 Utang Konsinyasi (Titipan Mitra/Supplier)"),
                officerName: officer,
                itemName: "",
                qty: 0,
                debit: totalPartnerVal,
                kredit: 0,
                desc,
                cashflow: ""
              },
              {
                id: `J-${ts}-2`,
                date,
                docNo,
                account: resolveCoaFull("1.1.4.04", "1.1.4.04 Persediaan Barang Konsinyasi (Titipan)"),
                officerName: officer,
                itemName: item.name,
                qty,
                debit: 0,
                kredit: totalPartnerVal,
                desc: `Retur Stok Barang Konsinyasi ${qty} ${item.unit} ${item.name}`,
                cashflow: ""
              }
            );
            showToast(`Retur Barang Konsinyasi (-${qty} ${item.unit} ${item.name}) berhasil dijurnal.`);
          }
        }

        const transYear = date.substring(0, 4);
        if (activeBookYear !== "ALL" && transYear !== activeBookYear) {
          activeBookYear = transYear;
        }

        saveState();
        closeQuickTrans();
        syncAllTransactionDocNoInputs();
        renderAll();
      });

      // Manual Journal Form (Auto-increments duplicate DocNo & saves Nama Petugas / Karyawan Penginput)
      document.getElementById("btnAddJournalLine").addEventListener("click", () => {
        document.getElementById("journalFormLines").appendChild(createJournalLineRow("", 0, 0));
      });
      document.getElementById("btnClearJournalForm").addEventListener("click", initJournalFormLines);

      document.getElementById("journalForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const date = document.getElementById("jDate").value;
        const rawDocNo = document.getElementById("jDocNo").value.trim();
        const docNo = autoIncrementDuplicateDocNo(rawDocNo, date, null);
        const desc = document.getElementById("jDesc").value.trim();

        const lines = [];
        let totD = 0;
        let totK = 0;
        let invalidAccount = false;

        document.querySelectorAll("#journalFormLines tr").forEach((tr, idx) => {
          const rawAcc = (tr.querySelector(".jline-account-input")?.value || tr.querySelector(".jline-account")?.value || "").trim();
          const officerName = tr.querySelector(".jline-member")?.value || getDefaultActiveOfficerValue();
          const itemName = tr.querySelector(".jline-item").value;
          const qty = Number(tr.querySelector(".jline-qty").value || 0);
          const debit = parseNominal(tr.querySelector(".jline-debit").value || 0);
          const kredit = parseNominal(tr.querySelector(".jline-kredit").value || 0);
          const cashflow = tr.querySelector(".jline-cf").value;

          if (debit > 0 || kredit > 0) {
            const matchedAcc = getAccountObj(rawAcc) || state.coa.find(a => a.full.toLowerCase().includes(rawAcc.toLowerCase()));
            if (!matchedAcc) {
              invalidAccount = true;
              return;
            }
            totD += debit;
            totK += kredit;
            lines.push({
              id: `J-${Date.now()}-${idx}`,
              date,
              docNo,
              account: matchedAcc.full,
              officerName,
              memberCode: "",
              memberName: "",
              itemName,
              qty,
              debit,
              kredit,
              desc,
              cashflow
            });
          }
        });

        if (invalidAccount) {
          showToast("Pastikan akun COA yang diketik pada setiap baris jurnal telah dipilih dari daftar akun yang muncul.", "error");
          return;
        }
        if (lines.length < 2) {
          showToast("Masukkan minimal 2 baris jurnal yang memiliki nilai.", "error");
          return;
        }
        if (Math.round(totD - totK) !== 0) {
          showToast(`Jurnal belum seimbang! Selisih Debit & Kredit: ${fmtRp(totD - totK)}`, "error");
          return;
        }

        state.journals.push(...lines);
        const transYear = date.substring(0, 4);
        if (activeBookYear !== "ALL" && transYear !== activeBookYear) {
          activeBookYear = transYear;
        }
        saveState();
        initJournalFormLines();
        document.getElementById("jDesc").value = "";
        renderAll();
        showToast(`Jurnal harian (${docNo}) berhasil disimpan.`);
      });

      // Delete Journal Package by DocNo (Hapus Sepaket Debit & Kredit per Nomor Transaksi - Poin 6 Gambar 6)
      document.getElementById("journalTableBody").addEventListener("click", (e) => {
        const btn = e.target.closest(".del-journal-btn");
        if (!btn) return;
        const docNo = btn.getAttribute("data-docno");
        if (!docNo) return;
        const matchingLines = state.journals.filter(j => (j.docNo || "").trim() === docNo.trim());
        const count = matchingLines.length;
        openConfirmModal(
          `Hapus Sepaket Jurnal (${docNo})`,
          `Apakah Anda yakin ingin menghapus sepaket transaksi jurnal nomor "${docNo}" (${count} baris Debit & Kredit sekaligus) agar neraca tetap seimbang?`,
          () => {
            state.journals = state.journals.filter(j => (j.docNo || "").trim() !== docNo.trim());
            saveState();
            syncAllTransactionDocNoInputs();
            renderAll();
            showToast(`Sepaket transaksi jurnal "${docNo}" (${count} baris Debit & Kredit) berhasil dihapus.`);
          }
        );
      });

      // Add COA Form (+ Saldo Awal Manual)
      document.getElementById("addCoaForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const code = document.getElementById("newCoaCode").value.trim();
        const name = document.getElementById("newCoaName").value.trim();
        const normal = document.getElementById("newCoaNormal").value;
        const initBalance = parseNominal(document.getElementById("newCoaInitBalance")?.value || 0);
        const full = `${code} ${name}`;
        if (state.coa.some(a => a.code === code || a.full.toLowerCase() === full.toLowerCase())) {
          showToast("Kode atau nama akun tersebut sudah ada di COA.", "error");
          return;
        }
        state.coa.push({
          no: state.coa.length + 1,
          full,
          code,
          name,
          normal,
          budget: 0,
          initBalance,
          lvl1: code.substring(0, 1),
          lvl2: code.substring(0, 3),
          lvl3: code.substring(0, 5)
        });
        state.coa.sort((a, b) => a.code.localeCompare(b.code));
        saveState();
        document.getElementById("newCoaCode").value = "";
        document.getElementById("newCoaName").value = "";
        if (document.getElementById("newCoaInitBalance")) document.getElementById("newCoaInitBalance").value = 0;
        initJournalFormLines();
        renderAll();
        showToast(`Akun baru "${full}" (Saldo Awal: ${fmtRp(initBalance)}) berhasil ditambahkan ke COA.`);
      });

      // Save Identity Form
      document.getElementById("identityForm").addEventListener("submit", (e) => {
        e.preventDefault();
        state.identity = {
          coopName: document.getElementById("idCoopName").value.trim(),
          unitUsaha: document.getElementById("idUnitUsaha").value.trim(),
          province: document.getElementById("idProvince").value.trim(),
          city: document.getElementById("idCity").value.trim(),
          address: document.getElementById("idAddress").value.trim(),
          startDate: document.getElementById("idStartDate").value,
          endDate: document.getElementById("idEndDate").value,
          chairmanName: document.getElementById("idChairmanName").value.trim(),
          chairmanNik: document.getElementById("idChairmanNik").value.trim(),
          accountantName: document.getElementById("idAccountantName").value.trim(),
          accountantNik: document.getElementById("idAccountantNik").value.trim()
        };
        if (currentUser && state.identity.coopName) {
          currentUser.coopName = state.identity.coopName;
          saveUsers();
        }
        saveState();
        syncAllTransactionDocNoInputs();
        renderAll();
        showToast("Identitas Koperasi Desa Merah Putih berhasil disimpan.");
      });
      installCloudControls();
      void restoreCloudSession();
    });
