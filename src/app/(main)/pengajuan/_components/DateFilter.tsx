"use client";

import { ChevronDown } from "lucide-react";

export type DateFilterValue = "semua" | "hari_ini" | "7_hari" | "bulan_ini";

type Props = {
  value: DateFilterValue;
  onChange: (value: DateFilterValue) => void;
};

const options: { value: DateFilterValue; label: string }[] = [
  { value: "semua", label: "Semua tanggal" },
  { value: "hari_ini", label: "Hari ini" },
  { value: "7_hari", label: "7 hari terakhir" },
  { value: "bulan_ini", label: "Bulan ini" },
];

export default function DateFilter({ value, onChange }: Props) {
  return (
    <div className="relative w-full sm:w-48">
      <label htmlFor="pengajuan-date-filter" className="sr-only">
        Filter tanggal pengajuan
      </label>

      <select
        id="pengajuan-date-filter"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as DateFilterValue)
        }
        className="h-10 w-full appearance-none rounded-lg border border-[#E2EBF8] bg-white px-3 pr-9 text-sm font-medium text-[#17345F] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
  );
}