/* ---------- Tipe ---------- */

export type StatusJadwal = "Selesai" | "Berlangsung" | "Akan datang";
export type FilterStatus = "Semua" | StatusJadwal;

export interface Jadwal {
  id: number;
  tanggal: string; // format YYYY-MM-DD
  waktu: string; // contoh: "07:00 - 08:30"
  mahasiswa: string;
  nimMahasiswa: string;
  pendamping: string;
  nimPendamping: string;
  aiMatch?: boolean; // pendamping hasil rekomendasi AI
  pendampingAsli?: string; // pendamping awal yang digantikan, mis. "Gita Naura (Izin Sakit)"
  mataKuliah: string;
  lokasi: string;
  kelas: string;
  status: StatusJadwal;
}

/* ---------- Konfigurasi filter ---------- */

export const semesterOptions = [
  { value: "ganjil", label: "Semester Ganjil 2026/2027" },
  { value: "genap", label: "Semester Genap 2026/2027" },
];

export const statusOptions: FilterStatus[] = [
  "Semua",
  "Berlangsung",
  "Akan datang",
  "Selesai",
];

export const SEMESTER_RANGE: Record<string, { start: string; end: string }> = {
  ganjil: { start: "2026-08-01", end: "2027-01-31" },
  genap: { start: "2027-02-01", end: "2027-07-31" },
};

// Sama dengan desain Figma. Ganti ke getTodayString() kalau data sudah dari API.
export const DEFAULT_TANGGAL = "2026-09-30";

/* ---------- Helper tanggal ---------- */

export const toDateString = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

export const getTodayString = () => toDateString(new Date());

export const formatTanggal = (value: string, withDay = true) =>
  new Intl.DateTimeFormat("id-ID", {
    ...(withDay ? { weekday: "long" as const } : {}),
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

export const dalamSemester = (tanggal: string, semester: string) => {
  const range = SEMESTER_RANGE[semester];
  return !range || (tanggal >= range.start && tanggal <= range.end);
};

/* ---------- Data dummy ---------- */

export const dataJadwal: Jadwal[] = [
  {
    id: 1,
    tanggal: "2026-09-30",
    waktu: "07:00 - 08:30",
    mahasiswa: "Ahmad Macheda",
    nimMahasiswa: "235150201111",
    pendamping: "Faris Ramadhani",
    nimPendamping: "253140707768966",
    mataKuliah: "Algoritma & Struktur Data",
    lokasi: "Ruang F201 • Gedung F",
    kelas: "TI - B (3 SKS)",
    status: "Selesai",
  },
  {
    id: 2,
    tanggal: "2026-09-30",
    waktu: "08:00 - 10:00",
    mahasiswa: "Raka Fadhillah",
    nimMahasiswa: "225150400192",
    pendamping: "Lukito Adi Nugroho",
    nimPendamping: "253140707111143",
    aiMatch: true,
    pendampingAsli: "Gita Naura (Izin Sakit)",
    mataKuliah: "Pemrograman Mobile",
    lokasi: "Ruang A307 • Lab Aplikasi",
    kelas: "Mobile - A (3 SKS)",
    status: "Berlangsung",
  },
  {
    id: 3,
    tanggal: "2026-09-30",
    waktu: "08:00 - 10:30",
    mahasiswa: "Ikhwanudin",
    nimMahasiswa: "215150307111",
    pendamping: "Dian Novitasari",
    nimPendamping: "253140707765676",
    mataKuliah: "Kecerdasan Buatan",
    lokasi: "Gedung Dieng • Ruang A403",
    kelas: "KB - D (3 SKS)",
    status: "Berlangsung",
  },
  {
    id: 4,
    tanggal: "2026-09-30",
    waktu: "10:20 - 12:00",
    mahasiswa: "Zalvarina Nabilla",
    nimMahasiswa: "245150600109",
    pendamping: "Rizky Ananda",
    nimPendamping: "253140707445587",
    mataKuliah: "Interaksi Manusia & Komputer",
    lokasi: "Ruang B409 • Gedung B",
    kelas: "IMK - C (3 SKS)",
    status: "Akan datang",
  },
  {
    id: 5,
    tanggal: "2026-09-30",
    waktu: "08:45 - 11:15",
    mahasiswa: "Bagas Pratama",
    nimMahasiswa: "235150700012",
    pendamping: "Mahendra Saputra",
    nimPendamping: "253140707222234",
    mataKuliah: "Jaringan Komputer Lanjut",
    lokasi: "Lab Jaringan Gedung G • Lt. 2",
    kelas: "Jarkom - A (3 SKS)",
    status: "Berlangsung",
  },
  {
    id: 6,
    tanggal: "2026-09-30",
    waktu: "13:00 - 15:30",
    mahasiswa: "Dewi Harum",
    nimMahasiswa: "225150207001",
    pendamping: "Anisa Septiani",
    nimPendamping: "253140707112165",
    mataKuliah: "Sistem Basis Data Terdistribusi",
    lokasi: "Ruang C204 • Gedung Pascasarjana",
    kelas: "SBD - B (3 SKS)",
    status: "Akan datang",
  },
];