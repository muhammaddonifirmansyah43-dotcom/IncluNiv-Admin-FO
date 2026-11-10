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
  limit: number;
  limitOptions: number[];
  onLimitChange: (value: number) => void;
}

function DisabilityFilter({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-11 min-w-[220px] items-center justify-between gap-3 rounded-lg border border-[#dbe4ef] bg-white px-4 text-sm font-medium text-[#344866] transition hover:border-[#93B4E5]"
      >
        <span>Jenis disabilitas: {value}</span>
        <ChevronDown
          size={16}
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
          <div className="absolute right-0 top-full z-30 mt-2 w-full min-w-[220px] rounded-xl border border-[#dce5ef] bg-white p-1.5 shadow-lg">
            {options.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm text-[#344866] hover:bg-[#f0f5ff] ${
                  item === value ? "bg-[#EAF2FF] font-semibold" : ""
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
  limit,
  limitOptions,
  onLimitChange,
}: MahasiswaToolbarProps) {
  return (
    <div className="rounded-2xl border border-[#e0e8f3] bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a3bb]"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama mahasiswa atau NIM..."
            className="h-11 w-full rounded-lg border border-[#dbe4ef] bg-[#fafcff] pl-11 pr-4 text-sm text-[#183963] outline-none placeholder:text-[#9aabc0] focus:border-[#4b8df5] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <DisabilityFilter
          value={disability}
          options={disabilityOptions}
          onChange={onDisabilityChange}
        />

        <PageSizeSelect
          value={limit}
          options={limitOptions}
          onChange={onLimitChange}
        />
      </div>
    </div>
  );
}