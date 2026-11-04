import { CalendarDays, User } from "lucide-react";

export type TabKey = "diri" | "jadwal";

const tabs = [
  { key: "diri", label: "Data Diri", icon: User },
  { key: "jadwal", label: "Jadwal Kuliah", icon: CalendarDays },
] as const;

type Props = {
  value: TabKey;
  onChange: (tab: TabKey) => void;
};

export default function DetailTabs({ value, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Detail pendamping"
      className="grid grid-cols-2 gap-2 rounded-2xl border border-[#E2EBF8] bg-white p-1.5"
    >
      {tabs.map(({ key, label, icon: Icon }) => {
        const active = value === key;
        return (
          <button
            key={key}
            id={`tab-${key}`}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={`panel-${key}`}
            onClick={() => onChange(key)}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl text-xs font-semibold transition sm:text-sm ${
              active
                ? "bg-[#3B82F6] text-white shadow-sm"
                : "text-slate-600 hover:bg-blue-50"
            }`}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}