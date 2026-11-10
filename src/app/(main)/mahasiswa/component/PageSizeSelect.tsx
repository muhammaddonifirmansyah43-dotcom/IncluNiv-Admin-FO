"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface PageSizeSelectProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

export default function PageSizeSelect({
  value,
  options,
  onChange,
}: PageSizeSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-11 min-w-[190px] items-center justify-between gap-3 rounded-lg border border-[#dbe4ef] bg-white px-4 text-sm font-medium text-[#344866] transition hover:border-[#93B4E5]"
      >
        <span>{value} data mahasiswa</span>
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
          <div className="absolute right-0 top-full z-30 mt-2 w-full min-w-[190px] rounded-xl border border-[#dce5ef] bg-white p-1.5 shadow-lg">
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
                {item} data mahasiswa
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}