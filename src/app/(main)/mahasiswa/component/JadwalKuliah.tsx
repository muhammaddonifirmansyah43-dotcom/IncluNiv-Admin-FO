
"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

import JadwalHari from "./JadwalHari";
import {
  DEFAULT_SEMESTER,
  jadwalPerSemester,
  semesterOptions,
} from "./types";

export default function JadwalKuliah() {
  const [semester, setSemester] = useState(DEFAULT_SEMESTER);
  const [semesterOpen, setSemesterOpen] = useState(false);
  const semesterDropdownRef = useRef<HTMLDivElement>(null);

  const jadwal = jadwalPerSemester[semester] ?? [];
  const selectedSemester = semesterOptions.find(
    (option) => option.value === semester
  );
  const label = selectedSemester?.label ?? "";

  const totalMatkul = jadwal.reduce(
    (total, hari) => total + hari.matkul.length,
    0
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        semesterDropdownRef.current &&
        !semesterDropdownRef.current.contains(event.target as Node)
      ) {
        setSemesterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {/* Dropdown Semester */}
        <div
          ref={semesterDropdownRef}
          className="relative w-full sm:w-72"
        >
          <button
            type="button"
            aria-label="Pilih semester"
            aria-haspopup="listbox"
            aria-expanded={semesterOpen}
            onClick={() => setSemesterOpen((previous) => !previous)}
            className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm font-medium text-[#17345F] outline-none transition ${
              semesterOpen
                ? "border-[#3B82F6] ring-2 ring-blue-100"
                : "border-[#DCE6F2] hover:border-[#93B4E5]"
            }`}
          >
            <span>{label || "Pilih semester"}</span>

            <ChevronDown
              size={17}
              className={`shrink-0 text-[#64748B] transition-transform ${
                semesterOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {semesterOpen && (
            <div
              role="listbox"
              aria-label="Pilihan semester"
              className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#DCE6F2] bg-white p-1.5 shadow-[0_8px_24px_rgba(31,71,130,0.12)]"
            >
              {semesterOptions.map((option) => {
                const isSelected = semester === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSemester(option.value);
                      setSemesterOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      isSelected
                        ? "bg-[#E6F0FF] font-semibold text-[#17345F]"
                        : "text-[#334155] hover:bg-[#F1F5FB]"
                    }`}
                  >
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
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


