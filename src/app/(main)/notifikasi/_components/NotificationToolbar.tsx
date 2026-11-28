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
  readCount: number;
};

export default function NotificationToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  totalCount,
  unreadCount,
  readCount,
}: Props) {
  return (
    <div className="space-y-3 rounded-2xl border border-[#E5ECF6] bg-white p-4 shadow-sm">
      <label htmlFor="notification-search" className="sr-only">
        Cari notifikasi
      </label>

      <div className="flex h-[38px] items-center gap-3 rounded-xl border border-[#dbe4ef] bg-[#fafcff] px-3 transition focus-within:border-[#4b8df5] focus-within:ring-2 focus-within:ring-blue-200">
        <Search
          size={18}
          className="shrink-0 text-[#91a3bb]"
          aria-hidden="true"
        />

        <input
          id="notification-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari pemberitahuan, nama relawan, atau nomor tiket..."
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#183963] outline-none placeholder:text-[#9aabc0]"
        />
      </div>

      <FilterTabs
        value={filter}
        onChange={onFilterChange}
        totalCount={totalCount}
        unreadCount={unreadCount}
        readCount={readCount}
      />
    </div>
  );
}
