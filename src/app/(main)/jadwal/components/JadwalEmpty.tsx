
"use client";

import { CalendarDays } from "lucide-react";

interface JadwalEmptyProps {
  onBack: () => void;
  outOfSemester?: boolean;
}

const th = "px-5 py-4 text-sm font-semibold text-[#17365f]";

export default function JadwalEmpty({
  onBack,
  outOfSemester = false,
}: JadwalEmptyProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e0e7f0] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
              <th scope="col" className={`${th} w-[14%] text-left`}>
                Waktu
              </th>
              <th scope="col" className={`${th} w-[22%] text-left`}>
                Mahasiswa Difabel
              </th>
              <th scope="col" className={`${th} w-[24%] text-left`}>
                Pendamping
              </th>
              <th scope="col" className={`${th} w-[28%] text-left`}>
                Lokasi / Ruang
              </th>
              <th scope="col" className={`${th} w-[12%] text-center`}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={5} className="px-5 py-12">
                <div className="flex flex-col items-center text-center">
<CalendarDays
  size={30}
  strokeWidth={2}
  className="mb-3 text-[#CBD5E1]"
/>

                  <h3 className="text-base font-bold text-[#17365f]">
                    Jadwal tidak tersedia
                  </h3>

                  <p className="mt-2 max-w-[420px] text-sm leading-6 text-[#7185A5]">
                    {outOfSemester
                      ? "Tidak ada jadwal pendampingan yang tersedia untuk semester yang dipilih."
                      : "Tidak ada jadwal pendampingan yang tersedia untuk tanggal atau filter yang dipilih."}
                  </p>

                  <button
                    type="button"
                    onClick={onBack}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#EFF6FF] px-5 py-2.5 text-sm font-semibold text-[#3B82F6] transition hover:bg-[#DBEAFE] outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
                  >
                    <CalendarDays size={16} />
                    Kembali ke Jadwal Hari Ini
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 border-t border-[#e0e7ef] bg-[#f8fafc] px-5 py-4 text-sm text-[#71829b]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#3B82F6]" />
        <p>
          Menampilkan{" "}
          <span className="font-semibold text-[#17365f]">0 sesi</span>{" "}
          pendampingan aktif
        </p>
      </div>
    </div>
  );
}
