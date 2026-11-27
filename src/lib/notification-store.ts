import { useSyncExternalStore } from "react";
import { notifications as initial } from "@/lib/notification-data";
import {
  getAdminNotifications,
  markNotificationRead,
  markNotificationUnread,
} from "@/lib/notification-api";
import { toNotificationItem } from "@/lib/notification-adapter";
import type { NotificationItem } from "@/types/notification";

let items: NotificationItem[] = initial;
let source: "demo" | "api" = "demo";

let currentPage = 1;
let totalPages = 1;
let loadingMore = false;
let loadVersion = 0;

const PAGE_SIZE = 20;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function setItems(nextItems: NotificationItem[]) {
  items = nextItems;
  emit();
}

function setReadLocally(id: string, read: boolean) {
  setItems(
    items.map((item) =>
      item.id === id
        ? {
            ...item,
            read,
            badge: {
              label: read ? "Sudah Dibaca" : "Belum Dibaca",
              tone: read ? "green" : "orange",
            },
          }
        : item
    )
  );
}

export const notificationStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot() {
    return items;
  },

  getServerSnapshot() {
    return initial;
  },

  // Memuat halaman pertama dari Backend
  async load() {
    const version = ++loadVersion;
    loadingMore = false;

    try {
      const result = await getAdminNotifications(1, PAGE_SIZE);

      if (version !== loadVersion) {
        return { success: true, hasMore: false };
      }

      source = "api";
      currentPage = 1;
      totalPages = result.pagination.totalPages;

      setItems(result.items.map(toNotificationItem));

      return {
        success: true,
        hasMore: currentPage < totalPages,
      };
    } catch (error) {
      if (version !== loadVersion) {
        return { success: false, hasMore: false };
      }

      console.error("Gagal mengambil notifikasi:", error);

      source = "demo";
      currentPage = 1;
      totalPages = 1;

      setItems([...initial]);

      return {
        success: false,
        hasMore: false,
      };
    }
  },

  // Mengambil halaman berikutnya tanpa menghapus data lama
  async loadMore() {
    if (
      source !== "api" ||
      loadingMore ||
      currentPage >= totalPages
    ) {
      return currentPage < totalPages;
    }

    loadingMore = true;
    const version = loadVersion;

    try {
      const nextPage = currentPage + 1;

      const result = await getAdminNotifications(
        nextPage,
        PAGE_SIZE
      );

      if (version !== loadVersion) {
        return false;
      }

      const incoming = result.items.map(toNotificationItem);

      // Mencegah data dengan ID yang sama tampil dua kali
      const existingIds = new Set(
        items.map((item) => item.id)
      );

      const uniqueItems = incoming.filter(
        (item) => !existingIds.has(item.id)
      );

      currentPage = nextPage;
      totalPages = result.pagination.totalPages;

      setItems([...items, ...uniqueItems]);

      return currentPage < totalPages;
    } finally {
      if (version === loadVersion) {
        loadingMore = false;
      }
    }
  },

  // Mengubah sudah dibaca atau belum dibaca
  async toggleRead(id: string) {
    const item = items.find(
      (notification) => notification.id === id
    );

    if (!item) return;

    const nextRead = !item.read;

    if (source === "demo") {
      setReadLocally(id, nextRead);
      return;
    }

    const numericId = Number(id);

    if (
      !Number.isSafeInteger(numericId) ||
      numericId <= 0
    ) {
      return;
    }

    try {
      const updated = nextRead
        ? await markNotificationRead(numericId)
        : await markNotificationUnread(numericId);

      setReadLocally(id, updated.readAt !== null);
    } catch (error) {
      console.error(
        "Gagal mengubah status notifikasi:",
        error
      );
    }
  },

  // Mempertahankan fungsi tandai semua dibaca
  async markAllRead() {
    const unread = items.filter((item) => !item.read);

    if (source === "demo") {
      setItems(
        items.map((item) => ({
          ...item,
          read: true,
          badge: {
            label: "Sudah Dibaca",
            tone: "green" as const,
          },
        }))
      );
      return;
    }

    for (const item of unread) {
      await notificationStore.toggleRead(item.id);
    }
  },
};

export function useNotifications() {
  return useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getSnapshot,
    notificationStore.getServerSnapshot
  );
}