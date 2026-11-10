
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

interface JadwalFilterProps {
  search: string;
  setSearch: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  tanggal: string;
  setTanggal: (value: string) => void;
  onToday: () => void;
}

const semesterOptions = [
  { value: "ganjil", label: "Semester Ganjil 2026/2027" },
  { value: "genap", label: "Semester Genap 2026/2027" },
];

const statusOptions = [
  { value: "Semua", label: "Semua Status" },
  { value: "Selesai", label: "Selesai" },
  { value: "Berlangsung", label: "Berlangsung" },
  { value: "Akan datang", label: "Akan datang" },
];

function CustomDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative min-w-0">
      <label className="mb-2 block text-sm font-semibold text-[#153D70]">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left text-sm transition ${
          open
            ? "border-[#3B82F6] ring-2 ring-blue-100"
            : "border-[#DCE6F2] hover:border-[#93B4E5]"
        }`}
      >
        <span className="truncate text-[#263B55]">
          {selected?.label}
        </span>

        <ChevronDown
          size={18}
          className={`ml-2 shrink-0 text-[#526985] transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Tutup pilihan"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#DCE6F2] bg-white p-1.5 shadow-xl">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  value === option.value
                    ? "bg-[#EAF2FF] font-semibold text-[#2563C9]"
                    : "text-[#526985] hover:bg-[#F4F7FC]"
                }`}
              >
                {option.label}

                {value === option.value && (
                  <Check size={16} />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CustomCalendar({
  tanggal,
  setTanggal,
}: {
  tanggal: string;
  setTanggal: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const selectedDate = new Date(`${tanggal}T00:00:00`);

  const [viewMonth, setViewMonth] = useState(
    new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    )
  );

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const monthLabel = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(viewMonth);

  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const previousMonthDays = new Date(year, month, 0).getDate();

    return Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - firstDay + 1;

      let date: Date;
      let currentMonth = true;

      if (dayNumber <= 0) {
        date = new Date(
          year,
          month - 1,
          previousMonthDays + dayNumber
        );
        currentMonth = false;
      } else if (dayNumber > totalDays) {
        date = new Date(year, month + 1, dayNumber - totalDays);
        currentMonth = false;
      } else {
        date = new Date(year, month, dayNumber);
      }

      const dateString = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      return {
        dateString,
        day: date.getDate(),
        currentMonth,
      };
    });
  }, [viewMonth]);

  const displayDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(selectedDate);

  const changeMonth = (amount: number) => {
    setViewMonth(
      new Date(
        viewMonth.getFullYear(),
        viewMonth.getMonth() + amount,
        1
      )
    );
  };

  const selectDate = (dateString: string) => {
    setTanggal(dateString);
    setOpen(false);
  };

  return (
    <div className="relative min-w-0">
      <label className="mb-2 block text-sm font-semibold text-[#153D70]">
        Pilih Tanggal
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left transition ${
          open
            ? "border-[#3B82F6] ring-2 ring-blue-100"
            : "border-[#DCE6F2] hover:border-[#93B4E5]"
        }`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <CalendarDays
            size={19}
            className="shrink-0 text-[#3B82F6]"
          />
          <span className="truncate text-sm text-[#263B55]">
            {displayDate}
          </span>
        </span>

        <ChevronDown
          size={18}
          className={`ml-2 shrink-0 text-[#526985] transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Tutup kalender"
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-full z-30 mt-2 w-[310px] max-w-[calc(100vw-40px)] rounded-2xl border border-[#DCE6F2] bg-white p-4 shadow-xl">
            {/* Header kalender */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#8191A8]">
                  Pilih tanggal pendampingan
                </p>
                <h3 className="mt-1 text-base font-bold capitalize text-[#153D70]">
                  {monthLabel}
                </h3>
              </div>

              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526985] transition hover:bg-[#EAF2FF] hover:text-[#2563C9]"
                  aria-label="Bulan sebelumnya"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#526985] transition hover:bg-[#EAF2FF] hover:text-[#2563C9]"
                  aria-label="Bulan berikutnya"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Nama hari */}
            <div className="mb-2 grid grid-cols-7 text-center">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                (day) => (
                  <span
                    key={day}
                    className="py-2 text-xs font-semibold text-[#8191A8]"
                  >
                    {day}
                  </span>
                )
              )}
            </div>

            {/* Tanggal */}
            <div className="grid grid-cols-7 gap-y-1">
              {calendarDays.map((item) => {
                const isSelected = item.dateString === tanggal;
                const isToday = item.dateString === todayString;

                return (
                  <button
                    key={item.dateString}
                    type="button"
                    onClick={() => selectDate(item.dateString)}
                    className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium transition ${
                      isSelected
                        ? "bg-[#2563EB] font-bold text-white shadow-md shadow-blue-200"
                        : isToday
                          ? "border border-[#3B82F6] font-bold text-[#2563C9]"
                          : item.currentMonth
                            ? "text-[#263B55] hover:bg-[#EAF2FF] hover:text-[#2563C9]"
                            : "text-[#C0CAD8] hover:bg-[#F4F7FC]"
                    }`}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-[#E8EEF5] pt-3">
              <button
                type="button"
                onClick={() => {
                  setTanggal("");
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-[#8191A8] transition hover:bg-[#F4F7FC]"
              >
                Hapus tanggal
              </button>

              <button
                type="button"
                onClick={() => {
                  setTanggal(todayString);
                  setViewMonth(
                    new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      1
                    )
                  );
                  setOpen(false);
                }}
                className="rounded-lg bg-[#0F2D5B] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#153D70]"
              >
                Hari Ini
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function JadwalFilter({
  search,
  setSearch,
  semester,
  setSemester,
  status,
  setStatus,
  tanggal,
  setTanggal,
  onToday,
}: JadwalFilterProps) {
  return (
    <div className="rounded-xl border border-[#DCE6F2] bg-white p-5 shadow-sm">
      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-[#153D70]">
          Cari jadwal
        </label>

        <div className="flex items-center gap-3 rounded-lg border border-[#DCE6F2] px-4 py-3 transition focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100">
          <Search size={19} className="shrink-0 text-[#8191A8]" />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari mahasiswa, pendamping, atau mata kuliah..."
            className="w-full bg-transparent text-sm text-[#263B55] outline-none placeholder:text-[#9AA9BC]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <CustomDropdown
          label="Semester"
          value={semester}
          options={semesterOptions}
          onChange={setSemester}
        />

        <CustomCalendar
          tanggal={tanggal}
          setTanggal={setTanggal}
        />

        <CustomDropdown
          label="Status Jadwal"
          value={status}
          options={statusOptions}
          onChange={setStatus}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onToday}
          className="rounded-lg bg-[#0F2D5B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153D70]"
        >
          Hari Ini
        </button>
      </div>
    </div>
  );
}
