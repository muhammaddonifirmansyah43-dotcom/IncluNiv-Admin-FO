
"use client";

import { useEffect, useMemo, useState } from "react";

import PageHeader from "@/components/ui/PageHeader";
import {
  getRecapList,
  type RecapSemester,
  type RecapWeek,
} from "@/lib/recap";

import RekapFilter from "./components/RekapFilter";
import RekapTable from "./components/RekapTable";
import type { RecapVolunteer } from "./components/types";

const semesterMonths: Record<
  RecapSemester,
  { value: number; label: string }[]
> = {
  ODD: [
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
    { value: 1, label: "Januari" },
  ],
  EVEN: [
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
  ],
};

function getCurrentSemester(date: Date): RecapSemester {
  const month = date.getMonth() + 1;
  return month >= 8 || month === 1 ? "ODD" : "EVEN";
}

export default function RekapVolunteerPage() {
  const [search, setSearch] = useState("");

  const [semester, setSemester] = useState<RecapSemester>(() =>
    getCurrentSemester(new Date())
  );

  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [week, setWeek] = useState<RecapWeek>(0);

  const [volunteers, setVolunteers] = useState<RecapVolunteer[]>([]);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [totalMonthActivities, setTotalMonthActivities] = useState(0);
  const [totalWeekActivities, setTotalWeekActivities] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  // Pagination: maksimal 10 data per halaman.
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const monthOptions = semesterMonths[semester];

  // 0 berarti Semua Minggu.
  const weekOptions: RecapWeek[] = [0, 1, 2, 3, 4];

  function handleSemesterChange(value: RecapSemester) {
    setSemester(value);
    setMonth(semesterMonths[value][0].value);
    setWeek(0);
  }

  function handleMonthChange(value: number) {
    setMonth(value);
    setWeek(0);
  }

  // Ambil data berdasarkan filter periode.
  useEffect(() => {
    let isMounted = true;

    async function fetchRecap() {
      try {
        setLoading(true);
        setError("");

        const response = await getRecapList({
          semester,
          month,
          week,
        });

        if (!isMounted) return;

        setVolunteers(response.data.volunteers);
        setTotalVolunteers(response.data.totalVolunteers);
        setTotalMonthActivities(response.data.totalMonthActivities);
        setTotalWeekActivities(response.data.totalWeekActivities);
      } catch (err) {
        if (!isMounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil data rekap volunteer."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRecap();

    return () => {
      isMounted = false;
    };
  }, [reload, semester, month, week]);

  // Kembalikan ke halaman pertama ketika pencarian atau filter berubah.
  useEffect(() => {
    setCurrentPage(1);
  }, [search, semester, month, week]);

  // Filter data berdasarkan nama volunteer atau NIM.
  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return volunteers.filter((item) => {
      return (
        item.fullName.toLowerCase().includes(keyword) ||
        (item.nim ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [volunteers, search]);

  // Hitung jumlah halaman berdasarkan hasil filter.
  const pageCount = Math.max(
    1,
    Math.ceil(filteredData.length / rowsPerPage)
  );

  // Pastikan halaman aktif tidak melebihi jumlah halaman.
  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  // Tentukan data yang ditampilkan pada halaman aktif.
  const startIndex = (currentPage - 1) * rowsPerPage;

  const visibleData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const startItem =
    filteredData.length === 0 ? 0 : startIndex + 1;

  const endItem = Math.min(
    startIndex + rowsPerPage,
    filteredData.length
  );

  const emptyMessage = useMemo(() => {
    // Data periode tersedia, tetapi tidak cocok dengan pencarian.
    if (volunteers.length > 0 && filteredData.length === 0) {
      return "Data pendamping tidak ditemukan";
    }

    // Semua minggu dipilih dan bulan tidak memiliki kegiatan.
    if (week === 0 && totalMonthActivities === 0) {
      return "Tidak ada data tersedia pada bulan ini";
    }

    // Minggu tertentu dipilih, tetapi bulan sama sekali tidak memiliki kegiatan.
    if (week > 0 && totalMonthActivities === 0) {
      return "Tidak ada data pendampingan yang sesuai dengan filter yang dipilih";
    }

    // Bulan memiliki kegiatan, tetapi minggu yang dipilih tidak memiliki kegiatan.
    if (week > 0 && totalWeekActivities === 0) {
      return "Tidak ada pendampingan pada minggu ini";
    }

    return "Data pendamping tidak ditemukan";
  }, [
    volunteers,
    filteredData,
    week,
    totalMonthActivities,
    totalWeekActivities,
  ]);

  return (
    <div className="w-full space-y-6 p-4 text-[#17345F] sm:p-5">
      <PageHeader
        title="Rekap Pendampingan"
        description="Pantau jumlah kegiatan dan total jam pendampingan setiap volunteer secara terstruktur."
      />

      <RekapFilter
        search={search}
        setSearch={setSearch}
        semester={semester}
        setSemester={handleSemesterChange}
        month={month}
        setMonth={handleMonthChange}
        week={week}
        setWeek={setWeek}
        months={monthOptions}
        weeks={weekOptions}
      />

      {loading ? (
        <div className="rounded-2xl border border-[#e0e7f0] bg-white px-5 py-16 text-center text-sm text-[#657892]">
          Memuat data rekap volunteer...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-white px-5 py-10 text-center">
          <p className="text-sm font-semibold text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => setReload((value) => value + 1)}
            className="mt-4 rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2563eb]"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <RekapTable
          data={visibleData}
          totalVolunteers={totalVolunteers}
          emptyMessage={emptyMessage}
          currentPage={currentPage}
          pageCount={pageCount}
          startItem={startItem}
          endItem={endItem}
          totalFiltered={filteredData.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
