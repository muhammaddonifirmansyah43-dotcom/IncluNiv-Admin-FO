import { studentStats } from "@/lib/dashboard-data";
import { DashboardPanel, PanelFooter, PanelHeading } from "./DashboardPanel";

export default function StudentSummaryCard() {
  return (
    <DashboardPanel className="min-h-[225px] p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
          <PanelHeading>Data Mahasiswa Difabel</PanelHeading>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
          +8.5%
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-extrabold">64</p>
        <p className="text-sm text-slate-500">Mahasiswa Difabel</p>
      </div>

      <span className="mt-3 w-fit rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#3B82F6]">
        100% Terlayani
      </span>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {studentStats.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-[#E2EBF8] bg-[#F8FAFF] p-3 text-center"
          >
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-bold">{value}</p>
          </div>
        ))}
      </div>

      <PanelFooter actionLabel="Lihat Data Mahasiswa" note="Semester Ganjil" />
    </DashboardPanel>
  );
}