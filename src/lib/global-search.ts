import { pendampingList } from "@/lib/pendamping-data";
import { dataJadwal } from "@/app/(main)/jadwal/components/types";

export type GlobalSearchItem = {
  id: string;
  category: "Mahasiswa" | "Pendamping" | "Jadwal";
  title: string;
  description: string;
  keywords: string[];
  href: string;
};

const mahasiswaData = [
  {
    id: "253140707000065",
    nama: "Ahmad Macheda",
    nim: "253140707000065",
    fakultas: "Fakultas Vokasi",
    kebutuhan: "Tuna Daksa",
  },
];

export const globalSearchData: GlobalSearchItem[] = [
  ...mahasiswaData.map((item) => ({
    id: item.id,
    category: "Mahasiswa" as const,
    title: item.nama,
    description: `${item.nim} - ${item.fakultas}`,
    keywords: [item.nama, item.nim, item.fakultas, item.kebutuhan],
    href: `/mahasiswa?q=${encodeURIComponent(item.nama)}`,
  })),

  ...pendampingList.map((item) => ({
    id: item.id,
    category: "Pendamping" as const,
    title: item.nama,
    description: `${item.nim} - ${item.fakultas}`,
    keywords: [item.nama, item.nim, item.fakultas],
    href: `/pendamping/${item.id}`,
  })),

  ...dataJadwal.map((item) => ({
    id: String(item.id),
    category: "Jadwal" as const,
    title: item.mataKuliah,
    description: `${item.mahasiswa} - ${item.pendamping} - ${item.tanggal}`,
    keywords: [
      item.mahasiswa,
      item.nimMahasiswa,
      item.pendamping,
      item.nimPendamping,
      item.mataKuliah,
      item.lokasi,
      item.kelas,
      item.status,
    ],
    href: `/jadwal?q=${encodeURIComponent(item.mataKuliah)}`,
  })),
];

export function searchGlobalData(keyword: string) {
  const query = keyword.trim().toLowerCase();

  if (!query) return [];

  return globalSearchData
    .filter((item) =>
      [item.title, item.description, ...item.keywords].some((value) =>
        value.toLowerCase().includes(query)
      )
    )
    .slice(0, 8);
}
