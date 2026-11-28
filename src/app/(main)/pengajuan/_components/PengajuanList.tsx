
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getPendingPermissions,
  mapPermissionsToPengajuan,
} from "@/lib/permissions";
import type { Pengajuan } from "@/types/pengajuan";

import PengajuanToolbar from "./PengajuanToolbar";
import PengajuanTable from "./PengajuanTable";
import type { DateFilterValue } from "./DateFilter";
import type { PengajuanStatus } from "@/types/pengajuan";

type StatusFilterValue = "semua" | PengajuanStatus;

const ROWS_PER_PAGE = 10;

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
    useState<DateFilterValue>("hari_ini");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilterValue>("semua");

  const [items, setItems] = useState<Pengajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let active = true;

    async function loadPermissions() {
      try {
        setLoading(true);
        setError(null);

        const response = await getPendingPermissions();
        const mappedItems = mapPermissionsToPengajuan(response.data);

        if (active) {
          setItems(mappedItems);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Gagal mengambil data pengajuan izin."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPermissions();

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const result = items.filter((item) => {
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
  }, [items, search, dateFilter, statusFilter]);

  // Kembalikan ke halaman pertama ketika pencarian atau filter berubah.
  useEffect(() => {
    setCurrentPage(1);
  }, [search, dateFilter, statusFilter]);

  // Hitung jumlah halaman.
  const pageCount = Math.max(
    1,
    Math.ceil(filtered.length / ROWS_PER_PAGE)
  );

  // Sesuaikan halaman jika jumlah data berkurang.
  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  // Ambil maksimal 10 data untuk halaman aktif.
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;

  const paginatedItems = filtered.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  const startItem = filtered.length === 0 ? 0 : startIndex + 1;

  const endItem = Math.min(
    startIndex + ROWS_PER_PAGE,
    filtered.length
  );

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
        {loading ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500">
            Memuat data pengajuan...
          </p>
        ) : error ? (
          <p className="px-4 py-10 text-center text-sm text-red-600">
            {error}
          </p>
        ) : (
          <>
            <PengajuanTable
              items={paginatedItems}
              startIndex={startIndex}
            />

            <div className="flex flex-col gap-4 border-t border-[#EEF3FB] bg-[#f8fafc] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Menampilkan{" "}
                <span className="font-bold text-[#3B82F6]">
                  {startItem}-{endItem}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-[#3B82F6]">
                  {filtered.length}
                </span>{" "}
                pengajuan
              </p>

              {pageCount > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    aria-label="Halaman sebelumnya"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce5ef] bg-white text-[#526681] transition hover:bg-[#eaf2ff] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>

                  {Array.from(
                    { length: pageCount },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      aria-current={
                        currentPage === page ? "page" : undefined
                      }
                      className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-[#3b82f6] text-white"
                          : "border border-[#dce5ef] bg-white text-[#526681] hover:bg-[#eaf2ff]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === pageCount}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    aria-label="Halaman berikutnya"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce5ef] bg-white text-[#526681] transition hover:bg-[#eaf2ff] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
