
export interface RiwayatPendampingan {
  id: number;
  tanggal: string;
  waktu: string;
  mahasiswa: string;
  kegiatan: string;
  lokasi: string;
  ruang: string;
  durasi: string;
  status: "Selesai" | "Berlangsung" | "Akan datang";
}

export interface Volunteer {
  id: number;
  nama: string;
  nim: string;
  fakultas: string;
  prodi: string;
  foto: string;
  totalSesi: number;
  riwayat: RiwayatPendampingan[];
}

export interface RekapItem {
  id: number;
  nama: string;
  nim: string;
  fakultas: string;
  jumlah: number;
}
