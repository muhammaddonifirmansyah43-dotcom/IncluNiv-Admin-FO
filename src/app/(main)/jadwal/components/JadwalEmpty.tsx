"use client";

import { CalendarDays, ArrowLeft } from "lucide-react";

interface JadwalEmptyProps {
  onBack: () => void;
  semester?: boolean;
}

export default function JadwalEmpty({
  onBack,
  semester = false,
}: JadwalEmptyProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#DCE8FA] bg-white shadow-sm">

      <div className="flex min-h-[330px] flex-col items-center justify-center px-5 py-10 text-center">

        {/* Ilustrasi */}
        <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF5FF]">

          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#F97316] bg-white">

            <div className="absolute -top-1.5 left-2 h-3 w-1 rounded-full bg-[#153D70]" />

            <div className="absolute -top-1.5 right-2 h-3 w-1 rounded-full bg-[#153D70]" />

            <div className="absolute left-4 top-5 h-1 w-1 rounded-full bg-[#7185A5]" />

            <div className="absolute right-4 top-5 h-1 w-1 rounded-full bg-[#7185A5]" />

            <div className="absolute bottom-3 h-2 w-3 rounded-t-full border-t-2 border-[#7185A5]" />

            <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-tl-md bg-[#F97316] text-[9px] font-bold text-white">
              !
            </div>
          </div>

          <span className="absolute -right-1 top-0 text-sm text-[#3B82F6]">
            ✦
          </span>
        </div>

        <h3 className="text-sm font-bold text-[#F97316]">
          Jadwal tidak tersedia
        </h3>

        <p className="mt-2 max-w-[340px] text-[11px] leading-5 text-[#7185A5]">
          {semester
            ? "Belum ada sesi pendampingan yang terjadwal pada semester ini. Seluruh kegiatan akademik dan pendampingan belum tersedia."
            : "Tidak ada sesi pendampingan mahasiswa difabel yang terjadwal untuk tanggal ini. Seluruh kegiatan akademik dan pendampingan sedang tidak aktif."}
        </p>

        <button
          type="button"
          onClick={onBack}
          className="mt-5 flex items-center gap-2 rounded-lg bg-[#EFF6FF] px-4 py-2.5 text-[11px] font-semibold text-[#3B82F6] transition hover:bg-[#DBEAFE]"
        >
          <ArrowLeft size={13} />
          Kembali ke Jadwal Hari Ini
        </button>
      </div>

      <div className="border-t border-[#E5EDFA] bg-[#F7F9FE] px-4 py-3 text-[10px] text-[#7185A5]">
        Menampilkan 0 sesi pendampingan aktif
      </div>
    </div>
  );
}