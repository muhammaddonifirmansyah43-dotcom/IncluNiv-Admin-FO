"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Clock, MapPin } from "lucide-react";

import {
  DEFAULT_SEMESTER,
  jadwalPerSemester,
  semesterOptions,
} from "./types";
import type { JadwalHari, Matkul } from "./types";

function MatkulCard({ item }: { item: Matkul }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-[#FAFBFD] p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
          {item.sks}
        </span>

        <span className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
          <Clock size={14} />
          {item.jam}
        </span>
      </div>

      <h4 className="mb-3 text-sm font-bold text-[#0F2D5B]">{item.nama}</h4>

      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-gray-600">
        <MapPin size={13} className="shrink-0" />
        {item.lokasi}
        <span className="text-gray-300">•</span>
        {item.gedung}
      </div>
    </div>
  );
}

function ScheduleDay({ jadwal }: { jadwal: JadwalHari }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          {jadwal.hari}
        </span>

        <span className="text-xs text-gray-500">
          {jadwal.matkul.length} mata kuliah
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {jadwal.matkul.map((item) => (
          <MatkulCard key={`${item.jam}-${item.nama}`} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function JadwalKuliah() {
  const [semester, setSemester] = useState(DEFAULT_SEMESTER);

  const jadwal = jadwalPerSemester[semester] ?? [];
  const label = semesterOptions.find((o) => o.value === semester)?.label ?? "";

  return (
    <div className="rounded-xl border border-[#DCE6F2] bg-white p-5 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-500">
            <CalendarDays size={20} />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#0F2D5B]">
              Jadwal Perkuliahan
            </h3>
            <p className="text-xs text-gray-500">
              Mata kuliah yang diampu mahasiswa pada {label}
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            aria-label="Pilih semester"
            className="w-full appearance-none rounded-lg border border-[#DCE6F2] bg-white px-4 py-3 pr-10 text-sm text-[#263B55] outline-none transition hover:border-[#93B4E5] focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"
          >
            {semesterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#526985]"
          />
        </div>
      </div>

      {jadwal.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#DCE6F2] bg-[#FAFBFD] px-4 py-12 text-center text-sm text-gray-500">
          Belum ada jadwal perkuliahan untuk {label}.
        </div>
      ) : (
        <div className="space-y-6">
          {jadwal.map((hari) => (
            <ScheduleDay key={hari.hari} jadwal={hari} />
          ))}
        </div>
      )}
    </div>
  );
}