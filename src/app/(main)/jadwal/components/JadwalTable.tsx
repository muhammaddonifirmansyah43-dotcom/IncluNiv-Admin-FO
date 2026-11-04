
import { MapPin } from "lucide-react";
import type { Jadwal, StatusJadwal } from "./types";

interface JadwalTableProps {
  data: Jadwal[];
}

function StatusBadge({ status }: { status: StatusJadwal }) {
  const styles: Record<StatusJadwal, string> = {
    Selesai: "bg-green-100 text-green-700",
    Berlangsung: "bg-blue-100 text-blue-700",
    "Akan datang": "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function JadwalTable({ data }: JadwalTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#DCE6F2] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-left">
          <thead>
            <tr className="bg-[#F1F6FC] text-xs font-bold uppercase tracking-wide text-[#526985]">
              <th className="px-5 py-4">Waktu</th>
              <th className="px-5 py-4">Mahasiswa</th>
              <th className="px-5 py-4">Pendamping</th>
              <th className="px-5 py-4">Mata Kuliah</th>
              <th className="px-5 py-4">Lokasi</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8EEF5]">
            {data.map((item) => (
              <tr
                key={item.id}
                className="transition hover:bg-[#F8FAFD]"
              >
                <td className="whitespace-nowrap px-5 py-5">
                  <p className="text-sm font-semibold text-[#153D70]">
                    {item.waktu}
                  </p>
                  <p className="mt-1 text-xs text-[#8191A8]">
                    {item.tanggal}
                  </p>
                </td>

                <td className="px-5 py-5">
                  <p className="text-sm font-semibold text-[#263B55]">
                    {item.mahasiswa}
                  </p>
                  <p className="mt-1 text-xs text-[#8191A8]">
                    {item.nimMahasiswa}
                  </p>
                </td>

                <td className="px-5 py-5">
                  <p className="text-sm font-semibold text-[#263B55]">
                    {item.pendamping}
                  </p>
                  <p className="mt-1 text-xs text-[#8191A8]">
                    {item.nimPendamping}
                  </p>

                  {item.labelPendamping && (
                    <span className="mt-2 inline-block rounded-md bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700">
                      {item.labelPendamping}
                    </span>
                  )}
                </td>

                <td className="px-5 py-5">
                  <p className="text-sm font-medium text-[#263B55]">
                    {item.mataKuliah}
                  </p>
                  <p className="mt-1 text-xs text-[#8191A8]">
                    {item.kelas}
                  </p>
                </td>

                <td className="px-5 py-5">
                  <div className="flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-[#3B82F6]"
                    />
                    <span className="text-sm text-[#526985]">
                      {item.lokasi}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-5">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#E8EEF5] px-5 py-4">
        <p className="text-xs text-[#8191A8]">
          Menampilkan {data.length} jadwal pendampingan
        </p>
      </div>
    </div>
  );
}
