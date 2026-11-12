
import { Clock, MapPin } from "lucide-react";

const riwayat = [
  {
    tanggal: "05 Okt 2026",
    waktu: "07:00 - 08:30",
    pendamping: "Lukito Adi Nugroho",
    lokasi: "Gedung Vokasi, Ruang A305",
    status: "Selesai",
  },
  {
    tanggal: "04 Okt 2026",
    waktu: "13:00 - 15:30",
    pendamping: "Gita Nurhasuma",
    lokasi: "Gedung Vokasi, Ruang A403",
    status: "Belum",
  },
  {
    tanggal: "02 Okt 2026",
    waktu: "08:00 - 10:30",
    pendamping: "Putra Adi",
    lokasi: "Gedung Vokasi, Ruang Seminar F102",
    status: "Selesai",
  },
  {
    tanggal: "01 Okt 2026",
    waktu: "10:20 - 12:00",
    pendamping: "Dian Novitasari",
    lokasi: "Perpustakaan Pusat, Lt. 1",
    status: "Selesai",
  },
  {
    tanggal: "30 Sep 2026",
    waktu: "07:00 - 09:30",
    pendamping: "Faris Ramadhan",
    lokasi: "Gedung A, Ruang Kuliah A201",
    status: "Selesai",
  },
  {
    tanggal: "28 Sep 2026",
    waktu: "13:00 - 15:00",
    pendamping: "Lukito Adi Nugroho",
    lokasi: "Lab Komputer 3, Gedung C",
    status: "Selesai",
  },
  {
    tanggal: "25 Sep 2026",
    waktu: "08:00 - 10:00",
    pendamping: "Anjani Tri Pandra",
    lokasi: "Gedung Vokasi, Ruang B104",
    status: "Selesai",
  },
  {
    tanggal: "24 Sep 2026",
    waktu: "10:20 - 12:10",
    pendamping: "Gita Nurhasuma",
    lokasi: "Gedung Vokasi, Ruang A401",
    status: "Selesai",
  },
  {
    tanggal: "22 Sep 2026",
    waktu: "07:00 - 08:40",
    pendamping: "Putra Adi",
    lokasi: "Gedung Vokasi, Ruang A305",
    status: "Selesai",
  },
  {
    tanggal: "19 Sep 2026",
    waktu: "13:00 - 15:30",
    pendamping: "Dian Novitasari",
    lokasi: "Gedung F, Ruang Diskusi Inklusi",
    status: "Selesai",
  },
];

export default function RiwayatPendampingan() {
  const selesai = riwayat.filter(
    (item) => item.status === "Selesai"
  ).length;

  const belum = riwayat.length - selesai;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#0F2D5B]">
            Riwayat Pendampingan Mahasiswa
          </h3>

          <p className="text-[10px] text-gray-400">
            Daftar rekapan aktivitas pendampingan mahasiswa selama proses belajar kampus terpadu.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">
          {riwayat.length} Total Sesi
        </span>
      </div>

      <div className="mb-4 flex justify-end">
        <select className="rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none">
          <option>Semester Ganjil 2026/2027</option>
          <option>Semester Genap 2025/2026</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left text-xs">
          <thead className="bg-[#F5F8FC] text-[#0F2D5B]">
            <tr>
              <th className="p-3 font-semibold">TANGGAL</th>
              <th className="p-3 font-semibold">WAKTU</th>
              <th className="p-3 font-semibold">PENDAMPING</th>
              <th className="p-3 font-semibold">LOKASI & AGENDA</th>
              <th className="p-3 font-semibold">STATUS</th>
            </tr>
          </thead>

          <tbody>
            {riwayat.map((item) => (
              <tr
                key={item.tanggal}
                className="border-b border-gray-100 hover:bg-blue-50/50"
              >
                <td className="p-3 text-gray-700">
                  {item.tanggal}
                </td>

                <td className="p-3 text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {item.waktu}
                  </span>
                </td>

                <td className="p-3 text-gray-700">
                  {item.pendamping}
                </td>

                <td className="p-3 text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-blue-500" />
                    {item.lokasi}
                  </span>
                </td>

                <td className="p-3">
                  {item.status === "Selesai" ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-600">
                      ● Selesai
                    </span>
                  ) : (
                    <span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] text-orange-600">
                      ● Belum
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <p className="text-[10px] text-gray-500">
          Total Riwayat Pendampingan: {riwayat.length} Sesi Pendampingan Terdaftar
        </p>

        <div className="flex gap-2 text-[10px]">
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">
            {selesai} Selesai
          </span>

          <span className="rounded-full bg-orange-50 px-2 py-1 text-orange-600">
            {belum} Belum
          </span>
        </div>
      </div>
    </div>
  );
}
