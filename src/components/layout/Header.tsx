
"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-[64px] items-center justify-between gap-4 bg-[#0F2D5B] px-5 text-white md:px-7">
      <div className="flex min-w-0 flex-1 items-center">
        <label className="flex min-w-0 max-w-lg flex-1 items-center gap-3 rounded-lg bg-white/10 px-4 py-2.5">
          <Search
            size={20}
            strokeWidth={2.5}
            className="shrink-0 text-blue-100"
          />

          <input
            type="search"
            placeholder="Cari mahasiswa, relawan, jadwal..."
            aria-label="Cari mahasiswa, relawan, atau jadwal"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-blue-100"
          />
        </label>
      </div>

      <button
        type="button"
        aria-label="Notifikasi"
        title="Notifikasi"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition hover:bg-white/10"
      >
        <Bell size={25} strokeWidth={2.5} />
      </button>
    </header>
  );
}
