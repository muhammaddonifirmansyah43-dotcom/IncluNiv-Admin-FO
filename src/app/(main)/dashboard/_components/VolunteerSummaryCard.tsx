import { volunteerStats } from "@/lib/dashboard-data";
import { DashboardPanel, PanelFooter, PanelHeading } from "./DashboardPanel";

export default function VolunteerSummaryCard() {
  return (
    <DashboardPanel className="min-h-[225px] p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
        <PanelHeading>Data Pendamping Terdaftar</PanelHeading>
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-extrabold">20</p>
        <p className="text-sm text-slate-500">Total Pendamping</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          Validasi Pelatihan
        </span>
        <span className="text-xs text-slate-400">Rasio 1:3.2</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {volunteerStats.map(({ label, value, detail }) => (
          <div
            key={label}
            className="rounded-lg border border-[#E2EBF8] bg-[#F8FAFF] p-3"
          >
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-xl font-bold">
              {value}{" "}
              <span className="text-xs font-normal text-slate-500">{detail}</span>
            </p>
          </div>
        ))}
      </div>

      <PanelFooter actionLabel="Lihat Data Pendamping" 
       href="/pendamping"
      note="20 personel" />
    </DashboardPanel>
  );
}