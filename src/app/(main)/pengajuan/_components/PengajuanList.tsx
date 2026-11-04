"use client";

import { useState } from "react";
import { pengajuanList } from "@/lib/pengajuan-data";
import type { PengajuanStatus } from "@/types/pengajuan";
import PengajuanToolbar from "./PengajuanToolbar";
import PengajuanTable from "./PengajuanTable";

export default function PengajuanList() {
  const [items, setItems] = useState(pengajuanList);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"semua" | PengajuanStatus>("semua");
  const [pageSize, setPageSize] = useState(8);

  const query = search.trim().toLowerCase();

const filtered = items.filter(
  (item) =>
    (status === "semua" || item.status === status) &&
    (item.nama + " " + item.nim).toLowerCase().includes(query)
);

  const visible = filtered.slice(0, pageSize);

  function handleDelete(id: string) {
    const target = items.find((item) => item.id === id);
    if (!window.confirm("Hapus pengajuan " + target.nama + "?")) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-4">
      <PengajuanToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      <div className="overflow-hidden rounded-xl border border-[#E2EBF8] bg-white shadow-[0_4px_14px_rgba(31,71,130,0.07)]">
        <PengajuanTable items={visible} onDelete={handleDelete} />

        <p className="border-t border-[#EEF3FB] px-4 py-3 text-xs text-slate-500">
          Menampilkan <span className="font-bold text-[#3B82F6]">{visible.length}</span> dari{" "}
          <span className="font-bold text-[#3B82F6]">{filtered.length}</span> data pengajuan
        </p>
      </div>
    </div>
  );
}