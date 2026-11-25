
import { MapPin } from "lucide-react";

import { formatTanggal } from "./types";
import type { Jadwal, StatusJadwal } from "./types";

interface JadwalTableProps {
  data: Jadwal[];
  tanggal: string;
}

const th = "px-5 py-4 text-sm font-semibold text-[#17365f]";

const statusStyle: Record<StatusJadwal, string> = {
  Selesai: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Berlangsung: "border-blue-200 bg-blue-50 text-blue-600",
  "Akan datang": "border-orange-200 bg-orange-50 text-orange-600",
};

function StatusBadge({ status }: { status: StatusJadwal }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
    >
      {status === "Berlangsung" && (
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      )}
      {status}
    </span>
  );
}

export default function JadwalTable({ data, tanggal }: JadwalTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#DCE6F2] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <caption className="sr-only">
            Daftar jadwal pendampingan
          </caption>

          <thead>
            <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
              <th scope="col" className={`${th} w-[14%] text-left`}>
                Waktu
              </th>
              <th scope="col" className={`${th} w-[23%] text-left`}>
                Mahasiswa Difabel
              </th>
              <th scope="col" className={`${th} w-[25%] text-left`}>
                Pendamping
              </th>
              <th scope="col" className={`${th} w-[23%] text-left`}>
                Lokasi / Ruang
              </th>
              <th scope="col" className={`${th} w-[15%] text-center`}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              const live = item.status === "Berlangsung";

              return (
                <tr
                  key={item.id}
                  className={`border-b border-[#e8edf4] transition ${
                    live ? "bg-[#F5F9FF]" : "hover:bg-[#F8FAFD]"
                  }`}
                >
                  <td
                    className={`whitespace-nowrap px-5 py-4 text-sm font-bold ${
                      live ? "text-[#2563C9]" : "text-[#17365f]"
                    }`}
                  >
                    {item.waktu}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-[#17365f]">
                      {item.mahasiswa}
                    </p>
                    <p className="mt-0.5 text-xs text-[#657892]">
                      NIM {item.nimMahasiswa}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-[#17365f]">
                      {item.pendamping}
                    </p>

                    {item.aiMatch && (
                      <span className="mt-1 inline-block rounded border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-xs font-bold text-orange-600">
                        AI MATCH
                      </span>
                    )}

                    <p className="mt-0.5 text-xs text-[#657892]">
                      NIM {item.nimPendamping}
                    </p>

                    {item.pendampingAsli && (
                      <p className="mt-0.5 text-xs text-gray-400 line-through">
                        {item.pendampingAsli}
                      </p>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <p
                      className={`flex items-start gap-1.5 text-sm text-[#526681] ${
                        live ? "font-semibold" : ""
                      }`}
                    >
                      <MapPin
                        size={15}
                        className="mt-0.5 shrink-0 text-[#3B82F6]"
                      />
                      <span>{item.lokasi || "Belum ditentukan"}</span>
                    </p>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 border-t border-[#e0e7ef] bg-[#f8fafc] px-5 py-4 text-sm text-[#71829b]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#3B82F6]" />
        <p>
          Menampilkan{" "}
          <span className="font-semibold text-[#17365f]">
            {data.length} sesi
          </span>{" "}
          terdaftar untuk tanggal{" "}
          <span className="font-semibold text-[#17365f]">
            {formatTanggal(tanggal, false)}
          </span>
        </p>
      </div>
    </div>
  );
}
