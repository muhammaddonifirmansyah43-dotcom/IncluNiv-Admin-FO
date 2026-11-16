
"use client";

import { useEffect, useRef, useState } from "react";
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
  const [statusOpen, setStatusOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  const selectedStatus = statusOptions.find(
    (option) => option.value === statusFilter
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setStatusOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#E2EBF8] bg-white p-4 shadow-[0_4px_14px_rgba(31,71,130,0.07)] sm:flex-row sm:items-center">
      {/* Pencarian */}
      <div className="flex h-10 w-full min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#E2EBF8] bg-[#F1F5FB] px-3 transition focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100">
        <Search
          size={18}
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

      {/* Filter tanggal */}
      <div className="relative w-full sm:w-48 sm:shrink-0">
        <DateFilter
          value={dateFilter}
          onChange={onDateFilterChange}
        />
      </div>

      {/* Filter status */}
      <div
        ref={statusDropdownRef}
        className="relative w-full sm:w-48 sm:shrink-0"
      >
        <label htmlFor="pengajuan-status-trigger" className="sr-only">
          Filter status pengajuan
        </label>

        <button
          id="pengajuan-status-trigger"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={statusOpen}
          onClick={() => setStatusOpen((previous) => !previous)}
          className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm font-medium text-[#17345F] outline-none transition ${
            statusOpen
              ? "border-[#3B82F6] ring-2 ring-blue-100"
              : "border-[#E2EBF8] hover:border-[#93B4E5]"
          }`}
        >
          <span>
            {statusFilter === "semua"
              ? "Semua status"
              : selectedStatus?.label ?? "Pilih status"}
          </span>

          <ChevronDown
            size={16}
            className={`shrink-0 text-[#64748B] transition-transform ${
              statusOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {statusOpen && (
          <div
            role="listbox"
            aria-label="Pilihan status pengajuan"
            className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#DCE6F2] bg-white p-1.5 shadow-[0_8px_24px_rgba(31,71,130,0.12)]"
          >
            {statusOptions.map((option) => {
              const isSelected = statusFilter === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onStatusFilterChange(
                      option.value as StatusFilterValue
                    );
                    setStatusOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-[#E6F0FF] font-semibold text-[#17345F]"
                      : "text-[#334155] hover:bg-[#F1F5FB]"
                  }`}
                >
                  <span>
                    {option.value === "semua"
                      ? "Semua status"
                      : option.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


