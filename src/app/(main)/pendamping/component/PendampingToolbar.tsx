
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
        className="flex h-[38px] w-[240px] shrink-0 items-center justify-between gap-2 rounded-xl border border-[#dce5f2] bg-white px-3 text-sm text-[#344866] transition hover:border-[#93B4E5] outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
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

          <div className="absolute right-0 top-full z-30 mt-2 max-h-64 w-[240px] overflow-y-auto dropdown-scrollbar rounded-xl border border-[#e1e8f2] bg-white p-1 shadow-lg">
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
                  item === value ? "bg-[#f1f5ff] font-semibold text-[#17365f]" : ""
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
    <div className="rounded-2xl border border-[#E5ECF6] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="pendamping-search" className="sr-only">
            Cari pendamping
          </label>

          <Search
            size={19}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a3bb]"
          />

          <input
            id="pendamping-search"
            type="text"
            placeholder="Cari nama volunteer atau NIM..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-[38px] w-full rounded-xl border border-[#dbe4ef] bg-[#fafcff] pl-11 pr-4 text-sm text-[#183963] outline-none transition placeholder:text-[#9aabc0] focus-visible:border-[#4b8df5] focus-visible:ring-2 focus-visible:ring-blue-200"
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

