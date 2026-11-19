"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface RekapFilterProps {
  search: string;
  setSearch: (value: string) => void;
  periode: string;
  setPeriode: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
}

type DropdownOption = {
  value: string;
  label: string;
};

function FilterDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#DFE8F5] bg-white px-3 py-3 text-left text-sm font-medium text-[#29466D] outline-none transition hover:border-[#93B4E5] focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-blue-200"
      >
        <span className="min-w-0 flex-1 truncate">
          {selected?.label ?? ""}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 text-[#7185A2] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-30 mt-2 max-h-56 w-full overflow-y-auto overscroll-contain dropdown-scrollbar rounded-xl border border-[#DCE5F2] bg-white p-1.5 shadow-lg"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
            >
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm outline-none transition hover:bg-[#F0F5FF] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 ${
                  option.value === value
                    ? "bg-[#EAF2FF] font-semibold text-[#17365F]"
                    : "text-[#344866]"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RekapFilter({
  search,
  setSearch,
  periode,
  setPeriode,
  semester,
  setSemester,
}: RekapFilterProps) {
  const periodeOptions: DropdownOption[] = [
    { value: "1 bulan terakhir", label: "1 bulan terakhir" },
    { value: "3 bulan terakhir", label: "3 bulan terakhir" },
    { value: "6 bulan terakhir", label: "6 bulan terakhir" },
    { value: "Semua periode", label: "Semua periode" },
  ];

  const semesterOptions: DropdownOption[] = [
    { value: "ganjil", label: "Semester Ganjil 2026/2027" },
    { value: "genap", label: "Semester Genap 2026/2027" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#E5ECF6] bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-3">
      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl border border-[#DFE8F5] bg-white px-3">
        <Search size={18} className="shrink-0 text-[#91A2BA]" />

        <input
          type="search"
          placeholder="Cari nama volunteer atau NIM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent py-3 text-sm text-[#29466D] outline-none placeholder:text-[#9AAAC0]"
        />
      </div>

      {/* Filter Periode */}
      <FilterDropdown
        value={periode}
        options={periodeOptions}
        onChange={setPeriode}
      />

      {/* Filter Semester */}
      <FilterDropdown
        value={semester}
        options={semesterOptions}
        onChange={setSemester}
      />
    </div>
  );
}
