
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import { pageSizeOptions } from "@/lib/pendamping-data";

type Props = {
  value: number;
  onChange: (size: number) => void;
};

export default function PageSizeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tutup saat klik di luar atau tekan Esc.
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
    <div className="flex items-center gap-2">
      <div ref={ref} className="relative w-full sm:w-auto">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-[38px] w-full items-center justify-between gap-3 rounded-xl border border-[#dce5f2] bg-white px-4 text-sm text-[#344866] transition hover:border-[#93B4E5] outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 sm:min-w-[170px]"
        >
          <span>{value === 0 ? "Pilih Data" : `${value} Data`}</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute right-0 top-11 z-20 w-full min-w-[170px] max-h-52 overflow-y-auto overscroll-contain dropdown-scrollbar rounded-xl border border-[#e1e8f2] bg-white p-1 shadow-lg"
          >
            {pageSizeOptions
              .filter((size) => size !== 0)
              .map((size) => (
                <li key={size} role="option" aria-selected={size === value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(size);
                      setOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm outline-none transition hover:bg-[#f1f5ff] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 ${
                      size === value
                        ? "bg-[#f1f5ff] font-semibold text-[#17365f]"
                        : "text-[#344866]"
                    }`}
                  >
                    {size} Data
                  </button>
                </li>
              ))}
          </ul>
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
          <RotateCcw size={16} />
        </button>
      )}
    </div>
  );
}
