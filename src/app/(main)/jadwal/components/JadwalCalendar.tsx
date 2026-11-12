"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { formatTanggal, getTodayString, toDateString } from "./types";

const HARI = ["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"];

const monthStart = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

interface JadwalCalendarProps {
  tanggal: string;
  onApply: (value: string) => void;
  markedDates: string[];
}

export default function JadwalCalendar({
  tanggal,
  onApply,
  markedDates,
}: JadwalCalendarProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(tanggal); // pilihan sementara sebelum "Terapkan"
  const [viewMonth, setViewMonth] = useState(() => monthStart(tanggal));

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const toggle = () => {
    if (!open) {
      setDraft(tanggal);
      setViewMonth(monthStart(tanggal));
    }
    setOpen(!open);
  };

  const days = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();

    // Minggu dimulai hari Senin
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const length = Math.ceil((offset + totalDays) / 7) * 7;

    return Array.from({ length }, (_, index) => {
      const date = new Date(year, month, index - offset + 1);

      return {
        key: toDateString(date),
        day: date.getDate(),
        inMonth: date.getMonth() === month,
        sunday: index % 7 === 6,
      };
    });
  }, [viewMonth]);

  const marked = new Set(markedDates);
  const today = getTodayString();

  const monthLabel = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(viewMonth);

  // Ganjil: Agustus - Januari, Genap: Februari - Juli
  const isGanjil = viewMonth.getMonth() >= 7 || viewMonth.getMonth() === 0;

  const changeMonth = (amount: number) =>
    setViewMonth(
      new Date(viewMonth.getFullYear(), viewMonth.getMonth() + amount, 1)
    );

  const apply = () => {
    onApply(draft);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
        className={`flex h-[38px] items-center gap-2 rounded-lg border px-3 text-sm transition ${
          open
            ? "border-[#3B82F6] bg-[#3B82F6] text-white"
            : "border-[#dbe4ef] bg-white text-[#344866] hover:border-[#93B4E5]"
        }`}
      >
        <CalendarDays
          size={16}
          className={open ? "text-white" : "text-[#3B82F6]"}
        />
        <span className={open ? "text-blue-100" : "text-[#71829b]"}>
          Pilih Tanggal:
        </span>
        <span className="whitespace-nowrap font-semibold">
          {formatTanggal(tanggal)}
        </span>
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
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

          <div
            role="dialog"
            aria-label="Pilih tanggal"
            className="absolute right-0 top-full z-30 mt-2 w-[310px] max-w-[calc(100vw-2rem)] rounded-2xl border border-[#dce5ef] bg-white p-4 shadow-xl"
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#3B82F6]" />
                <h3 className="text-sm font-bold capitalize text-[#17365f]">
                  {monthLabel}
                </h3>
                <span className="rounded border border-[#3B82F6] px-1.5 py-0.5 text-xs font-semibold text-[#2563C9]">
                  {isGanjil ? "Ganjil" : "Genap"}
                </span>
              </div>

              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="Bulan sebelumnya"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#526985] transition hover:bg-[#EAF2FF] hover:text-[#2563C9]"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Bulan berikutnya"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#526985] transition hover:bg-[#EAF2FF] hover:text-[#2563C9]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Nama hari */}
            <div className="mb-1 grid grid-cols-7 text-center">
              {HARI.map((hari) => (
                <span
                  key={hari}
                  className={`py-2 text-xs font-semibold ${
                    hari === "MIN" ? "text-[#EF4444]" : "text-[#8191A8]"
                  }`}
                >
                  {hari}
                </span>
              ))}
            </div>

            {/* Tanggal */}
            <div className="grid grid-cols-7 gap-y-1">
              {days.map((item) => {
                const selected = item.key === draft;
                const isToday = item.key === today;

                let style = "";
                if (selected) {
                  style = "bg-[#3B82F6] font-bold text-white";
                } else if (isToday) {
                  style = "border border-[#3B82F6] font-bold text-[#2563C9]";
                } else if (item.inMonth) {
                  style = `${
                    item.sunday ? "text-[#EF4444]" : "text-[#263B55]"
                  } hover:bg-[#EAF2FF]`;
                } else {
                  style = item.sunday
                    ? "text-red-200 hover:bg-[#F4F7FC]"
                    : "text-[#C0CAD8] hover:bg-[#F4F7FC]";
                }

                return (
                  <button
                    key={item.key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDraft(item.key)}
                    className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition ${style}`}
                  >
                    {item.day}
                    {marked.has(item.key) && (
                      <span
                        className={`absolute bottom-1 h-1 w-1 rounded-full ${
                          selected ? "bg-white" : "bg-[#3B82F6]"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Terapkan */}
            <button
              type="button"
              onClick={apply}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3B82F6] py-2.5 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
            >
              <Check size={16} />
              Terapkan
            </button>
          </div>
        </>
      )}
    </div>
  );
}