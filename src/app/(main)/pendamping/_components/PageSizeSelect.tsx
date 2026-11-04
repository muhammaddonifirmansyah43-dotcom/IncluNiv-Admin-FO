"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { pageSizeOptions } from "@/lib/pendamping-data";

type Props = {
  value: number;
  onChange: (size: number) => void;
};

export default function PageSizeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tutup saat klik di luar atau tekan Esc
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

  return (
    <div ref={ref} className="relative w-full sm:w-auto">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[38px] w-full items-center justify-between gap-3 rounded-xl border border-[#dce5f2] bg-white px-4 text-sm text-[#344866] sm:min-w-[170px]"
      >
        <span>{value} data volunteer</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-11 z-20 w-full min-w-[170px] rounded-xl border border-[#e1e8f2] bg-white p-1 shadow-lg"
        >
          {pageSizeOptions.map((size) => (
            <li key={size} role="option" aria-selected={size === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(size);
                  setOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f1f5ff] ${
                  size === value
                    ? "bg-[#f1f5ff] font-semibold text-[#17365f]"
                    : "text-[#344866]"
                }`}
              >
                {size} data volunteer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}