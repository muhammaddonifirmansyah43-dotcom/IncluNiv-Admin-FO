"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import type { ScheduleDay as ScheduleDayType } from "@/types/pendamping";
import ScheduleDay from "./ScheduleDay";

const semesterOptions = [
  { value: "ganjil-2026", label: "Semester Ganjil 2026/2027" },
  { value: "genap-2025", label: "Semester Genap 2025/2026" },
];

export default function ScheduleTab({
  jadwal,
}: {
  jadwal: ScheduleDayType[];
}) {
  const [semester, setSemester] = useState("ganjil-2026");
  const [semesterOpen, setSemesterOpen] = useState(false);
  const semesterDropdownRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const jadwalAktif = semester === "ganjil-2026" ? jadwal : [];
  const label =
    semesterOptions.find((option) => option.value === semester)?.label ?? "";

  const totalMatkul = jadwalAktif.reduce(
    (total, hari) => total + hari.courses.length,
    0
  );

  return (
    <section className="rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-[#E8EEF6] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#E6F0FF] p-3 text-[#3B82F6]">
            <CalendarDays size={21} aria-hidden="true" />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#17345F]">
              Jadwal Perkuliahan
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Daftar mata kuliah pendamping pada {label}
            </p>
          </div>
        </div>

        <div
          className="relative w-full sm:w-72"
          ref={semesterDropdownRef}
        >
          <button
            type="button"
            aria-label="Pilih semester"
            aria-expanded={semesterOpen}
            onClick={() => setSemesterOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-xl border border-[#DCE6F2] bg-white px-4 py-3 text-sm font-medium text-[#17345F] shadow-sm transition hover:border-[#93B4E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/20"
          >
            <span className="whitespace-nowrap">{label}</span>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className={`shrink-0 text-[#64748B] transition-transform ${semesterOpen ? "rotate-180" : ""}`}
            />
          </button>

          {semesterOpen && (
            <div className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-xl border border-[#DCE6F2] bg-white p-1.5 shadow-lg">
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
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm whitespace-nowrap transition ${
                      isSelected
                        ? "bg-[#E6F0FF] font-semibold text-[#17345F]"
                        : "text-[#334155] hover:bg-[#F1F5FB]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-[#E6F0FF] px-3 py-2 text-xs font-semibold text-[#2563EB]">
          {jadwalAktif.length} Hari Perkuliahan
        </span>

        <span className="rounded-lg bg-[#F1F5FB] px-3 py-2 text-xs font-semibold text-slate-600">
          {totalMatkul} Mata Kuliah
        </span>
      </div>

      {jadwalAktif.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#DCE6F2] bg-[#FAFBFD] px-4 py-12 text-center">
          <CalendarDays
            size={30}
            aria-hidden="true"
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
          {jadwalAktif.map((hari) => (
            <ScheduleDay key={hari.hari} {...hari} />
          ))}
        </div>
      )}
    </section>
  );
}
