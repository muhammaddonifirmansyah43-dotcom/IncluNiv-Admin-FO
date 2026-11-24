"use client";

import { useMemo, useState } from "react";
import { pengajuanList } from "@/lib/pengajuan-data";

import PengajuanToolbar from "./PengajuanToolbar";
import PengajuanTable from "./PengajuanTable";
import type { DateFilterValue } from "./DateFilter";
import type { PengajuanStatus } from "@/types/pengajuan";

type StatusFilterValue = "semua" | PengajuanStatus;

function parseDisplayDate(value: string): Date | null {
  const parts = value.match(/\d+/g);

  if (!parts || parts.length < 3) return null;

  const [day, month, year] = parts.map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function isSameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export default function PengajuanList() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] =
    useState<DateFilterValue>("bulan_ini");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilterValue>("semua");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const result = pengajuanList.filter((item) => {
      const matchSearch =
        !query ||
        `${item.nama} ${item.nim}`.toLowerCase().includes(query);

      const matchStatus =
        statusFilter === "semua" || item.status === statusFilter;

      const itemDate = parseDisplayDate(item.tanggalSingkat);
      let matchDate = true;

      if (dateFilter !== "semua") {
        if (!itemDate) {
          matchDate = false;
        } else {
          itemDate.setHours(0, 0, 0, 0);

          switch (dateFilter) {
            case "hari_ini":
              matchDate = isSameDay(itemDate, today);
              break;

            case "7_hari":
              matchDate =
                itemDate >= sevenDaysAgo && itemDate <= today;
              break;

            case "bulan_ini":
              matchDate =
                itemDate.getMonth() === today.getMonth() &&
                itemDate.getFullYear() === today.getFullYear();
              break;
          }
        }
      }

      return matchSearch && matchDate && matchStatus;
    });

    return [...result].sort((a, b) => {
      if (a.status !== b.status) {
        if (a.status === "dalam_proses") return -1;
        if (b.status === "dalam_proses") return 1;
      }

      const dateA =
        parseDisplayDate(a.tanggalSingkat)?.getTime() ?? 0;
      const dateB =
        parseDisplayDate(b.tanggalSingkat)?.getTime() ?? 0;

      return dateB - dateA;
    });
  }, [search, dateFilter, statusFilter]);

  return (
    <div className="space-y-4">
      <PengajuanToolbar
        search={search}
        onSearchChange={setSearch}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="overflow-hidden rounded-xl border border-[#E2EBF8] bg-white shadow-[0_4px_14px_rgba(31,71,130,0.07)]">
        <PengajuanTable items={filtered} />

        <p className="border-t border-[#EEF3FB] px-4 py-3 text-xs text-slate-500">
          Menampilkan{" "}
          <span className="font-bold text-[#3B82F6]">
            {filtered.length}
          </span>{" "}
          pengajuan
        </p>
      </div>
    </div>
  );
}