import { Users, UserRoundCheck, CalendarDays, ClipboardList } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Selamat datang kembali, Admin!"
        description="Pantau pengelolaan pendampingan mahasiswa melalui Incluniv."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Mahasiswa"
          value="—"
          description="Ringkasan data mahasiswa"
          icon={<Users size={20} />}
        />

        <StatCard
          title="Pendamping"
          value="—"
          description="Ringkasan data pendamping"
          icon={<UserRoundCheck size={20} />}
        />

        <StatCard
          title="Jadwal"
          value="—"
          description="Ringkasan jadwal pendampingan"
          icon={<CalendarDays size={20} />}
        />

        <StatCard
          title="Pengajuan"
          value="—"
          description="Ringkasan pengajuan pendampingan"
          icon={<ClipboardList size={20} />}
        />
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-[#0F2D5B]">
          Aktivitas Pendampingan
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Area ini disiapkan untuk ringkasan aktivitas dan statistik.
        </p>
      </section>
    </div>
  );
}