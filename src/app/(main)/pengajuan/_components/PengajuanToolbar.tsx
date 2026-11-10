import { ChevronDown, Search } from "lucide-react";
import type { PengajuanStatus } from "@/types/pengajuan";
import { statusFilterOptions } from "@/lib/pengajuan-status";

type StatusValue = "semua" | PengajuanStatus;

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusValue;
  onStatusChange: (value: StatusValue) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
};

const pageSizes = [5, 8, 10, 15];

const selectClass =
  "h-10 w-full appearance-none rounded-lg border border-[#E2EBF8] bg-white pl-3 pr-9 text-sm font-medium text-[#17345F] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100";

export default function PengajuanToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  pageSize,
  onPageSizeChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#E2EBF8] bg-white p-4 shadow-[0_4px_14px_rgba(31,71,130,0.07)] md:flex-row md:items-center md:justify-between">
      <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-[#E2EBF8] bg-[#F1F5FB] px-3 focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100 md:max-w-sm">
        <Search size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
        <label htmlFor="pengajuan-search" className="sr-only">
          Cari pengajuan
        </label>
        <input
          id="pengajuan-search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama pendamping, NIM ..."
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#17345F] outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:flex md:w-auto">
        <div className="relative md:w-44">
          <label htmlFor="filter-status" className="sr-only">
            Filter status
          </label>
          <select
            id="filter-status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as StatusValue)}
            className={selectClass}
          >
            {statusFilterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
        </div>

        <div className="relative md:w-40">
          <label htmlFor="page-size" className="sr-only">
            Jumlah data ditampilkan
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={selectClass}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size} pengajuan
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
    </div>
  );
}