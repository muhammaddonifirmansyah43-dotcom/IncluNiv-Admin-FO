import type { NotificationFilter } from "@/types/notification";

type Props = {
  value: NotificationFilter;
  onChange: (filter: NotificationFilter) => void;
  totalCount: number;
  unreadCount: number;
  readCount: number;
};

export default function FilterTabs({
  value,
  onChange,
  totalCount,
  unreadCount,
  readCount,
}: Props) {
  const tabs: { key: NotificationFilter; label: string; count: number }[] = [
    { key: "all", label: "Semua", count: totalCount },
    { key: "unread", label: "Belum Dibaca", count: unreadCount },
    { key: "read", label: "Sudah Dibaca", count: readCount },
  ];

  return (
    <div role="group" aria-label="Filter notifikasi" className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = value === tab.key;
        const isUnreadTab = tab.key === "unread";

        return (
          <button
            key={tab.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(tab.key)}
            className={`inline-flex h-[38px] items-center gap-2 rounded-xl border px-3 text-sm font-semibold transition ${
              active
                ? "border-[#3B82F6] bg-[#3B82F6] text-white"
                : "border-[#dce5f2] bg-white text-[#344866] hover:border-[#93B4E5] hover:bg-[#f1f5ff]"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs leading-none ${
                active
                  ? "bg-white/25 text-white"
                  : isUnreadTab
                    ? "bg-orange-500 text-white"
                    : "bg-slate-200 text-slate-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
