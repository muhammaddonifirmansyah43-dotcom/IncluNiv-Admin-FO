
"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Pencil,
  UserRoundCheck,
} from "lucide-react";

type Period = "Mingguan" | "Bulanan" | "Semester";

const chartData: Record<Period, { labels: string[]; values: number[] }> = {
  Mingguan: {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    values: [320, 470, 390, 720, 560, 810, 640],
  },
  Bulanan: {
    labels: ["1–4", "5–8", "9–12", "13–16", "17–20", "21–24", "25–28", "29–31"],
    values: [420, 530, 380, 710, 620, 850, 690, 780],
  },
  Semester: {
    labels: ["Jul", "Agu", "Sep", "Okt", "Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    values: [420, 380, 1048, 640, 410, 680, 310, 570, 720, 810, 480, 620],
  },
};

const requests = [
  { name: "Agus Salim", detail: "Pendamping • Hari ini, 08:00", status: "Disetujui", tone: "green" },
  { name: "Putra Adi", detail: "Pendamping • Besok, 10:00", status: "Sedang Diproses", tone: "orange" },
  { name: "Anjani Tri P.", detail: "Pendamping • 12 Okt 2026", status: "Tidak dapat dipenuhi", tone: "red" },
] as const;

const statusStyles = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  red: "border-red-200 bg-red-50 text-red-700",
};

const panel =
  "min-w-0 rounded-xl border border-[#D7E5F8] bg-white shadow-[0_4px_14px_rgba(31,71,130,0.07)]";

function PanelHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">
      {children}
    </h2>
  );
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("Semester");
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 9, 1));
  const [selectedDay, setSelectedDay] = useState(14);
  const [search, setSearch] = useState("");

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const monthName = calendarDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const chart = chartData[period];
  const filteredRequests = requests.filter((request) =>
    `${request.name} ${request.detail} ${request.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function changeMonth(direction: number) {
    setCalendarDate(new Date(year, month + direction, 1));
    setSelectedDay(1);
  }

  return (
    <main className="min-h-full bg-[#E6F0FF] p-4 text-[#17345F] sm:p-5">
      {/* HEADER KONTEN */}
      <section className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Selamat datang kembali, Admin!
            </h1>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#3B82F6]">
              Pusat Layanan Disabilitas
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Monitoring pendampingan dan ketersediaan relawan inklusi mahasiswa difabel.
          </p>
        </div>
      </section>

      {/* GRAFIK DAN KALENDER */}
      <section className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(270px,0.9fr)]">
        {/* GRAFIK STATISTIK */}
        <article className={`${panel} flex min-h-[340px] flex-col p-5`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Statistik Pendampingan
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  2,840 Jam
                </h2>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
                  <ArrowUpRight size={14} />
                  +12.4%
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                Dibandingkan semester sebelumnya
              </p>
            </div>

            <div className="flex rounded-lg bg-slate-100 p-1">
              {(["Mingguan", "Bulanan", "Semester"] as Period[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-md px-3 py-2 text-xs transition ${
                    period === item
                      ? "bg-white font-bold text-[#17345F] shadow-sm"
                      : "text-slate-500 hover:text-[#17345F]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex min-h-[205px] flex-1">
            <div className="flex w-14 shrink-0 flex-col justify-between pb-7 pr-2 text-right text-[10px] text-slate-400">
              <span>1.200</span>
              <span>900</span>
              <span>600</span>
              <span>300</span>
              <span>0 jam</span>
            </div>

            <div className="relative min-w-0 flex-1">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-7">
                {[0, 1, 2, 3, 4].map((line) => (
                  <div key={line} className="border-t border-dashed border-slate-100" />
                ))}
              </div>

              <div
                className="relative z-10 grid h-full items-end gap-2 pb-7 sm:gap-3"
                style={{
                  gridTemplateColumns: `repeat(${chart.values.length}, minmax(0, 1fr))`,
                }}
              >
                {chart.values.map((value, index) => {
                  const active = period === "Semester" && index === 2;

                  return (
                    <div key={chart.labels[index]} className="flex h-full min-w-0 flex-col items-center justify-end">
                      <span className="mb-2 text-[10px] text-slate-500">{value}</span>
                      <div className="flex h-[145px] w-full items-end justify-center">
                        <div
                          title={`${chart.labels[index]}: ${value} jam`}
                          className={`relative w-full max-w-8 rounded-t-md transition-all ${
                            active ? "bg-[#3B82F6]" : "bg-[#B9D5F7]"
                          }`}
                          style={{ height: `${Math.max(5, (value / 1200) * 100)}%` }}
                        >
                          {active && (
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                              ↑ 18%
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`mt-2 text-[10px] ${active ? "font-bold text-[#3B82F6]" : "text-slate-500"}`}>
                        {chart.labels[index]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <button type="button" className="text-xs font-bold hover:text-[#3B82F6]">
              Lihat Detail Statistik <Pencil size={12} className="ml-1 inline" />
            </button>
            <span className="text-xs text-slate-400">Akumulasi {period}</span>
          </div>
        </article>

        {/* KALENDER */}
        <article className={`${panel} flex min-h-[340px] flex-col p-5`}>
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

          <div className="grid grid-cols-7 gap-y-2 text-center">
            {["S", "S", "R", "K", "J", "S", "M"].map((day, index) => (
              <span key={`${day}-${index}`} className="pb-1 text-xs font-medium text-slate-400">
                {day}
              </span>
            ))}
            {days.map((day, index) => (
              <button
                key={`${year}-${month}-${index}`}
                type="button"
                disabled={day === null}
                onClick={() => day && setSelectedDay(day)}
                className={`mx-auto flex h-7 w-7 items-center justify-center rounded-md text-xs transition ${
                  day === selectedDay
                    ? "bg-[#3B82F6] font-bold text-white"
                    : "text-slate-600 hover:bg-blue-50"
                } disabled:cursor-default`}
              >
                {day ?? ""}
              </button>
            ))}
          </div>

          <div className="mt-auto rounded-lg border border-blue-100 bg-[#F5F8FF] p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#3B82F6]">
                  <CalendarDays size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold">
                    {selectedDay} {calendarDate.toLocaleDateString("id-ID", { month: "short" })}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Jadwal terpilih</p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-200 bg-white px-2 py-1 text-xs font-semibold text-emerald-700">
                +8.5%
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <button type="button" className="text-xs font-bold hover:text-[#3B82F6]">
              Lihat Kalender Penjadwalan <Pencil size={12} className="ml-1 inline" />
            </button>
            <span className="text-[10px] text-slate-400">14 sesi</span>
          </div>
        </article>
      </section>

      {/* KARTU INFORMASI */}
      <section className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* MAHASISWA */}
        <article className={`${panel} flex min-h-[225px] flex-col p-4`}>
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
            {[
              ["Tuna Rungu", "24 Mhs"],
              ["Tuna Netra", "18 Mhs"],
              ["Tuna Daksa", "22 Mhs"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-[#E2EBF8] bg-[#F8FAFF] p-3 text-center">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-bold">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
            <button type="button" className="text-xs font-bold hover:text-[#3B82F6]">
              Lihat Data Mahasiswa <Pencil size={12} className="ml-1 inline" />
            </button>
            <span className="text-[10px] text-slate-400">Semester Ganjil</span>
          </div>
        </article>

        {/* VOLUNTEER */}
        <article className={`${panel} flex min-h-[225px] flex-col p-4`}>
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
            {[
              ["Jadwal Hari Ini", "7", "Terjadwal"],
              ["Tanpa Jadwal", "13", "Volunteer"],
            ].map(([label, value, detail]) => (
              <div key={label} className="rounded-lg border border-[#E2EBF8] bg-[#F8FAFF] p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-2 text-xl font-bold">
                  {value} <span className="text-xs font-normal text-slate-500">{detail}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
            <button type="button" className="text-xs font-bold hover:text-[#3B82F6]">
              Lihat Data Pendamping <Pencil size={12} className="ml-1 inline" />
            </button>
            <span className="text-[10px] text-slate-400">20 personel</span>
          </div>
        </article>

        {/* PENGAJUAN */}
        <article className={`${panel} flex min-h-[225px] flex-col p-4`}>
          <PanelHeading>Pengajuan Perizinan</PanelHeading>

          <div className="mt-4 flex items-center justify-between rounded-lg border border-[#E2EBF8] bg-[#F8FAFF] px-3 py-2.5">
            <span className="text-xs text-slate-500">Kapasitas Relawan</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <span key={item} className={`h-4 w-1.5 rounded-sm ${item < 3 ? "bg-orange-400" : "bg-[#3B82F6]"}`} />
                ))}
              </div>
              <span className="text-xs font-bold">76%</span>
            </div>
          </div>

          <label htmlFor="request-search" className="sr-only">Cari pengajuan</label>
          <input
            id="request-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari pengajuan..."
            className="mt-3 h-9 rounded-lg border border-[#D9E6F8] px-3 text-xs outline-none placeholder:text-slate-400 focus:border-[#3B82F6]"
          />

          <div className="mt-3 space-y-2">
            {filteredRequests.map((request) => (
              <div key={request.name} className="flex items-center justify-between gap-2 rounded-lg border border-[#E2EBF8] bg-[#F8FAFF] p-2.5">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold">{request.name}</p>
                  <p className="mt-1 truncate text-[10px] text-slate-400">{request.detail}</p>
                </div>
                <span className={`shrink-0 rounded border px-2 py-1 text-[10px] font-semibold ${statusStyles[request.tone]}`}>
                  {request.status}
                </span>
              </div>
            ))}
            {filteredRequests.length === 0 && (
              <p className="py-4 text-center text-xs text-slate-400">Tidak ada pengajuan yang cocok.</p>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
            <button type="button" className="text-xs font-bold hover:text-[#3B82F6]">
              Lihat semua pengajuan <Pencil size={12} className="ml-1 inline" />
            </button>
            <span className="text-[10px] text-slate-400">{filteredRequests.length} pengajuan</span>
          </div>
        </article>
      </section>
    </main>
  );
}
