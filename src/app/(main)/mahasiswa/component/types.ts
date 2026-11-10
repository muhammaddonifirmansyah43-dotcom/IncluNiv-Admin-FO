/* ---------- Daftar mahasiswa ---------- */

export type Mahasiswa = {
  id: string;
  nama: string;
  nim: string;
  fakultas: string;
  disability: string;
};

export type SortDirection = "asc" | "desc" | null;

/* ---------- Jadwal kuliah ---------- */

export type Matkul = {
  sks: string;
  jam: string;
  nama: string;
  lokasi: string;
  gedung: string;
};

export type JadwalHari = {
  hari: string;
  matkul: Matkul[];
};

const m = (
  sks: string,
  jam: string,
  nama: string,
  lokasi: string,
  gedung: string
): Matkul => ({ sks, jam, nama, lokasi, gedung });

export const semesterOptions = [
  { value: "ganjil-2026", label: "Semester Ganjil 2026/2027" },
  { value: "genap-2025", label: "Semester Genap 2025/2026" },
];

export const DEFAULT_SEMESTER = "ganjil-2026";

const jadwalGanjil: JadwalHari[] = [
  {
    hari: "Senin",
    matkul: [
      m("3 SKS", "08:00 - 10:30", "Algoritma & Struktur Data", "Lab Komputer A307", "Gedung Vokasi Lt. 3"),
      m("3 SKS", "13:00 - 15:30", "Arsitektur & Organisasi Komputer", "Ruang Teori B201", "Gedung Vokasi Lt. 2"),
    ],
  },
  {
    hari: "Selasa",
    matkul: [
      m("3 SKS", "07:30 - 10:00", "Pemrograman Berorientasi Objek", "Lab Komputer A305", "Gedung Vokasi Lt. 3"),
      m("2 SKS", "10:30 - 12:10", "Statistika & Probabilitas", "Ruang Teori A307", "Gedung Vokasi Lt. 3"),
    ],
  },
  {
    hari: "Rabu",
    matkul: [
      m("3 SKS", "08:00 - 10:30", "Pemrograman Web Framework", "Lab Komputer A310", "Gedung Vokasi Lt. 3"),
      m("2 SKS", "13:00 - 14:40", "Basis Data Terdistribusi", "Ruang Teori A204", "Gedung Vokasi Lt. 2"),
    ],
  },
  {
    hari: "Kamis",
    matkul: [
      m("2 SKS", "08:00 - 10:00", "Interaksi Manusia dan Komputer", "Ruang Teori A309", "Gedung Vokasi Lt. 3"),
      m("2 SKS", "10:30 - 12:10", "Bahasa Inggris Komunikasi Profesi", "Ruang Diskusi B102", "Gedung Bersama Lt. 1"),
    ],
  },
  {
    hari: "Jumat",
    matkul: [
      m("2 SKS", "08:00 - 10:00", "Kewirausahaan Teknologi", "Ruang Diskusi B201", "Gedung Bersama Lt. 1"),
    ],
  },
];

// Isi dengan data semester genap kalau sudah tersedia.
export const jadwalPerSemester: Record<string, JadwalHari[]> = {
  "ganjil-2026": jadwalGanjil,
  "genap-2025": [],
};