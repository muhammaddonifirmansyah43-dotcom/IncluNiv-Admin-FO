import { Search } from "lucide-react";
import type { NotificationFilter } from "@/types/notification";
import FilterTabs from "./FilterTabs";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  filter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  totalCount: number;
  unreadCount: number;
};

export default function NotificationToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  totalCount,
  unreadCount,
}: Props) {
  return (
    <div className="space-y-3 rounded-xl border border-[#E2EBF8] bg-white p-4 shadow-[0_4px_14px_rgba(31,71,130,0.07)]">
      <label htmlFor="notification-search" className="sr-only">
        Cari notifikasi
      </label>
      <div className="flex h-11 items-center gap-3 rounded-lg border border-[#E2EBF8] bg-[#F1F5FB] px-3 focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100">
        <Search size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
        <input
          id="notification-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari pemberitahuan, nama relawan, atau nomor tiket..."
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#17345F] outline-none placeholder:text-slate-400"
        />
      </div>

      <FilterTabs
        value={filter}
        onChange={onFilterChange}
        totalCount={totalCount}
        unreadCount={unreadCount}
      />
    </div>
  );
}