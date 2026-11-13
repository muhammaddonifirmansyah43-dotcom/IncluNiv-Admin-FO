import type { Pengajuan, PengajuanStatus } from "@/types/pengajuan";

const base: Omit<Pengajuan, "id" | "nama" | "nim" | "status"> = {
  tanggalSingkat: "30-09-2026",
  tanggalLengkap: "30 September 2026, 07:15 WIB",
  jabatan: "Pendamping Disabilitas Sensorik Netra",
  terdaftar: "Terdaftar sejak Gasal 2024/2025",
  prodi: "Teknologi Informasi",
  fakultas: "Fakultas Vokasi",
  alasan:
    "Saya sedang sakit sehingga tidak dapat melaksanakan pendampingan sesuai jadwal.",
  jadwal: {
    hari: "Rabu, 30 September 2026",
    jam: "08.00 - 10.00 WIB",
    matkul: "Pemrograman Mobile",
    mahasiswa: "Ahmad Macheda",
  },
  efektif: "30 September 2026 (Satu Hari)",
};

function make(
  id: string,
  nama: string,
  nim: string,
  status: PengajuanStatus,
  extra: Partial<Pengajuan> = {}
): Pengajuan {
  return { ...base, id, nama, nim, status, ...extra };
}

const kemarin = {
  tanggalSingkat: "29-09-2026",
  tanggalLengkap: "29 September 2026, 09:40 WIB",
};

export const pengajuanList: Pengajuan[] = [
  make("1", "Gita Naura Kusuma", "253140707110136", "dalam_proses"),
  make("2", "Lukito Adi Nugroho", "253140707110143", "telah_disetujui"),
  make("3", "Anjani Tri Paundra", "253140707110165", "tidak_dipenuhi"),
  make("4", "Putra Adi Pratama", "253140707110171", "telah_disetujui", kemarin),
  make("5", "Agus Salim", "253140707110182", "telah_disetujui", kemarin),
  make("6", "Rizky Pratama", "253140707110190", "dalam_proses", kemarin),
  make("7", "Dewi Lestari", "253140707110204", "telah_disetujui", kemarin),
  make("8", "Bayu Wicaksono", "253140707110218", "tidak_dipenuhi", kemarin),
  make("9", "Rina Sari", "253140707110225", "telah_disetujui", kemarin),
  make("10", "Fajar Nugraha", "253140707110233", "telah_disetujui", kemarin),
  make("11", "Maya Putri", "253140707110247", "dalam_proses", kemarin),
  make("12", "Dimas Prakoso", "253140707110252", "telah_disetujui", kemarin),
  make("13", "Siti Aisyah", "253140707110269", "telah_disetujui", kemarin),
  make("14", "Hendra Kurniawan", "253140707110274", "tidak_dipenuhi", kemarin),
  make("15", "Nabila Zahra", "253140707110281", "telah_disetujui", kemarin),
];