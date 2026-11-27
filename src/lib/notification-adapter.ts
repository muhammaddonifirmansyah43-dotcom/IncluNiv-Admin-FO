import type { ApiNotification } from "@/lib/notification-api";

import type {
  NotificationItem,
  NotificationIconKey,
  ActionIconKey,
} from "@/types/notification";

type NavigationConfig = {
  href: string;
  category: string;
  icon: NotificationIconKey;
  actionIcon: ActionIconKey;
};

const routes: Record<string, NavigationConfig> = {
  PERMISSION_SUBMITTED: {
    href: "/pengajuan",
    category: "Pengajuan Izin",
    icon: "volunteer",
    actionIcon: "arrowRight",
  },

  ASSIGNMENT_CREATED: {
    href: "/jadwal",
    category: "Penjadwalan",
    icon: "calendar",
    actionIcon: "calendar",
  },

  RECAP_READY: {
    href: "/rekap",
    category: "Rekap Pendampingan",
    icon: "check",
    actionIcon: "eye",
  },
};

const defaultRoute: NavigationConfig = {
  href: "/notifikasi",
  category: "Sistem",
  icon: "database",
  actionIcon: "eye",
};

export function toNotificationItem(
  data: ApiNotification
): NotificationItem {
  const config =
    data.type &&
    Object.prototype.hasOwnProperty.call(routes, data.type)
      ? routes[data.type]
      : defaultRoute;

  const read = data.readAt !== null;

  const created = new Date(data.createdAt);

  const time = Number.isNaN(created.getTime())
    ? "Waktu tidak diketahui"
    : created.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        dateStyle: "medium",
        timeStyle: "short",
      });

  const validReference =
    typeof data.referenceId === "number" &&
    Number.isSafeInteger(data.referenceId) &&
    data.referenceId > 0;

  return {
    id: String(data.id),
    title: data.title,
    description: data.body,

    icon: config.icon,
    tone: read ? "green" : "blue",

    badge: {
      label: read ? "Sudah Dibaca" : "Belum Dibaca",
      tone: read ? "green" : "orange",
    },

    time,
    category: config.category,

    extra: validReference
      ? "Notifikasi #" + data.id +
        " | Referensi #" + data.referenceId
      : "Notifikasi #" + data.id,

    read,

    action: {
      label: config.href === "/notifikasi"
        ? "Lihat Notifikasi"
        : "Lihat Halaman Terkait",
      href: config.href,
      variant: "outline",
      icon: config.actionIcon,
    },
  };
}