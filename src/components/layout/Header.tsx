
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import NotificationBell from "@/components/layout/NotificationBell";
import { searchGlobalData } from "@/lib/global-search";

export default function Header() {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(
    () => searchGlobalData(keyword),
    [keyword]
  );

  function handleSelect(href: string) {
    router.push(href);
    setKeyword("");
    setIsOpen(false);
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && results.length > 0) {
      handleSelect(results[0].href);
    }
  }

  return (
    <header className="relative z-30 flex h-[64px] items-center gap-4 bg-[#0F2D5B] px-5 text-white md:px-7">
      <div ref={searchRef} className="relative min-w-0 flex-1 md:-ml-4">
        <label className="flex w-full max-w-2xl items-center gap-3 rounded-lg bg-white/10 px-4 py-2.5 transition-colors focus-within:bg-white/15">
          <Search
            size={20}
            strokeWidth={2.5}
            className="shrink-0 text-blue-100"
          />

          <input
            type="search"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Cari mahasiswa, pendamping, jadwal..."
            aria-label="Cari mahasiswa, pendamping, atau jadwal"
            aria-expanded={isOpen}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-blue-100"
          />
        </label>

        {isOpen && keyword.trim() !== "" && (
          <div className="absolute left-0 top-full z-50 mt-2 w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white py-2 text-slate-800 shadow-xl">
            {results.length > 0 ? (
              <>
                <p className="px-4 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Hasil pencarian
                </p>

                {results.map((item) => (
                  <button
                    key={`${item.category}-${item.id}`}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#E6F0FF]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#0F2D5B]">
                        {item.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-md bg-[#E6F0FF] px-2 py-1 text-[10px] font-semibold text-[#2563EB]">
                        {item.category}
                      </span>
                      <ArrowRight size={15} className="text-slate-400" />
                    </div>
                  </button>
                ))}
              </>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm font-medium text-slate-600">
                  Tidak ada hasil pencarian
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Coba gunakan nama, NIM, atau kata kunci lain.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0">
        <NotificationBell />
      </div>
    </header>
  );
}
