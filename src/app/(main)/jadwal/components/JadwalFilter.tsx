"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  GraduationCap,
  Search,
} from "lucide-react";

import JadwalCalendar from "./JadwalCalendar";
import { semesterOptions, statusOptions } from "./types";
import type { FilterStatus } from "./types";

interface JadwalFilterProps {
  search: string;
  setSearch: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  status: FilterStatus;
  setStatus: (value: FilterStatus) => void;
  tanggal: string;
  setTanggal: (value: string) => void;
  markedDates: string[];
}

interface FilterMenuProps {
  icon: ReactNode;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  active?: boolean; // tombol berwarna solid biru
  solidWhenOpen?: boolean;
}

function FilterMenu({
  icon,
  label,
  value,
  options,
  onChange,
  active = false,
  solidWhenOpen = false,
}: FilterMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const solid = active || (solidWhenOpen && open);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex h-[38px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm font-medium transition ${
          solid
            ? "bg-[#3B82F6] text-white"
            : "bg-[#EAF2FF] text-[#2563C9] hover:bg-[#DCE9FF]"
        }`}
      >
        {icon}
        <span className="whitespace-nowrap">{label}</span>
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Tutup pilihan"
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            role="listbox"
            className="absolute left-0 top-full z-30 mt-2 w-max min-w-[180px] rounded-xl border border-[#dce5ef] bg-white p-1.5 shadow-lg"
          >
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    selected
                      ? "bg-[#FDEFE2] font-semibold text-[#17365f]"
                      : "text-[#344866] hover:bg-[#f0f5ff]"
                  }`}
                >
                  {option.label}
                  {selected && <Check size={15} className="text-[#F97316]" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function JadwalFilter({
  search,
  setSearch,
  semester,
  setSemester,
  status,
  setStatus,
  tanggal,
  setTanggal,
  markedDates,
}: JadwalFilterProps) {
  const semesterLabel =
    semesterOptions.find((option) => option.value === semester)?.label ?? "";

  return (
    <div className="min-w-0 rounded-2xl border border-[#e0e8f3] bg-white p-3 shadow-sm">
      <div className="flex flex-nowrap items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a3bb]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari mahasiswa, volunteer, mata kuliah, atau ruang..."
            className="h-[38px] w-full rounded-lg bg-[#F1F5FA] pl-11 pr-4 text-sm text-[#183963] outline-none placeholder:text-[#9aabc0] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <FilterMenu
          icon={<GraduationCap size={16} />}
          label={semesterLabel}
          value={semester}
          options={semesterOptions}
          onChange={setSemester}
        />

        <FilterMenu
          icon={<CalendarDays size={16} />}
          label={status === "Semua" ? "Hari ini" : status}
          value={status}
          options={statusOptions.map((item) => ({ value: item, label: item }))}
          onChange={(value) => setStatus(value as FilterStatus)}
          active={status !== "Semua"}
          solidWhenOpen
        />

        <JadwalCalendar
          tanggal={tanggal}
          onApply={setTanggal}
          markedDates={markedDates}
        />
      </div>
    </div>
  );
}