
/* ---------- Tipe Frontend ---------- */

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
  aiMatch?: boolean;
  pendampingAsli?: string;
  mataKuliah?: string;
  lokasi: string;
  kelas?: string;
  status: StatusJadwal;
}

/* ---------- Tipe Respons API Backend ---------- */

// Status asli yang dikirim backend Prisma.
export type AssignmentStatusApi =
  | "PENDING"
  | "ACCEPTED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export interface AssignmentMonitoring {
  id: number;
  startAt: string;
  endAt: string;
  location: string | null;
  status: AssignmentStatusApi;
  student: {
    studentCode: string | null;
    user: {
      fullName: string;
    };
  };
  mentor: {
    studentCode: string | null;
    user: {
      fullName: string;
    };
  };
}

export interface AssignmentMonitoringResponse {
  success: boolean;
  message: string;
  data: AssignmentMonitoring[];
}

/* ---------- Konfigurasi Filter ---------- */

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

// Sementara masih mengikuti tanggal desain Figma.
export const DEFAULT_TANGGAL = "2026-09-30";

/* ---------- Helper Tanggal ---------- */

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
