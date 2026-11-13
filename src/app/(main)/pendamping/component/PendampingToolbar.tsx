
"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import PageSizeSelect from "./PageSizeSelect";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  faculty: string;
  facultyOptions: string[];
  onFacultyChange: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

function FacultyFilter({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const displayValue =
    value === "Semua Fakultas" ? "semua" : value;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-[38px] w-[240px] shrink-0 items-center justify-between gap-3 rounded-xl border border-[#dce5f2] bg-white px-4 text-sm font-medium text-[#344866] transition hover:border-[#93B4E5]"
      >
        <span
          className="min-w-0 flex-1 truncate text-left"
          title={`Fakultas: ${displayValue}`}
        >
          Fakultas: {displayValue}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
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

          <div className="absolute right-0 top-full z-30 mt-2 max-h-64 w-[240px] overflow-y-auto rounded-xl border border-[#dce5ef] bg-white p-1.5 shadow-lg">
            {options.map((item) => (
              <button
                key={item}
                type="button"
                title={item}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className={`w-full truncate rounded-lg px-3 py-2.5 text-left text-sm text-[#344866] hover:bg-[#f0f5ff] ${
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

export default function PendampingToolbar({
  search,
  onSearchChange,
  faculty,
  facultyOptions,
  onFacultyChange,
  pageSize,
  onPageSizeChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#e3eaf5] bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="pendamping-search" className="sr-only">
            Cari pendamping
          </label>

          <Search
            size={19}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da0bd]"
          />

          <input
            id="pendamping-search"
            type="text"
            placeholder="Cari nama volunteer atau NIM..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-[38px] w-full rounded-xl border border-[#dce5f2] bg-[#f9fbff] pl-11 pr-4 text-sm text-[#193b6d] outline-none transition placeholder:text-[#9aabc3] focus:border-[#5b96ff]"
          />
        </div>

        <FacultyFilter
          value={faculty}
          options={facultyOptions}
          onChange={onFacultyChange}
        />

        <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
      </div>
    </div>
  );
}
