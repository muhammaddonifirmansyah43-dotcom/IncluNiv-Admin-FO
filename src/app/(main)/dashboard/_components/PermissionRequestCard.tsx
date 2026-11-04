"use client";

import { useState } from "react";
import { permissionRequests } from "@/lib/dashboard-data";
import { DashboardPanel, PanelFooter, PanelHeading } from "./DashboardPanel";
import RequestItem from "./RequestItem";

export default function PermissionRequestCard() {
  const [search, setSearch] = useState("");

  const filtered = permissionRequests.filter((request) =>
    `${request.name} ${request.detail} ${request.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardPanel className="min-h-[225px] p-4">
      <PanelHeading>Pengajuan Perizinan</PanelHeading>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-[#E2EBF8] bg-[#F8FAFF] px-3 py-2.5">
        <span className="text-xs text-slate-500">Kapasitas Relawan</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <span
                key={item}
                className={`h-4 w-1.5 rounded-sm ${
                  item < 3 ? "bg-orange-400" : "bg-[#3B82F6]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold">76%</span>
        </div>
      </div>

      <label htmlFor="request-search" className="sr-only">
        Cari pengajuan
      </label>
      <input
        id="request-search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Cari pengajuan..."
        className="mt-3 h-9 w-full rounded-lg border border-[#D9E6F8] px-3 text-xs outline-none placeholder:text-slate-400 focus:border-[#3B82F6]"
      />

      <div className="mt-3 space-y-2">
        {filtered.map((request) => (
          <RequestItem key={request.name} {...request} />
        ))}
        {filtered.length === 0 && (
          <p className="py-4 text-center text-xs text-slate-400">
            Tidak ada pengajuan yang cocok.
          </p>
        )}
      </div>

      <PanelFooter
        actionLabel="Lihat semua pengajuan"
        href="/pengajuan"
        note={`${filtered.length} pengajuan`}
      />
    </DashboardPanel>
  );
}