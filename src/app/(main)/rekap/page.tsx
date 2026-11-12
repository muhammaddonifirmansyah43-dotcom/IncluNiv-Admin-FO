
"use client";

import { useMemo, useState } from "react";

import PageHeader from "@/components/ui/PageHeader";
import RekapFilter from "./components/RekapFilter";
import RekapTable from "./components/RekapTable";
import { volunteerData } from "./components/RekapData";

export default function RekapVolunteerPage() {
  const [search, setSearch] = useState("");
  const [pendamping, setPendamping] = useState("Semua");
  const [periode, setPeriode] = useState("1 bulan terakhir");
  const [semester, setSemester] = useState("ganjil");

  const filteredData = useMemo(() => {
    return volunteerData
      .map((item) => ({
        id: item.id,
        nama: item.nama,
        nim: item.nim,
        fakultas: item.fakultas,
        jumlah: item.totalSesi,
      }))
      .filter((item) => {
        const keyword = search.toLowerCase().trim();

        const sesuaiPencarian =
          item.nama.toLowerCase().includes(keyword) ||
          item.nim.toLowerCase().includes(keyword);

        const sesuaiPendamping =
          pendamping === "Semua" || item.nama === pendamping;

        const sesuaiSemester = semester === "ganjil";

        return sesuaiPencarian && sesuaiPendamping && sesuaiSemester;
      })
      .sort((a, b) => b.jumlah - a.jumlah);
  }, [search, pendamping, semester]);

  return (
    <div className="w-full space-y-6 p-4 text-[#17345F] sm:p-5">
      <PageHeader
        title="Rekap Pendampingan"
        description="Pantau rekapitulasi data pendampingan, peringkat aktivitas relawan, dan akumulasi sesi secara terstruktur dalam satu konsol."
      />

      <RekapFilter
        search={search}
        setSearch={setSearch}
        pendamping={pendamping}
        setPendamping={setPendamping}
        periode={periode}
        setPeriode={setPeriode}
        semester={semester}
        setSemester={setSemester}
        namaPendamping={volunteerData.map((item) => item.nama)}
      />

      <RekapTable data={filteredData} />
    </div>
  );
}
