
"use client";

import { useState } from "react";
import { notificationStore, useNotifications } from "@/lib/notification-store";
import type { NotificationFilter } from "@/types/notification";
import NotificationToolbar from "./NotificationToolbar";
import NotificationSection from "./NotificationSection";

export default function NotificationContent() {
  const items = useNotifications();
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const matched = items.filter((item) =>
    [item.title, item.description, item.category, item.extra]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );

  const unreadItems = matched.filter((item) => !item.read);
  const readItems = matched.filter((item) => item.read);

  const totalCount = items.length;
  const unreadCount = items.filter((item) => !item.read).length;
  const readCount = items.filter((item) => item.read).length;

  const visibleUnreadItems =
    filter === "all" || filter === "unread" ? unreadItems : [];

  const visibleReadItems =
    filter === "all" || filter === "read" ? readItems : [];

  return (
    <div className="space-y-6">
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
          countLabel={visibleUnreadItems.length + " Baru"}
          dotClass="bg-orange-500"
          items={visibleUnreadItems}
          onToggleRead={notificationStore.toggleRead}
        />
      )}

      {visibleReadItems.length > 0 && (
        <NotificationSection
          id="section-read"
          title="Sudah dibaca"
          countLabel={visibleReadItems.length + " Notifikasi"}
          dotClass="bg-slate-400"
          items={visibleReadItems}
          onToggleRead={notificationStore.toggleRead}
        />
      )}

      {visibleUnreadItems.length === 0 && visibleReadItems.length === 0 && (
        <p
          role="status"
          className="rounded-xl border border-[#E2EBF8] bg-white py-10 text-center text-sm text-slate-400"
        >
          Tidak ada notifikasi yang cocok.
        </p>
      )}
    </div>
  );
}
