
"use client";

import { useEffect, useMemo, useState } from "react";

import JadwalFilter from "./JadwalFilter";
import JadwalTable from "./JadwalTable";
import JadwalEmpty from "./JadwalEmpty";

import {
  dalamSemester,
  getTodayString,
} from "./types";

import type {
  FilterStatus,
  Jadwal,
  AssignmentMonitoring,
  AssignmentMonitoringResponse,
} from "./types";

import { getAuthToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapAssignmentToJadwal(
  assignment: AssignmentMonitoring
): Jadwal | null {
  if (assignment.status === "CANCELLED") {
    return null;
  }

  const startDate = new Date(assignment.startAt);
  const endDate = new Date(assignment.endAt);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime()) ||
    startDate.getFullYear() < 2000
  ) {
    return null;
  }

  const tanggal = [
    startDate.getFullYear(),
    String(startDate.getMonth() + 1).padStart(2, "0"),
    String(startDate.getDate()).padStart(2, "0"),
  ].join("-");

  const formatWaktu = (date: Date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;

  const statusMap = {
    PENDING: "Akan datang",
    ACCEPTED: "Akan datang",
    ONGOING: "Berlangsung",
    COMPLETED: "Selesai",
  } as const;

  return {
    id: assignment.id,
    tanggal,
    waktu: `${formatWaktu(startDate)} - ${formatWaktu(endDate)}`,
    mahasiswa: assignment.student.user.fullName,
    nimMahasiswa: assignment.student.studentCode ?? "-",
    pendamping: assignment.mentor.user.fullName,
    nimPendamping: assignment.mentor.studentCode ?? "-",
    mataKuliah: "",
    lokasi: assignment.location ?? "Belum ditentukan",
    kelas: "",
    status: statusMap[assignment.status],
  };
}

export default function JadwalContent() {
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("ganjil");
  const [status, setStatus] = useState<FilterStatus>("Semua");

  // Tanggal tampilan awal mengikuti hari ini.
  const [tanggal, setTanggal] = useState("");

  // Menandai apakah Admin memilih tanggal secara manual.
  const [tanggalDipilih, setTanggalDipilih] = useState(false);

  const [globalSearch, setGlobalSearch] = useState(false);

  const [dataJadwal, setDataJadwal] = useState<Jadwal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mengatur tanggal awal sesuai tanggal lokal komputer Admin.
  useEffect(() => {
    setTanggal(getTodayString());
  }, []);

  // Menerapkan tanggal yang dipilih melalui kalender.
  const handleTanggalApply = (value: string) => {
    setTanggal(value);
    setTanggalDipilih(true);
  };

  // Kembali ke jadwal hari ini.
  const handleToday = () => {
    setTanggal(getTodayString());
    setTanggalDipilih(false);
  };

  // Mengambil data jadwal dari backend.
  useEffect(() => {
    let isMounted = true;

    async function fetchJadwal() {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("Konfigurasi alamat backend belum tersedia.");
        }

        const token = getAuthToken();

        if (!token) {
          throw new Error("Sesi login tidak ditemukan. Silakan login kembali.");
        }

        const response = await fetch(
          `${API_URL}/api/assignments/monitoring`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result =
          (await response.json()) as AssignmentMonitoringResponse;

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil data jadwal pendampingan."
          );
        }

        const mappedData = result.data
          .map(mapAssignmentToJadwal)
          .filter((item): item is Jadwal => item !== null);

        if (isMounted) {
          setDataJadwal(mappedData);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat mengambil data jadwal."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchJadwal();

    return () => {
      isMounted = false;
    };
  }, []);

  // Membaca pencarian dari URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("q");

    if (keyword) {
      setSearch(keyword);
      setGlobalSearch(true);
    }
  }, []);

  // Tanggal yang memiliki sesi untuk ditandai di kalender.
  const markedDates = useMemo(
    () => Array.from(new Set(dataJadwal.map((item) => item.tanggal))),
    [dataJadwal]
  );

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return dataJadwal
      .filter((item) => {
        const sesuaiTanggal = globalSearch || item.tanggal === tanggal;

        const sesuaiSemester =
          globalSearch || dalamSemester(item.tanggal, semester);

        const sesuaiStatus =
          status === "Semua" || item.status === status;

        const sesuaiPencarian =
          !keyword ||
          [
            item.mahasiswa,
            item.nimMahasiswa,
            item.pendamping,
            item.nimPendamping,
            item.mataKuliah ?? "",
            item.lokasi,
            item.kelas ?? "",
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
  }, [dataJadwal, search, semester, status, tanggal, globalSearch]);

  if (loading || !tanggal) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Memuat data jadwal pendampingan...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="font-semibold text-red-700">
          Gagal memuat jadwal pendampingan
        </p>
        <p className="mt-2 text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

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
        tanggalDipilih={tanggalDipilih}
        onTanggalApply={handleTanggalApply}
        onToday={handleToday}
        markedDates={markedDates}
        isToday={!globalSearch && tanggal === getTodayString()}
      />

      {filtered.length > 0 ? (
        <JadwalTable data={filtered} tanggal={tanggal} />
      ) : (
        <JadwalEmpty
          onBack={handleToday}
          outOfSemester={
            !globalSearch && !dalamSemester(tanggal, semester)
          }
        />
      )}
    </div>
  );
}
