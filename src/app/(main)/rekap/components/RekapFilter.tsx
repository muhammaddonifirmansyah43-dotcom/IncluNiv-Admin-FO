
"use client";

import { Search, ChevronDown } from "lucide-react";

interface RekapFilterProps {
  search: string;
  setSearch: (value: string) => void;
  pendamping: string;
  setPendamping: (value: string) => void;
  periode: string;
  setPeriode: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  namaPendamping: string[];
}

export default function RekapFilter({
  search,
  setSearch,
  pendamping,
  setPendamping,
  periode,
  setPeriode,
  semester,
  setSemester,
  namaPendamping,
}: RekapFilterProps) {
  const selectClass =
    "w-full appearance-none rounded-lg border border-[#DFE8F5] bg-[#F8FAFF] px-3 py-2.5 pr-8 text-xs font-medium text-[#29466D] outline-none focus:border-blue-400";

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#E5ECF6] bg-white p-3 shadow-sm md:grid-cols-2 xl:grid-cols-4">
      {/* Search */}
      <div className="flex items-center gap-2 rounded-lg border border-[#DFE8F5] bg-[#F8FAFF] px-3">
        <Search size={16} className="shrink-0 text-[#91A2BA]" />

        <input
          type="search"
          placeholder="Cari nama volunteer atau NIM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent py-2.5 text-xs text-[#29466D] outline-none placeholder:text-[#9AAAC0]"
        />
      </div>

      {/* Filter Pendamping */}
      <div className="relative">
        <select
          value={pendamping}
          onChange={(e) => setPendamping(e.target.value)}
          className={selectClass}
        >
          <option value="Semua">Semua Pendamping</option>

          {namaPendamping.map((nama) => (
            <option key={nama} value={nama}>
              {nama}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7185A2]"
        />
      </div>

      {/* Filter Periode */}
      <div className="relative">
        <select
          value={periode}
          onChange={(e) => setPeriode(e.target.value)}
          className={selectClass}
        >
          <option value="1 bulan terakhir">1 bulan terakhir</option>
          <option value="3 bulan terakhir">3 bulan terakhir</option>
          <option value="6 bulan terakhir">6 bulan terakhir</option>
          <option value="Semua periode">Semua periode</option>
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7185A2]"
        />
      </div>

      {/* Filter Semester */}
      <div className="relative">
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className={selectClass}
        >
          <option value="ganjil">Semester Ganjil 2026/2027</option>
          <option value="genap">Semester Genap 2026/2027</option>
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7185A2]"
        />
      </div>
    </div>
  );
}
