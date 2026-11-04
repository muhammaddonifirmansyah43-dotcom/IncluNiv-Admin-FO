export type StatusJadwal =
  | "Selesai"
  | "Berlangsung"
  | "Akan datang";

export interface Jadwal {
  id: number;
  tanggal: string;
  waktu: string;
  mahasiswa: string;
  nimMahasiswa: string;
  pendamping: string;
  nimPendamping: string;
  labelPendamping?: string;
  mataKuliah: string;
  lokasi: string;
  kelas: string;
  status: StatusJadwal;
}