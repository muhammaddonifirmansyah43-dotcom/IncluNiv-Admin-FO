
"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

import PageSizeSelect from "./PageSizeSelect";

interface MahasiswaToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  disability: string;
  disabilityOptions: string[];
  onDisabilityChange: (value: string) => void;
  faculty: string;
  facultyOptions: string[];
  onFacultyChange: (value: string) => void;
  limit: number;
  limitOptions: number[];
  onLimitChange: (value: number) => void;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const displayValue =
    label === "Fakultas" && value === "Semua Fakultas"
      ? "semua"
      : value;

  return (
    <div className="relative w-full shrink-0 sm:w-[210px]">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-[38px] w-full items-center justify-between gap-2 rounded-xl border border-[#dce5f2] bg-white px-3 text-sm text-[#344866] transition hover:border-[#93B4E5] outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
      >
        <span
          className="min-w-0 flex-1 truncate text-left"
          title={`${label}: ${displayValue}`}
        >
          {label}: {displayValue}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
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

          <div className="absolute right-0 top-full z-30 mt-2 max-h-64 w-full overflow-y-auto dropdown-scrollbar rounded-xl border border-[#dce5ef] bg-white p-1.5 shadow-lg">
            {options.map((item) => (
              <button
                key={item}
                type="button"
                title={item}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className={`w-full truncate rounded-lg px-3 py-2.5 text-left text-sm text-[#344866] outline-none transition hover:bg-[#f1f5ff] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 ${
                  item === value
                    ? "bg-[#f1f5ff] font-semibold text-[#17365f]"
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function MahasiswaToolbar({
  search,
  onSearchChange,
  disability,
  disabilityOptions,
  onDisabilityChange,
  faculty,
  facultyOptions,
  onFacultyChange,
  limit,
  limitOptions,
  onLimitChange,
}: MahasiswaToolbarProps) {
  return (
    <div className="rounded-2xl border border-[#e0e8f3] bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
        {/* Pencarian */}
        <div className="relative min-w-[180px] flex-[1.5]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a3bb]"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama mahasiswa atau NIM..."
            className="h-[38px] w-full rounded-xl border border-[#dbe4ef] bg-[#fafcff] pl-11 pr-4 text-sm text-[#183963] outline-none placeholder:text-[#9aabc0] transition focus-visible:border-[#4b8df5] focus-visible:ring-2 focus-visible:ring-blue-200"
          />
        </div>

        {/* Filter jenis disabilitas */}
        <FilterDropdown
          label="Jenis disabilitas"
          value={disability}
          options={disabilityOptions}
          onChange={onDisabilityChange}
        />

        {/* Filter fakultas */}
        <FilterDropdown
          label="Fakultas"
          value={faculty}
          options={facultyOptions}
          onChange={onFacultyChange}
        />

        {/* Jumlah data dan tombol reset */}
        <div className="shrink-0">
          <PageSizeSelect
            value={limit}
            options={limitOptions}
            onChange={onLimitChange}
          />
        </div>
      </div>
    </div>
  );
}

