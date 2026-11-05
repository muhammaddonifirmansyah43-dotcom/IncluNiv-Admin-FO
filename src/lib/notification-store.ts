import { useSyncExternalStore } from "react";
import { notifications as initial } from "@/lib/notification-data";
import type { NotificationItem } from "@/types/notification";

let items: NotificationItem[] = initial;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
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
  toggleRead(id: string) {
    items = items.map((item) =>
      item.id === id ? { ...item, read: !item.read } : item
    );
    emit();
  },
  markAllRead() {
    items = items.map((item) => ({ ...item, read: true }));
    emit();
  },
};

export function useNotifications() {
  return useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getSnapshot,
    notificationStore.getServerSnapshot
  );
}