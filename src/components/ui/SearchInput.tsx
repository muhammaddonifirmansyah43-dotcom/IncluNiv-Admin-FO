"use client";

import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari data...",
}: SearchInputProps) {
  return (
    <label className="flex w-full max-w-sm items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus-within:border-[#3B82F6]">
      <Search size={17} className="shrink-0 text-slate-400" />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
      />
    </label>
  );
}