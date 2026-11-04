import { Search } from "lucide-react";
import PageSizeSelect from "./PageSizeSelect";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

export default function PendampingToolbar({
  search,
  onSearchChange,
  pageSize,
  onPageSizeChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#e3eaf5] bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="pendamping-search" className="sr-only">
            Cari pendamping
          </label>
          <Search
            size={19}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da0bd]"
          />
          <input
            id="pendamping-search"
            type="text"
            placeholder="Cari nama volunteer atau NIM..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-[38px] w-full rounded-xl border border-[#dce5f2] bg-[#f9fbff] pl-11 pr-4 text-sm text-[#193b6d] outline-none transition placeholder:text-[#9aabc3] focus:border-[#5b96ff]"
          />
        </div>

        <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
      </div>
    </div>
  );
}