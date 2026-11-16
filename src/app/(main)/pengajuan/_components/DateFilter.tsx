
"use client";

import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-48">
      <label htmlFor="pengajuan-date-filter" className="sr-only">
        Filter tanggal pengajuan
      </label>

      <button
        id="pengajuan-date-filter"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-left text-sm font-medium text-[#17345F] outline-none transition ${
          open
            ? "border-[#3B82F6] ring-2 ring-blue-100"
            : "border-[#DCE6F2] hover:border-[#93B4E5]"
        }`}
      >
        <span>{selectedOption.label}</span>

        <ChevronDown
          size={16}
          className={`shrink-0 text-[#64748B] transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Pilihan filter tanggal"
          className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#DCE6F2] bg-white p-1.5 shadow-[0_8px_24px_rgba(31,71,130,0.12)]"
        >
          {options.map((option) => {
            const active = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 ${
                  active
                    ? "bg-[#E6F0FF] font-semibold text-[#17345F]"
                    : "text-slate-600 hover:bg-[#F1F5FB] hover:text-[#17345F]"
                }`}
              >
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

