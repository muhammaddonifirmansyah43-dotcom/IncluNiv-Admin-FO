
"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

import JadwalHari from "./JadwalHari";
import {
  DEFAULT_SEMESTER,
  jadwalPerSemester,
  semesterOptions,
} from "./types";

export default function JadwalKuliah() {
  const [semester, setSemester] = useState(DEFAULT_SEMESTER);

  const jadwal = jadwalPerSemester[semester] ?? [];
  const label =
    semesterOptions.find((option) => option.value === semester)?.label ?? "";

  const totalMatkul = jadwal.reduce(
    (total, hari) => total + hari.matkul.length,
    0
  );

  return (
    <section className="rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:p-6">
      {/* Header Jadwal */}
      <div className="mb-6 flex flex-col gap-4 border-b border-[#E8EEF6] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#E6F0FF] p-3 text-[#3B82F6]">
            <CalendarDays size={21} />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17345F]">
              Jadwal Perkuliahan
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Daftar mata kuliah mahasiswa pada {label}
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <select
            value={semester}
            onChange={(event) => setSemester(event.target.value)}
            aria-label="Pilih semester"
            className="w-full appearance-none rounded-xl border border-[#DCE6F2] bg-white px-4 py-3 pr-10 text-sm font-medium text-[#263B55] outline-none transition hover:border-[#93B4E5] focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"
          >
            {semesterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>

      {/* Ringkasan */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-[#E6F0FF] px-3 py-2 text-xs font-semibold text-[#2563EB]">
          {jadwal.length} Hari Perkuliahan
        </span>

        <span className="rounded-lg bg-[#F1F5FB] px-3 py-2 text-xs font-semibold text-slate-600">
          {totalMatkul} Mata Kuliah
        </span>
      </div>

      {/* Daftar Jadwal */}
      {jadwal.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#DCE6F2] bg-[#FAFBFD] px-4 py-12 text-center">
          <CalendarDays
            size={30}
            className="mx-auto mb-3 text-slate-300"
          />
          <p className="text-sm font-semibold text-[#17345F]">
            Belum ada jadwal perkuliahan
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Belum tersedia jadwal untuk {label}.
          </p>
        </div>
      ) : (
        <div className="space-y-7">
          {jadwal.map((hari) => (
            <JadwalHari key={hari.hari} jadwal={hari} />
          ))}
        </div>
      )}
    </section>
  );
}
