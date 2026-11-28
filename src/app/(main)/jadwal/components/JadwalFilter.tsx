
"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ChevronDown,
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
  tanggalDipilih: boolean;
  onTanggalApply: (value: string) => void;
  onToday: () => void;
  markedDates: string[];
  isToday: boolean;
}

interface FilterMenuProps {
  icon: ReactNode;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  onLabelClick?: () => void;
  active?: boolean;
  solidWhenOpen?: boolean;
}

function FilterMenu({
  icon,
  label,
  value,
  options,
  onChange,
  onLabelClick,
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

  const buttonStyle = `flex h-[38px] items-center gap-2 rounded-xl border px-3 text-sm transition ${
    solid
      ? "border-[#3B82F6] bg-[#3B82F6] text-white"
      : "border-[#dce5f2] bg-white text-[#344866] hover:border-[#93B4E5]"
  }`;

  return (
    <div className={`relative flex shrink-0 items-center ${onLabelClick ? (solid ? "h-[38px] min-w-[136px] rounded-xl border border-[#F97316] bg-[#F97316] text-white" : "h-[38px] min-w-[136px] rounded-xl border border-[#dce5f2] bg-white text-[#344866] hover:border-[#93B4E5]") : ""}`}>
      {onLabelClick ? (
        <>
          <button
            type="button"
            onClick={onLabelClick}
            className="flex h-full min-w-0 flex-1 items-center justify-center px-3 text-sm transition"
          >
            {icon}
            <span className="whitespace-nowrap">{label}</span>
          </button>

          <button
            type="button"
            aria-label={`Pilihan ${label}`}
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={`flex h-full items-center justify-center border-l px-2 transition ${solid ? "border-white/30 text-white" : "border-[#dce5f2] text-[#344866]"}`}
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </>
      ) : (
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={buttonStyle}
        >
          {icon}
          <span className="whitespace-nowrap">{label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}

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
            className="absolute left-0 top-full z-30 mt-2 w-max min-w-[180px] rounded-xl border border-[#e1e8f2] bg-white p-1 shadow-lg"
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
                      ? "bg-[#f1f5ff] font-semibold text-[#17365f]"
                      : "text-[#344866] hover:bg-[#f1f5ff]"
                  }`}
                >
                  {option.label}
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
  tanggalDipilih,
  onTanggalApply,
  onToday,
  markedDates,
  isToday,
}: JadwalFilterProps) {
  const semesterLabel =
    semesterOptions.find((option) => option.value === semester)?.label ?? "";

  return (
    <div className="min-w-0 rounded-2xl border border-[#E5ECF6] bg-white p-4 shadow-sm">
      <div className="flex flex-nowrap items-center gap-2 sm:gap-3">
        {/* Pencarian */}
        <div className="relative min-w-[150px] flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#91a3bb]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari mahasiswa, volunteer, mata kuliah, atau ruang..."
            className="h-[38px] w-full rounded-xl border border-[#dbe4ef] bg-[#fafcff] pl-10 pr-3 text-sm text-[#183963] outline-none placeholder:text-[#9aabc0] transition focus-visible:border-[#4b8df5] focus-visible:ring-2 focus-visible:ring-blue-200"
          />
        </div>

        {/* Filter Semester */}
        <FilterMenu
          icon={null}
          label={semesterLabel}
          value={semester}
          options={semesterOptions}
          onChange={setSemester}
        />

        {/* Tombol Hari Ini + dropdown status */}
        <FilterMenu
          icon={null}
          label="Hari Ini"
          value={status}
          options={statusOptions.map((item) => ({
            value: item,
            label: item === "Semua" ? "Semua Jadwal" : item,
          }))}
          onChange={(value) => setStatus(value as FilterStatus)}
          onLabelClick={onToday}
          active={isToday}
        />

        {/* Filter tanggal */}
        <JadwalCalendar
          tanggal={tanggal}
          tanggalDipilih={tanggalDipilih}
          onApply={onTanggalApply}
          markedDates={markedDates}
        />
      </div>
    </div>
  );
}
