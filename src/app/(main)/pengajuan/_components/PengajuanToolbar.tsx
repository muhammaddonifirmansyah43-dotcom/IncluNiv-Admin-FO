"use client";

import { ChevronDown, Search } from "lucide-react";
import DateFilter, { type DateFilterValue } from "./DateFilter";
import { statusOptions } from "@/lib/pengajuan-status";
import type { PengajuanStatus } from "@/types/pengajuan";

type StatusFilterValue = "semua" | PengajuanStatus;

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  dateFilter: DateFilterValue;
  onDateFilterChange: (value: DateFilterValue) => void;
  statusFilter: StatusFilterValue;
  onStatusFilterChange: (value: StatusFilterValue) => void;
};

export default function PengajuanToolbar({
  search,
  onSearchChange,
  dateFilter,
  onDateFilterChange,
  statusFilter,
  onStatusFilterChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#E2EBF8] bg-white p-4 shadow-[0_4px_14px_rgba(31,71,130,0.07)] sm:flex-row sm:items-center">
      <div className="flex h-10 w-full min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#E2EBF8] bg-[#F1F5FB] px-3 transition focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100">
        <Search
          size={16}
          className="shrink-0 text-slate-400"
          aria-hidden="true"
        />

        <label htmlFor="pengajuan-search" className="sr-only">
          Cari pengajuan
        </label>

        <input
          id="pengajuan-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari nama pendamping, NIM ..."
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#17345F] outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="relative w-full sm:w-48 sm:shrink-0">
        <DateFilter
          value={dateFilter}
          onChange={onDateFilterChange}
        />
      </div>

      <div className="relative w-full sm:w-48 sm:shrink-0">
        <label htmlFor="pengajuan-status-filter" className="sr-only">
          Filter status pengajuan
        </label>

        <select
          id="pengajuan-status-filter"
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as StatusFilterValue)
          }
          className="h-10 w-full appearance-none rounded-lg border border-[#E2EBF8] bg-white px-3 pr-9 text-sm font-medium text-[#17345F] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value === "semua" ? "Semua status" : option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}