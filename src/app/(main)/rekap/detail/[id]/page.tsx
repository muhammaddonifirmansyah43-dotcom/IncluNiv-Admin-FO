
"use client";

import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  GraduationCap,
  Building2,
  CheckCircle2,
  Check,
  CalendarDays,
} from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";

import { volunteerData } from "../../components/RekapData";

export default function DetailRekapPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const volunteer = volunteerData.find(
    (item) => item.id === id
  );

  if (!volunteer) {
    return (
      <div className="rounded-xl border border-[#E3EAF5] bg-white p-10 text-center">
        <h2 className="font-bold text-[#153D70]">
          Data pendamping tidak ditemukan
        </h2>

<button
  type="button"
  onClick={() => router.push("/rekap")}
  className="flex items-center gap-2 text-sm font-medium text-[#4387E9] transition hover:text-[#153D70]"
>
          Kembali ke Rekap Pendampingan
        </button>
      </div>
    );
  }

  const jumlahSelesai = volunteer.riwayat.filter(
    (item) => item.status === "Selesai"
  ).length;

  return (
    <div className="min-h-screen space-y-5">
      {/* Tombol kembali */}
      <button
        type="button"
        onClick={() => router.push("/rekap")}
        className="flex items-center gap-2 text-sm font-medium text-[#4387E9] transition hover:text-[#153D70]"
      >
        <ArrowLeft size={17} />
        Kembali ke Rekap Pendampingan
      </button>

      {/* Page Header */}
      <PageHeader
        title="Detail Pendamping"
        description="Profil dan riwayat kontribusi pendamping pada semester berjalan."
      />

      {/* Profil Pendamping */}
      <div className="flex flex-col justify-between gap-5 rounded-xl border border-[#E1EAF6] bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-4">
          {/* Foto Profil */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-300 bg-blue-50">
            <img
              src={volunteer.foto}
              alt={volunteer.nama}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <span className="absolute text-xl font-bold text-blue-600">
              {volunteer.nama.charAt(0)}
            </span>
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold text-[#153D70]">
              {volunteer.nama}
            </h2>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded-md bg-[#EAF2FF] px-2 py-1 text-[10px] text-[#2858A6]">
                <GraduationCap size={12} />
                {volunteer.nim}
              </span>

              <span className="flex items-center gap-1 rounded-md bg-[#F1F5F9] px-2 py-1 text-[10px] text-[#526985]">
                <GraduationCap size={12} />
                {volunteer.prodi}
              </span>

              <span className="flex items-center gap-1 rounded-md bg-[#F1F5F9] px-2 py-1 text-[10px] text-[#526985]">
                <Building2 size={12} />
                {volunteer.fakultas}
              </span>
            </div>
          </div>
        </div>

        {/* Jumlah Sesi */}
        <div className="w-full rounded-xl bg-[#EEF3FF] p-4 sm:w-48">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#153D70]">
              {volunteer.totalSesi}
            </span>

            <span className="text-sm font-semibold text-[#526985]">
              Sesi
            </span>
          </div>

          <p className="mt-2 text-xs text-[#8191A8]">
            Total pendampingan semester ini
          </p>
        </div>
      </div>

      {/* Riwayat Pendampingan */}
      <div className="overflow-hidden rounded-xl border border-[#E1EAF6] bg-white shadow-sm">
        {/* Informasi Riwayat */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E1EAF6] px-5 py-4">
          <CheckCircle2
            size={17}
            className="text-emerald-500"
          />

          <span className="text-sm font-bold text-[#263B55]">
            {jumlahSelesai} sesi selesai
          </span>

          <span className="text-xs text-[#8191A8]">
            • Riwayat pendampingan
          </span>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#EDF3FF]">
              <tr className="text-[10px] font-bold uppercase text-[#526985]">
                <th className="px-4 py-4">No.</th>
                <th className="px-4 py-4">Tanggal / Waktu</th>
                <th className="px-4 py-4">
                  Mahasiswa Didampingi
                </th>
                <th className="px-4 py-4">
                  Kegiatan / Mata Kuliah
                </th>
                <th className="px-4 py-4">Lokasi</th>
                <th className="px-4 py-4">Durasi</th>
                <th className="px-4 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF1F7]">
              {volunteer.riwayat.length > 0 ? (
                volunteer.riwayat.map((item, index) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-[#F8FAFD]"
                  >
                    <td className="px-4 py-5 text-xs text-[#718198]">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-4 py-5">
                      <p className="whitespace-nowrap text-xs font-semibold text-[#263B55]">
                        {item.tanggal}
                      </p>

                      <p className="mt-1 text-[10px] text-[#94A3B8]">
                        {item.waktu}
                      </p>
                    </td>

                    <td className="px-4 py-5 text-xs font-medium text-[#263B55]">
                      {item.mahasiswa}
                    </td>

                    <td className="px-4 py-5">
                      <p className="text-xs font-semibold text-[#263B55]">
                        {item.kegiatan}
                      </p>

                      <p className="mt-1 text-[10px] text-[#94A3B8]">
                        Pendampingan perkuliahan
                      </p>
                    </td>

                    <td className="px-4 py-5">
                      <p className="text-xs font-medium text-[#263B55]">
                        {item.lokasi}
                      </p>

                      <p className="mt-1 text-[10px] text-[#94A3B8]">
                        {item.ruang}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-4 py-5 text-xs text-[#263B55]">
                      {item.durasi}
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          item.status === "Selesai"
                            ? "bg-[#E5F9EF] text-[#15945C]"
                            : item.status === "Berlangsung"
                              ? "bg-[#EAF2FF] text-[#2563C9]"
                              : "bg-[#FFF2DF] text-[#D97706]"
                        }`}
                      >
                        <Check size={11} />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-14 text-center"
                  >
                    <CalendarDays
                      size={30}
                      className="mx-auto mb-3 text-[#A5B4C8]"
                    />

                    <p className="text-sm font-semibold text-[#526985]">
                      Belum ada riwayat pendampingan
                    </p>

                    <p className="mt-1 text-xs text-[#94A3B8]">
                      Riwayat pendampingan akan muncul di sini.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EDF1F7] px-5 py-4">
          <p className="text-xs font-medium text-[#526985]">
            {volunteer.riwayat.length} riwayat ditampilkan
          </p>

          <p className="text-xs text-[#94A3B8]">
            Total {volunteer.totalSesi} sesi pendampingan
          </p>
        </div>
      </div>
    </div>
  );
}
