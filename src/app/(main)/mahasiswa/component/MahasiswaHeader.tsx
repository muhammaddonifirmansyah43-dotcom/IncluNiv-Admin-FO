
"use client";

import {
  ArrowLeft,
  User,
  CalendarDays,
  History,
  GraduationCap,
  Hash,
  Building2,
} from "lucide-react";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
};

const NAMA = "Ahmad Macheda";
const NIM = "253140707000065";

const tabs = [
  { id: "data-diri", label: "Data Diri", icon: User },
  { id: "jadwal", label: "Jadwal Kuliah", icon: CalendarDays },
  { id: "riwayat", label: "Riwayat Pendampingan", icon: History },
];

export default function MahasiswaHeader({
  activeTab,
  onTabChange,
  onBack,
}: Props) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] transition hover:text-[#17345F]"
      >
        <ArrowLeft size={16} />
        Kembali ke Data Mahasiswa
      </button>

      {/* Profil Mahasiswa */}
      <section className="flex flex-col gap-4 rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#BFDBFE] bg-[#E6F0FF] text-xl font-bold text-[#17345F]">
          AM
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-[#17345F]">
            {NAMA}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F1F5FB] px-3 py-1.5 text-xs font-medium text-slate-600">
              <Hash size={13} />
              {NIM}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F1F5FB] px-3 py-1.5 text-xs font-medium text-slate-600">
              <GraduationCap size={14} />
              Teknologi Informasi
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F1F5FB] px-3 py-1.5 text-xs font-medium text-slate-600">
              <Building2 size={14} />
              Fakultas Vokasi
            </span>
          </div>
        </div>
      </section>

      {/* Navigasi Tab */}
      <nav className="grid grid-cols-1 gap-2 rounded-2xl border border-[#DCE6F2] bg-white p-2 shadow-sm sm:grid-cols-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-[#3B82F6] text-white shadow-sm"
                  : "text-slate-600 hover:bg-[#F1F5FB] hover:text-[#17345F]"
              }`}
            >
              <Icon size={17} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
