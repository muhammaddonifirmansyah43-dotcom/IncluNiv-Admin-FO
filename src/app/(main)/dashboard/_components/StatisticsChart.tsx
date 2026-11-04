"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Period } from "@/types/dashboard";
import { chartData } from "@/lib/dashboard-data";
import { DashboardPanel, PanelFooter } from "./DashboardPanel";
import PeriodTabs from "./PeriodTabs";
import BarChart from "./BarChart";

const compareLabel: Record<Period, string> = {
  Mingguan: "Dibandingkan minggu sebelumnya",
  Bulanan: "Dibandingkan bulan sebelumnya",
  Semester: "Dibandingkan semester sebelumnya",
};

export default function StatisticsChart() {
  const [period, setPeriod] = useState<Period>("Semester");
  const chart = chartData[period];
  const highlightIndex = chart.values.indexOf(Math.max(...chart.values));
  const totalHours = chart.values.reduce((sum, value) => sum + value, 0);

  return (
    <DashboardPanel className="min-h-[340px] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Statistik Pendampingan
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {totalHours.toLocaleString("id-ID")} Jam
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
              <ArrowUpRight size={14} />
              +12.4%
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-400">{compareLabel[period]}</p>
        </div>

        <PeriodTabs value={period} onChange={setPeriod} />
      </div>

      <BarChart
        labels={chart.labels}
        values={chart.values}
        highlightIndex={highlightIndex}
      />

      <PanelFooter
        actionLabel="Lihat Detail Statistik"
        href="/rekap"
        note={`Akumulasi ${period}`}
      />
    </DashboardPanel>
  );
}