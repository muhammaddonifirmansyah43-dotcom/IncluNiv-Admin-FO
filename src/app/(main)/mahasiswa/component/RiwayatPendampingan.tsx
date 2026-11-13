
"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  CircleDashed,
  ChevronDown,
} from "lucide-react";
import { semesterOptions, DEFAULT_SEMESTER } from "./types";

type RiwayatItem = {
  tanggal: string;
  waktu: string;
  pendamping: string;
  lokasi: string;
  status: "Selesai" | "Belum";
  semester: string;
};

const riwayat: RiwayatItem[] = [
  {
    tanggal: "05 Okt 2026",
    waktu: "07:00 - 08:30",
    pendamping: "Lukito Adi Nugroho",
    lokasi: "Gedung Vokasi, Ruang A305",
    status: "Selesai",
    semester: "ganjil-2026",
  },
  {
    tanggal: "04 Okt 2026",
    waktu: "13:00 - 15:30",
    pendamping: "Gita Nurhasuma",
    lokasi: "Gedung Vokasi, Ruang A403",
    status: "Belum",
    semester: "ganjil-2026",
  },
  {
    tanggal: "02 Okt 2026",
    waktu: "08:00 - 10:30",
    pendamping: "Putra Adi",
    lokasi: "Gedung Vokasi, Ruang Seminar F102",
    status: "Selesai",
    semester: "ganjil-2026",
  },
  {
    tanggal: "01 Okt 2026",
    waktu: "10:20 - 12:00",
    pendamping: "Dian Novitasari",
    lokasi: "Perpustakaan Pusat, Lt. 1",
    status: "Selesai",
    semester: "ganjil-2026",
  },
  {
    tanggal: "30 Sep 2026",
    waktu: "07:00 - 09:30",
    pendamping: "Faris Ramadhan",
    lokasi: "Gedung A, Ruang Kuliah A201",
    status: "Selesai",
    semester: "ganjil-2026",
  },
  {
    tanggal: "28 Sep 2026",
    waktu: "13:00 - 15:00",
    pendamping: "Lukito Adi Nugroho",
    lokasi: "Lab Komputer 3, Gedung C",
    status: "Selesai",
    semester: "ganjil-2026",
  },
  {
    tanggal: "25 Sep 2026",
    waktu: "08:00 - 10:00",
    pendamping: "Anjani Tri Pandra",
    lokasi: "Gedung Vokasi, Ruang B104",
    status: "Selesai",
    semester: "ganjil-2026",
  },
  {
    tanggal: "24 Sep 2026",
    waktu: "10:20 - 12:10",
    pendamping: "Gita Nurhasuma",
    lokasi: "Gedung Vokasi, Ruang A401",
    status: "Selesai",
    semester: "ganjil-2026",
  },
  {
    tanggal: "22 Sep 2026",
    waktu: "07:00 - 08:40",
    pendamping: "Putra Adi",
    lokasi: "Gedung Vokasi, Ruang A305",
    status: "Selesai",
    semester: "ganjil-2026",
  },
  {
    tanggal: "19 Sep 2026",
    waktu: "13:00 - 15:30",
    pendamping: "Dian Novitasari",
    lokasi: "Gedung F, Ruang Diskusi Inklusi",
    status: "Selesai",
    semester: "ganjil-2026",
  },
];

export default function RiwayatPendampingan() {
  const [semester, setSemester] = useState(DEFAULT_SEMESTER);

  const filteredRiwayat = useMemo(
    () => riwayat.filter((item) => item.semester === semester),
    [semester]
  );

  const semesterLabel =
    semesterOptions.find((option) => option.value === semester)?.label ?? "";

  return (
    <section className="rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F0FF] text-[#3B82F6]">
            <CalendarDays size={20} />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17345F]">
              Riwayat Pendampingan Mahasiswa
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Daftar riwayat kegiatan pendampingan mahasiswa
            </p>
          </div>

          <span className="rounded-full bg-[#E6F0FF] px-3 py-1.5 text-xs font-semibold text-[#2563EB]">
            {filteredRiwayat.length} Sesi
          </span>
        </div>

        <div className="relative w-full sm:w-64">
          <select
            value={semester}
            onChange={(event) => setSemester(event.target.value)}
            aria-label="Filter riwayat berdasarkan semester"
            className="w-full appearance-none rounded-lg border border-[#DCE6F2] bg-white px-3 py-2.5 pr-9 text-xs font-medium text-[#263B55] outline-none transition hover:border-[#93B4E5] focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100"
          >
            {semesterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>

      {/* Tabel Riwayat */}
      <div className="overflow-x-auto rounded-xl border border-[#E2EAF5]">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-[#F5F8FC] text-[#17345F]">
            <tr>
              <th className="px-4 py-3.5 font-semibold">TANGGAL</th>
              <th className="px-4 py-3.5 font-semibold">WAKTU</th>
              <th className="px-4 py-3.5 font-semibold">PENDAMPING</th>
              <th className="px-4 py-3.5 font-semibold">LOKASI &amp; AGENDA</th>
              <th className="px-4 py-3.5 font-semibold">STATUS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8EEF6]">
            {filteredRiwayat.length > 0 ? (
              filteredRiwayat.map((item) => (
                <tr
                  key={item.tanggal}
                  className="transition hover:bg-[#F8FAFD]"
                >
                  <td className="whitespace-nowrap px-4 py-3.5 font-medium text-slate-700">
                    {item.tanggal}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} className="text-[#3B82F6]" />
                      {item.waktu}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3.5 font-medium text-slate-700">
                    {item.pendamping}
                  </td>

                  <td className="px-4 py-3.5 text-slate-600">
                    <span className="flex items-start gap-1.5">
                      <MapPin
                        size={13}
                        className="mt-0.5 shrink-0 text-[#3B82F6]"
                      />
                      {item.lokasi}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    {item.status === "Selesai" ? (
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 size={12} />
                        Selesai
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-50 px-2.5 py-1.5 text-[10px] font-semibold text-orange-700">
                        <CircleDashed size={12} />
                        Belum
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <CalendarDays
                    size={28}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <p className="text-sm font-semibold text-[#17345F]">
                    Belum ada riwayat pendampingan
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Tidak ditemukan data untuk {semesterLabel}.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-2 border-t border-[#E8EEF6] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Menampilkan <span className="font-semibold text-[#17345F]">{filteredRiwayat.length}</span> dari{" "}
          <span className="font-semibold text-[#17345F]">{filteredRiwayat.length}</span> riwayat pendampingan
        </p>

        <span className="text-xs font-medium text-slate-400">
          {semesterLabel}
        </span>
      </div>
    </section>
  );
}
