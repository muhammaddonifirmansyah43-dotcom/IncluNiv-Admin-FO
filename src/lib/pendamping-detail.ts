import { pendampingList } from "@/lib/pendamping-data";
import type { PendampingDetail, ScheduleDay } from "@/types/pendamping";

const defaultSchedule: ScheduleDay[] = [
  {
    hari: "Senin",
    courses: [
      { nama: "Algoritma & Struktur Data", sks: 2, jam: "08:00 - 10:00", ruang: "Lab Komputer 3207", dosen: "Esti Indriati S." },
      { nama: "Arsitektur & Organisasi Komputer", sks: 2, jam: "13:00 - 15:30", ruang: "Ruang Teori B201", dosen: "Esti Indriati S." },
    ],
  },
  {
    hari: "Selasa",
    courses: [
      { nama: "Pemrograman Berorientasi Objek", sks: 2, jam: "07:30 - 10:00", ruang: "Lab Komputer A305", dosen: "Esti Indriati S." },
      { nama: "Statistika & Probabilitas", sks: 2, jam: "10:30 - 12:10", ruang: "Ruang Teori B207", dosen: "Esti Indriati S." },
    ],
  },
  {
    hari: "Rabu",
    courses: [
      { nama: "Pemrograman Web Framework", sks: 3, jam: "09:00 - 11:30", ruang: "Lab Komputer A310", dosen: "Esti Indriati S." },
    ],
  },
  {
    hari: "Kamis",
    courses: [
      { nama: "Interaksi Manusia dan Komputer", sks: 2, jam: "08:30 - 10:10", ruang: "Gedung Vokasi A309", dosen: "Esti Indriati S." },
    ],
  },
  { hari: "Jumat", courses: [] },
];

const overrides: Record<string, Partial<PendampingDetail>> = {
  p3: {
    prodi: "Teknologi Informasi",
    email: "gitanaura@student.univ.ac.id",
    whatsapp: "+62 812-3456-7890",
    keahlian:
      "Memiliki kapabilitas teruji dalam pendampingan mobilitas fisik mahasiswa difabel daksa, adaptif penggunaan kursi roda, serta pemahaman komunikasi visual dan pendampingan akademik ruang kelas.",
  },
};

export function getPendampingDetail(id: string): PendampingDetail | null {
  const base = pendampingList.find((item) => item.id === id);
  if (!base) return null;

  return {
    ...base,
    prodi: "Teknologi Informasi",
    email: `${base.nama.toLowerCase().replace(/\s+/g, "")}@student.univ.ac.id`,
    whatsapp: "+62 812-0000-0000",
    keahlian:
      "Berpengalaman mendampingi mahasiswa difabel dalam kegiatan akademik di kelas dan mobilitas di area kampus.",
    jadwal: defaultSchedule,
    ...overrides[id],
  };
}