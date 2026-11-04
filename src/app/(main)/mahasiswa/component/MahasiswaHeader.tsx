
"use client";

import {
  ArrowLeft,
  User,
  CalendarDays,
  History,
  RotateCcw,
} from "lucide-react";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
};

export default function MahasiswaHeader({
  activeTab,
  onTabChange,
  onBack,
}: Props) {
  const tabs = [
    { id: "data-diri", label: "Data Diri", icon: User },
    { id: "jadwal", label: "Jadwal Kuliah", icon: CalendarDays },
    { id: "riwayat", label: "Riwayat Pendampingan", icon: History },
  ];

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-blue-500 hover:text-blue-700"
      >
        <ArrowLeft size={15} />
        Kembali ke Data Mahasiswa
      </button>

      {/* Profil Mahasiswa */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-400 bg-blue-50 font-bold text-[#0F2D5B]">
            AM
          </div>

          <div>
            <h2 className="text-base font-bold text-[#0F2D5B]">
              Ahmad Macheda
            </h2>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded bg-gray-100 px-2 py-1 text-[10px] text-gray-600">
                25314707000065
              </span>
              <span className="rounded bg-gray-100 px-2 py-1 text-[10px] text-gray-600">
                Teknologi Informasi
              </span>
              <span className="rounded bg-gray-100 px-2 py-1 text-[10px] text-gray-600">
                Fakultas Vokasi
              </span>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-[10px] text-gray-600 hover:bg-gray-50">
          <RotateCcw size={13} />
          Reset Password
        </button>
      </div>

      {/* Navigasi Tab */}
      <div className="flex flex-wrap gap-2 rounded-xl bg-white p-2 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition ${
                active
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
