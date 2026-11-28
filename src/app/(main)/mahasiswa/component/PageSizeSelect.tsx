"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";

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
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-[38px] min-w-[190px] items-center justify-between gap-2 rounded-xl border border-[#dce5f2] bg-white px-3 text-sm text-[#344866] transition hover:border-[#93B4E5] outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          <span>{value === 0 ? "Pilih Data" : `${value} Data`}</span>
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

            <div className="absolute right-0 top-full z-30 mt-2 w-full min-w-[190px] max-h-52 overflow-y-auto overscroll-contain dropdown-scrollbar rounded-xl border border-[#e1e8f2] bg-white p-1 shadow-lg">
              {options
                .filter((item) => item !== 0)
                .map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      onChange(item);
                      setOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm text-[#344866] outline-none transition hover:bg-[#f1f5ff] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 ${
                      item === value ? "bg-[#f1f5ff] font-semibold text-[#17365f]" : ""
                    }`}
                  >
                    {item} Data
                  </button>
                ))}
            </div>
          </>
        )}
      </div>

      {value !== 0 && (
        <button
          type="button"
          title="Kembalikan ke tampilan default"
          aria-label="Kembalikan ke tampilan default"
          onClick={() => {
            onChange(0);
            setOpen(false);
          }}
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl border border-[#dce5f2] bg-white text-[#344866] transition hover:border-[#93B4E5] hover:bg-[#f1f5ff] hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          <RotateCcw size={17} />
        </button>
      )}
    </div>
  );
}


