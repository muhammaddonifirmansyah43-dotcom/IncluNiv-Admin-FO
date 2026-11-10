"use client";

import { useMemo, useState } from "react";

import JadwalFilter from "./components/JadwalFilter";
import JadwalTable from "./components/JadwalTable";
import JadwalEmpty from "./components/JadwalEmpty";

import type { Jadwal } from "./components/types";

const dataJadwal: Jadwal[] = [
  {
    id: 1,
    tanggal: "2026-09-30",
    waktu: "07:00 - 08:30",
    mahasiswa: "Ahmad Macheda",
    nimMahasiswa: "231550120111",
    pendamping: "Faris Ramadhani",
    nimPendamping: "253140707768966",
    mataKuliah: "Algoritma & Struktur Data",
    lokasi: "Ruang F201 • Gedung F",
    kelas: "TI - B (3 SKS)",
    status: "Selesai",
  },
  {
    id: 2,
    tanggal: "2026-09-30",
    waktu: "08:00 - 10:00",
    mahasiswa: "Raka Fadhillah",
    nimMahasiswa: "225150400192",
    pendamping: "Lukito Adi Nugroho",
    nimPendamping: "253140707711143",
    labelPendamping: "AIMATCH",
    mataKuliah: "Pemrograman Mobile",
    lokasi: "Ruang A307 • Lab Aplikasi",
    kelas: "Mobile - A (3 SKS)",
    status: "Berlangsung",
  },
  {
    id: 3,
    tanggal: "2026-09-30",
    waktu: "08:00 - 10:30",
    mahasiswa: "Ikhwanudin",
    nimMahasiswa: "215150307111",
    pendamping: "Dian Novitasari",
    nimPendamping: "253140707765676",
    mataKuliah: "Kecerdasan Buatan",
    lokasi: "Gedung Dieng • Ruang A403",
    kelas: "KB - D (3 SKS)",
    status: "Berlangsung",
  },
  {
    id: 4,
    tanggal: "2026-09-30",
    waktu: "10:20 - 12:00",
    mahasiswa: "Zalvarina Nabila",
    nimMahasiswa: "245150600109",
    pendamping: "Rizky Ananda",
    nimPendamping: "253140707445587",
    mataKuliah: "Interaksi Manusia & Komputer",
    lokasi: "Ruang B409 • Gedung B",
    kelas: "IMK - C (3 SKS)",
    status: "Akan datang",
  },
  {
    id: 5,
    tanggal: "2026-09-30",
    waktu: "08:45 - 11:15",
    mahasiswa: "Bagas Pratama",
    nimMahasiswa: "23150700012",
    pendamping: "Mahendra Saputra",
    nimPendamping: "253140707222234",
    mataKuliah: "Jaringan Komputer Lanjut",
    lokasi: "Lab Jaringan Gedung G • Lt. 2",
    kelas: "Jarkom - A (3 SKS)",
    status: "Berlangsung",
  },
  {
    id: 6,
    tanggal: "2026-09-30",
    waktu: "13:00 - 15:30",
    mahasiswa: "Dewi Harum",
    nimMahasiswa: "225150207001",
    pendamping: "Anisa Septiani",
    nimPendamping: "253140707112165",
    mataKuliah: "Sistem Basis Data Terdistribusi",
    lokasi: "Ruang C204 • Gedung Pascasarjana",
    kelas: "SBD - B (3 SKS)",
    status: "Akan datang",
  },
];

// Rentang tanggal tiap semester (format YYYY-MM-DD)
const SEMESTER_RANGE: Record<string, { start: string; end: string }> = {
  ganjil: { start: "2026-08-01", end: "2027-01-31" },
  genap: { start: "2027-02-01", end: "2027-07-31" },
};

const DEFAULT_SEMESTER = "ganjil";

function getTodayString() {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

function dalamSemester(tanggal: string, semester: string) {
  const range = SEMESTER_RANGE[semester];
  if (!range) return true;
  return tanggal >= range.start && tanggal <= range.end;
}

export default function JadwalPage() {
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState(DEFAULT_SEMESTER);
  const [status, setStatus] = useState("Semua");
  // Default: hari ini. Ganti ke "2026-09-30" kalau mau demo dengan data dummy.
  const [tanggal, setTanggal] = useState(getTodayString);

  const handleToday = () => {
    setTanggal(getTodayString());
  };

  // Ganti semester: kosongkan tanggal supaya semua sesi semester itu tampil
  const handleSemesterChange = (value: string) => {
    setSemester(value);
    if (tanggal && !dalamSemester(tanggal, value)) {
      setTanggal("");
    }
  };

  // Dipakai tombol di empty state: ke hari ini bila ada jadwal,
  // kalau tidak ke tanggal terakhir yang punya jadwal.
  const handleBack = () => {
    const today = getTodayString();
    const adaHariIni = dataJadwal.some((item) => item.tanggal === today);

    if (adaHariIni) {
      setTanggal(today);
      return;
    }

    const tanggalTersedia = dataJadwal
      .map((item) => item.tanggal)
      .filter((value) => dalamSemester(value, semester))
      .sort();

    setTanggal(tanggalTersedia[tanggalTersedia.length - 1] ?? "");
  };

  const filteredJadwal = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return dataJadwal
      .filter((item) => {
        const sesuaiTanggal = !tanggal || item.tanggal === tanggal;
        const sesuaiSemester = dalamSemester(item.tanggal, semester);
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
          ].some((value) => value.toLowerCase().includes(keyword));

        return (
          sesuaiTanggal && sesuaiSemester && sesuaiStatus && sesuaiPencarian
        );
      })
      .sort(
        (a, b) =>
          a.tanggal.localeCompare(b.tanggal) || a.waktu.localeCompare(b.waktu)
      );
  }, [search, semester, status, tanggal]);

  // Pesan "belum ada sesi pada semester ini" hanya bila tanggal terpilih
  // berada di luar rentang semester, atau semester itu memang tanpa data.
  const semesterKosong =
    (tanggal !== "" && !dalamSemester(tanggal, semester)) ||
    !dataJadwal.some((item) => dalamSemester(item.tanggal, semester));

  return (
    <div className="space-y-6 px-8 pb-8 pt-6">
      <div>
        <h1 className="text-2xl font-bold text-[#153D70]">
          Penjadwalan Pendampingan
        </h1>

        <p className="mt-1 text-sm text-[#647A9B]">
          Pantau dan kelola sinkronisasi jadwal pendampingan antara mahasiswa
          difabel dan volunteer secara berkala.
        </p>
      </div>

      <JadwalFilter
        search={search}
        setSearch={setSearch}
        semester={semester}
        setSemester={handleSemesterChange}
        status={status}
        setStatus={setStatus}
        tanggal={tanggal}
        setTanggal={setTanggal}
        onToday={handleToday}
      />

      {filteredJadwal.length > 0 ? (
        <JadwalTable data={filteredJadwal} />
      ) : (
        <JadwalEmpty onBack={handleBack} semester={semesterKosong} />
      )}
    </div>
  );
}