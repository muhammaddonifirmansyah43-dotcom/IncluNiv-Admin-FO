
import { CalendarDays, Clock, MapPin } from "lucide-react";

const jadwal = [
  {
    hari: "SENIN",
    matkul: [
      {
        sks: "3 SKS",
        jam: "08:00 - 10:30",
        nama: "Algoritma & Struktur Data",
        lokasi: "Lab Komputer A307",
        gedung: "Gedung Vokasi Lt. 3",
      },
      {
        sks: "3 SKS",
        jam: "13:00 - 15:30",
        nama: "Arsitektur & Organisasi Komputer",
        lokasi: "Ruang Teori B201",
        gedung: "Gedung Vokasi Lt. 2",
      },
    ],
  },
  {
    hari: "SELASA",
    matkul: [
      {
        sks: "3 SKS",
        jam: "07:30 - 10:00",
        nama: "Pemrograman Berorientasi Objek",
        lokasi: "Lab Komputer A305",
        gedung: "Gedung Vokasi Lt. 3",
      },
      {
        sks: "2 SKS",
        jam: "10:30 - 12:10",
        nama: "Statistika & Probabilitas",
        lokasi: "Ruang Teori A307",
        gedung: "Gedung Vokasi Lt. 3",
      },
    ],
  },
  {
    hari: "RABU",
    matkul: [
      {
        sks: "3 SKS",
        jam: "08:00 - 10:30",
        nama: "Pemrograman Web Framework",
        lokasi: "Lab Komputer A310",
        gedung: "Gedung Vokasi Lt. 3",
      },
      {
        sks: "2 SKS",
        jam: "13:00 - 14:40",
        nama: "Basis Data Terdistribusi",
        lokasi: "Ruang Teori A204",
        gedung: "Gedung Vokasi Lt. 2",
      },
    ],
  },
  {
    hari: "KAMIS",
    matkul: [
      {
        sks: "2 SKS",
        jam: "08:00 - 10:00",
        nama: "Interaksi Manusia dan Komputer",
        lokasi: "Gedung Vokasi A309",
        gedung: "Gedung Vokasi Lt. 3",
      },
      {
        sks: "2 SKS",
        jam: "10:30 - 12:10",
        nama: "Bahasa Inggris Komunikasi Profesi",
        lokasi: "Ruang Diskusi B102",
        gedung: "Gedung Bersama Lt. 1",
      },
    ],
  },
  {
    hari: "JUMAT",
    matkul: [
      {
        sks: "2 SKS",
        jam: "08:00 - 10:00",
        nama: "Kewirausahaan Teknologi",
        lokasi: "Ruang Diskusi B201",
        gedung: "Gedung Bersama Lt. 1",
      },
    ],
  },
];

export default function JadwalKuliah() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-500">
            <CalendarDays size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0F2D5B]">
              Jadwal Perkuliahan Semester Ini
            </h3>
            <p className="text-[10px] text-gray-400">
              Jadwal perkuliahan semester ganjil yang diampu oleh mahasiswa
            </p>
          </div>
        </div>

        <select className="rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none">
          <option>Semester Ganjil 2026/2027</option>
          <option>Semester Genap 2025/2026</option>
        </select>
      </div>

      <div className="space-y-4">
        {jadwal.map((hari) => (
          <div key={hari.hari}>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
                ● {hari.hari}
              </span>

              <span className="text-[10px] text-gray-400">
                {hari.matkul.length} Mata Kuliah
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {hari.matkul.map((item) => (
                <div
                  key={item.nama}
                  className="rounded-lg border border-gray-100 bg-[#FAFBFD] p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600">
                      {item.sks}
                    </span>

                    <span className="flex items-center gap-1 text-[10px] text-blue-500">
                      <Clock size={11} />
                      {item.jam}
                    </span>
                  </div>

                  <h4 className="mb-3 text-xs font-bold text-[#0F2D5B]">
                    {item.nama}
                  </h4>

                  <div className="flex flex-wrap items-center gap-1 text-[10px] text-gray-500">
                    <MapPin size={11} />
                    {item.lokasi}
                    <span className="text-gray-300">•</span>
                    {item.gedung}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
