"use client";

import {
  CalendarDays,
  Clock,
  Flag,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";

interface JadwalEmptyProps {
  onBack: () => void;
  outOfSemester?: boolean;
}

const columns = [
  { label: "Waktu Sesi", icon: Clock, width: "w-[14%]" },
  { label: "Mahasiswa Difabel", icon: GraduationCap, width: "w-[22%]" },
  { label: "Pendamping / Volunteer", icon: Users, width: "w-[24%]" },
  { label: "Lokasi / Ruang", icon: MapPin, width: "w-[28%]" },
  { label: "Status", icon: Flag, width: "w-[12%] justify-center" },
];

function SadCalendar() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="48" cy="48" r="46" fill="#EEF5FF" />
      <rect
        x="26"
        y="30"
        width="44"
        height="42"
        rx="8"
        fill="white"
        stroke="#F97316"
        strokeWidth="3"
      />
      <path d="M26 38a8 8 0 0 1 8-8h28a8 8 0 0 1 8 8v4H26z" fill="#F97316" />
      <rect x="37" y="24" width="4" height="10" rx="2" fill="#153D70" />
      <rect x="55" y="24" width="4" height="10" rx="2" fill="#153D70" />
      <circle cx="41" cy="55" r="2" fill="#7185A5" />
      <circle cx="55" cy="55" r="2" fill="#7185A5" />
      <path
        d="M42 64q6-5 12 0"
        stroke="#7185A5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="58" y="58" width="18" height="18" rx="4" fill="#F97316" />
      <path d="M67 62l5.5 10h-11z" fill="white" />
      <rect x="66.2" y="65.5" width="1.6" height="3.2" rx="0.8" fill="#F97316" />
      <circle cx="67" cy="70" r="0.9" fill="#F97316" />
      <path d="M78 18l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#3B82F6" />
    </svg>
  );
}

export default function JadwalEmpty({
  onBack,
  outOfSemester = false,
}: JadwalEmptyProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e0e7f0] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <div className="flex min-w-[900px] border-b border-[#dfe6ef] bg-[#EEF4FD]">
          {columns.map(({ label, icon: Icon, width }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-[#17365f] ${width}`}
            >
              <Icon size={14} className="text-[#3B82F6]" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center px-5 py-14 text-center">
        <div className="mb-4">
          <SadCalendar />
        </div>

        <h3 className="text-lg font-bold text-[#F97316]">
          Jadwal tidak tersedia
        </h3>

        <p className="mt-2 max-w-[420px] text-sm leading-6 text-[#7185A5]">
          {outOfSemester
            ? "Tidak ada sesi pendampingan mahasiswa difabel yang terjadwal untuk semester ini. Seluruh kegiatan akademik dan pendampingan belum tersedia."
            : "Tidak ada sesi pendampingan mahasiswa difabel yang terjadwal untuk tanggal ini. Seluruh kegiatan akademik dan pendampingan sedang tidak aktif."}
        </p>

        <button
          type="button"
          onClick={onBack}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#EFF6FF] px-5 py-2.5 text-sm font-semibold text-[#3B82F6] transition hover:bg-[#DBEAFE]"
        >
          <CalendarDays size={16} />
          Kembali ke Jadwal Hari Ini
        </button>
      </div>

      <div className="border-t border-[#e0e7ef] bg-[#f8fafc] px-5 py-4 text-sm text-[#71829b]">
        Menampilkan{" "}
        <span className="font-semibold text-[#17365f]">0</span> sesi
        pendampingan aktif
      </div>
    </div>
  );
}