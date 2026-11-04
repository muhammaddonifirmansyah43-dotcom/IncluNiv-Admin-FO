import type { NotificationFilter } from "@/types/notification";

type Props = {
  value: NotificationFilter;
  onChange: (filter: NotificationFilter) => void;
  totalCount: number;
  unreadCount: number;
};

export default function FilterTabs({
  value,
  onChange,
  totalCount,
  unreadCount,
}: Props) {
  const tabs: { key: NotificationFilter; label: string; count: number }[] = [
    { key: "all", label: "Semua", count: totalCount },
    { key: "unread", label: "Belum Dibaca", count: unreadCount },
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
            className={`inline-flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition ${
              active
                ? "border-[#3B82F6] bg-[#3B82F6] text-white"
                : "border-[#D9E6F8] bg-white text-slate-600 hover:bg-blue-50"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] leading-none ${
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