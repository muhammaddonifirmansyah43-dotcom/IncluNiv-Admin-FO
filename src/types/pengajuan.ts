export type PengajuanStatus = "diproses" | "disetujui" | "tidak_dipenuhi";

export type Pengajuan = {
  id: string;
  nama: string;
  nim: string;
  tanggalSingkat: string;
  tanggalLengkap: string;
  status: PengajuanStatus;
  jabatan: string;
  terdaftar: string;
  prodi: string;
  fakultas: string;
  alasan: string;
  jadwal: {
    hari: string;
    jam: string;
    matkul: string;
    mahasiswa: string;
  };
  efektif: string;
};