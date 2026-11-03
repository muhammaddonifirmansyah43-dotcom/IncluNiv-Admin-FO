"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardPanel, PanelFooter } from "./DashboardPanel";
import CalendarGrid from "./CalendarGrid";

export default function ScheduleCalendar() {
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 9, 1));
  const [selectedDay, setSelectedDay] = useState(14);

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const monthName = calendarDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
  const monthShort = calendarDate.toLocaleDateString("id-ID", { month: "short" });

  function changeMonth(direction: number) {
    setCalendarDate(new Date(year, month + direction, 1));
    setSelectedDay(1);
  }

  return (
    <DashboardPanel className="min-h-[340px] p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          aria-label="Bulan sebelumnya"
          onClick={() => changeMonth(-1)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-sm font-bold capitalize">{monthName}</h2>
        <button
          type="button"
          aria-label="Bulan berikutnya"
          onClick={() => changeMonth(1)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <CalendarGrid
        year={year}
        month={month}
        selectedDay={selectedDay}
        onSelect={setSelectedDay}
      />

      <div className="mt-auto pt-4">
        <div className="rounded-lg border border-blue-100 bg-[#F5F8FF] p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#3B82F6]">
                <CalendarDays size={18} />
              </span>
              <div>
                <p className="text-sm font-bold">
                  {selectedDay} {monthShort}
                </p>
                <p className="mt-1 text-xs text-slate-400">Jadwal terpilih</p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-200 bg-white px-2 py-1 text-xs font-semibold text-emerald-700">
              +8.5%
            </span>
          </div>
        </div>
      </div>

      <PanelFooter actionLabel="Lihat Kalender Penjadwalan" note="14 sesi" />
    </DashboardPanel>
  );
}