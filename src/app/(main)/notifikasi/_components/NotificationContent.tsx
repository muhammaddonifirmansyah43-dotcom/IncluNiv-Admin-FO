"use client";

import { useEffect, useState } from "react";
import {
  notificationStore,
  useNotifications,
} from "@/lib/notification-store";
import type { NotificationFilter } from "@/types/notification";

import NotificationToolbar from "./NotificationToolbar";
import NotificationSection from "./NotificationSection";

export default function NotificationContent() {
  const items = useNotifications();

  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [filter, setFilter] =
    useState<NotificationFilter>("all");

  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      const result = await notificationStore.load();

      if (active) {
        setIsDemo(!result.success);
        setHasMore(result.hasMore);
        setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  async function handleLoadMore() {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setLoadError("");

    try {
      const moreAvailable = await notificationStore.loadMore();
      setHasMore(moreAvailable);
    } catch (error) {
      console.error("Gagal memuat halaman berikutnya:", error);
      setLoadError(
        "Gagal memuat notifikasi tambahan. Silakan coba lagi."
      );
    } finally {
      setLoadingMore(false);
    }
  }

  const query = search.trim().toLowerCase();

  const matched = items.filter((item) =>
    [
      item.title,
      item.description,
      item.category,
      item.extra,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );

  const unreadItems = matched.filter(
    (item) => !item.read
  );

  const readItems = matched.filter(
    (item) => item.read
  );

  const totalCount = items.length;
  const unreadCount = items.filter(
    (item) => !item.read
  ).length;
  const readCount = items.filter(
    (item) => item.read
  ).length;

  const visibleUnreadItems =
    filter === "all" || filter === "unread"
      ? unreadItems
      : [];

  const visibleReadItems =
    filter === "all" || filter === "read"
      ? readItems
      : [];

  return (
    <div className="space-y-6">
      {loading && (
        <p className="text-sm text-slate-500">
          Memuat notifikasi Admin...
        </p>
      )}

      {!loading && isDemo && (
        <p className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-700">
          Mode Demo: Backend belum dapat memberikan data notifikasi.
          Status baca pada mode ini tidak tersimpan di MySQL.
        </p>
      )}

      {!loading && (
        <>
          <NotificationToolbar
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
            totalCount={totalCount}
            unreadCount={unreadCount}
            readCount={readCount}
          />

          {visibleUnreadItems.length > 0 && (
            <NotificationSection
              id="section-unread"
              title="Belum dibaca"
              countLabel={
                visibleUnreadItems.length + " Baru"
              }
              dotClass="bg-orange-500"
              items={visibleUnreadItems}
              onToggleRead={notificationStore.toggleRead}
            />
          )}

          {visibleReadItems.length > 0 && (
            <NotificationSection
              id="section-read"
              title="Sudah dibaca"
              countLabel={
                visibleReadItems.length + " Notifikasi"
              }
              dotClass="bg-slate-400"
              items={visibleReadItems}
              onToggleRead={notificationStore.toggleRead}
            />
          )}

          {visibleUnreadItems.length === 0 &&
            visibleReadItems.length === 0 && (
              <p
                role="status"
                className="rounded-xl border border-[#E2EBF8] bg-white py-10 text-center text-sm text-slate-400"
              >
                Tidak ada notifikasi yang cocok.
              </p>
            )}

          {hasMore && !isDemo && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2F73E8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingMore
                  ? "Memuat..."
                  : "Muat Lebih Banyak"}
              </button>
            </div>
          )}

          {loadError && (
            <p role="alert" className="text-center text-sm text-red-600">
              {loadError}
            </p>
          )}

          {!isDemo && (
            <p className="text-center text-xs text-slate-400">
              {totalCount} notifikasi telah dimuat.
              Pencarian dan filter berlaku pada data yang sudah dimuat.
            </p>
          )}
        </>
      )}
    </div>
  );
}