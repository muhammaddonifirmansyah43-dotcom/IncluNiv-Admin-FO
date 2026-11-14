
"use client";

import { useEffect, useMemo, useState } from "react";

import JadwalFilter from "./JadwalFilter";
import JadwalTable from "./JadwalTable";
import JadwalEmpty from "./JadwalEmpty";
import {
  DEFAULT_TANGGAL,
  dalamSemester,
  dataJadwal,
  getTodayString,
} from "./types";
import type { FilterStatus } from "./types";

// Tanggal yang punya sesi (ditandai titik di kalender)
const markedDates = Array.from(new Set(dataJadwal.map((item) => item.tanggal)));

export default function JadwalContent() {
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("ganjil");
  const [status, setStatus] = useState<FilterStatus>("Semua");
  const [tanggal, setTanggal] = useState(DEFAULT_TANGGAL);
  const [globalSearch, setGlobalSearch] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("q");

    if (keyword) {
      setSearch(keyword);
      setGlobalSearch(true);
    }
  }, []);

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return dataJadwal
      .filter((item) => {
        const sesuaiTanggal = globalSearch || item.tanggal === tanggal;
        const sesuaiSemester = globalSearch || dalamSemester(item.tanggal, semester);
        const sesuaiStatus = status === "Semua" || item.status === status;

        const sesuaiPencarian =
          !keyword ||
          [
            item.mahasiswa,
            item.nimMahasiswa,
            item.pendamping,
            item.nimPendamping,
            item.mataKuliah,
            item.lokasi,
            item.kelas,
            item.status,
          ].some((value) => value.toLowerCase().includes(keyword));

        return (
          sesuaiTanggal &&
          sesuaiSemester &&
          sesuaiStatus &&
          sesuaiPencarian
        );
      })
      .sort((a, b) => {
        const tanggalCompare = a.tanggal.localeCompare(b.tanggal);

        return tanggalCompare !== 0
          ? tanggalCompare
          : a.waktu.localeCompare(b.waktu);
      });
  }, [search, semester, status, tanggal, globalSearch]);

  return (
    <div className="space-y-6">
      <JadwalFilter
        search={search}
        setSearch={setSearch}
        semester={semester}
        setSemester={setSemester}
        status={status}
        setStatus={setStatus}
        tanggal={tanggal}
        setTanggal={setTanggal}
        markedDates={markedDates}
      />

      {filtered.length > 0 ? (
        <JadwalTable data={filtered} tanggal={tanggal} />
      ) : (
        <JadwalEmpty
          onBack={() => setTanggal(getTodayString())}
          outOfSemester={!globalSearch && !dalamSemester(tanggal, semester)}
        />
      )}
    </div>
  );
}
