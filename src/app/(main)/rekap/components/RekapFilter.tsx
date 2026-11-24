
"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import type { RecapSemester, RecapWeek } from "@/lib/recap";

interface RekapFilterProps {
  search: string;
  setSearch: (value: string) => void;
  semester: RecapSemester;
  setSemester: (value: RecapSemester) => void;
  month: number;
  setMonth: (value: number) => void;
  week: RecapWeek;
  setWeek: (value: RecapWeek) => void;
  months: { value: number; label: string }[];
  weeks: RecapWeek[];
}

type DropdownType = "semester" | "month" | "week" | null;

export default function RekapFilter({
  search,
  setSearch,
  semester,
  setSemester,
  month,
  setMonth,
  week,
  setWeek,
  months,
  weeks,
}: RekapFilterProps) {
  const [openDropdown, setOpenDropdown] =
    useState<DropdownType>(null);

  const filterRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const academicYearStart =
    currentMonth >= 8 ? currentYear : currentYear - 1;

  const academicYear =
    `${academicYearStart}/${academicYearStart + 1}`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const buttonClass =
    "flex h-[38px] w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-[#dce5f2] bg-white px-3 text-sm text-[#344866] outline-none transition hover:border-[#93B4E5] focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

  const menuClass =
    "absolute left-0 top-[calc(100%+8px)] z-50 max-h-52 w-full overflow-y-auto overscroll-contain dropdown-scrollbar rounded-xl border border-[#e1e8f2] bg-white p-1 shadow-lg";

  const optionClass = (selected: boolean) =>
    `w-full rounded-lg px-3 py-2.5 text-left text-sm outline-none transition hover:bg-[#f1f5ff] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 ${
      selected
        ? "bg-[#f1f5ff] font-semibold text-[#17365f]"
        : "text-[#344866]"
    }`;

  function getWeekLabel(value: RecapWeek) {
    return value === 0 ? "Semua Minggu" : `Minggu: ${value}`;
  }

  return (
    <div
      ref={filterRef}
      className="relative rounded-2xl border border-[#E5ECF6] bg-white p-4 shadow-sm"
    >
      <div className="grid grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] items-center gap-3">

        {/* Pencarian */}
        <div className="min-w-0">
          <div className="flex h-[38px] min-w-0 items-center gap-2 rounded-xl border border-[#dce5f2] bg-white px-3 transition focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-300/30">
            <Search
              size={18}
              className="shrink-0 text-[#91A2BA]"
            />

            <input
              id="recap-search"
              type="search"
              aria-label="Cari volunteer atau NIM"
              placeholder="Cari volunteer atau NIM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full w-full min-w-0 bg-transparent text-sm text-[#344866] outline-none placeholder:text-[#9AAAC0]"
            />
          </div>
        </div>

        {/* Semester */}
        <div
          className={`relative min-w-0 ${
            openDropdown === "semester" ? "z-30" : "z-0"
          }`}
        >
          <button
            type="button"
            aria-label="Pilih semester"
            aria-haspopup="listbox"
            aria-expanded={openDropdown === "semester"}
            onClick={() =>
              setOpenDropdown(
                openDropdown === "semester" ? null : "semester"
              )
            }
            className={buttonClass}
          >
            <span className="truncate">
              Semester {semester === "ODD" ? "Ganjil" : "Genap"} {academicYear}
            </span>

            <ChevronDown
              size={16}
              className={`shrink-0 transition-transform ${
                openDropdown === "semester" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "semester" && (
            <ul role="listbox" className={menuClass}>
              {[
                { value: "ODD" as RecapSemester, label: "Ganjil" },
                { value: "EVEN" as RecapSemester, label: "Genap" },
              ].map((item) => (
                <li
                  key={item.value}
                  role="option"
                  aria-selected={semester === item.value}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSemester(item.value);
                      setOpenDropdown(null);
                    }}
                    className={optionClass(semester === item.value)}
                  >
                    Semester {item.label} {academicYear}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bulan */}
        <div
          className={`relative min-w-0 ${
            openDropdown === "month" ? "z-30" : "z-0"
          }`}
        >
          <button
            type="button"
            aria-label="Pilih bulan"
            aria-haspopup="listbox"
            aria-expanded={openDropdown === "month"}
            onClick={() =>
              setOpenDropdown(
                openDropdown === "month" ? null : "month"
              )
            }
            className={buttonClass}
          >
            <span className="truncate">
              Bulan: {months.find((item) => item.value === month)?.label}
            </span>

            <ChevronDown
              size={16}
              className={`shrink-0 transition-transform ${
                openDropdown === "month" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "month" && (
            <ul role="listbox" className={menuClass}>
              {months.map((item) => (
                <li
                  key={item.value}
                  role="option"
                  aria-selected={month === item.value}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMonth(item.value);
                      setOpenDropdown(null);
                    }}
                    className={optionClass(month === item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Minggu */}
        <div
          className={`relative min-w-0 ${
            openDropdown === "week" ? "z-30" : "z-0"
          }`}
        >
          <button
            type="button"
            aria-label="Pilih minggu"
            aria-haspopup="listbox"
            aria-expanded={openDropdown === "week"}
            onClick={() =>
              setOpenDropdown(
                openDropdown === "week" ? null : "week"
              )
            }
            className={buttonClass}
          >
            <span className="truncate">{getWeekLabel(week)}</span>

            <ChevronDown
              size={16}
              className={`shrink-0 transition-transform ${
                openDropdown === "week" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "week" && (
            <ul role="listbox" className={menuClass}>
              {weeks.map((item) => (
                <li
                  key={item}
                  role="option"
                  aria-selected={week === item}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setWeek(item);
                      setOpenDropdown(null);
                    }}
                    className={optionClass(week === item)}
                  >
                    {getWeekLabel(item)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
