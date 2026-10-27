"use client";

import { Bell, Search, UserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 bg-[#0F2D5B] px-4 py-3 text-white sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <label className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-2">
          <Search size={17} className="shrink-0 text-blue-100" />

          <input
            type="search"
            placeholder="Cari mahasiswa, relawan, jadwal..."
            aria-label="Cari mahasiswa, relawan, atau jadwal"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-blue-100"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifikasi"
          className="rounded-full p-2 text-white hover:bg-white/10"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-white/15 text-white">
            <UserRound size={19} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">
              Admin
            </p>
            <p className="text-xs text-blue-100">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}