"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  CalendarDays,
  History,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
};

const NAMA = "Ahmad Macheda";

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
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    if (!showReset) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowReset(false);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showReset]);

  return (
    <div className="space-y-4">
      <button
        type="button"
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
            <h2 className="text-base font-bold text-[#0F2D5B]">{NAMA}</h2>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded bg-gray-100 px-2 py-1 text-[10px] text-gray-600">
                253140707000065
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

        <button
          type="button"
          onClick={() => setShowReset(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-[10px] text-gray-600 hover:bg-gray-50"
        >
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
              type="button"
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

      {/* Popup Reset Password Berhasil */}
      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0F2D5B]/40 backdrop-blur-[2px]"
            onClick={() => setShowReset(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            aria-describedby="reset-desc"
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#3B82F6]">
              <CheckCircle2 size={26} />
            </div>

            <h2 id="reset-title" className="text-lg font-bold text-[#0F2D5B]">
              Reset Password Berhasil
            </h2>

            <p
              id="reset-desc"
              className="mt-2 text-sm leading-relaxed text-gray-500"
            >
              Password akun mahasiswa{" "}
              <span className="font-semibold text-[#0F2D5B]">{NAMA}</span>{" "}
              berhasil direset.
            </p>

            <button
              type="button"
              autoFocus
              onClick={() => setShowReset(false)}
              className="mt-6 w-full rounded-lg bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}