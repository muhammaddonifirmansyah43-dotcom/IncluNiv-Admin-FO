
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

export default function JadwalPage() {
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("ganjil");
  const [status, setStatus] = useState("Semua");
  const [tanggal, setTanggal] = useState("2026-09-30");

  const handleToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    setTanggal(`${year}-${month}-${day}`);
  };

  const filteredJadwal = useMemo(() => {
    return dataJadwal.filter((item) => {
      const sesuaiTanggal = item.tanggal === tanggal;

      const sesuaiSemester =
        semester === "ganjil"
          ? item.tanggal >= "2026-08-01" &&
            item.tanggal <= "2027-01-31"
          : item.tanggal >= "2027-02-01" &&
            item.tanggal <= "2027-07-31";

      const sesuaiStatus =
        status === "Semua" || item.status === status;

      const keyword = search.toLowerCase().trim();

      const sesuaiPencarian = [
        item.mahasiswa,
        item.nimMahasiswa,
        item.pendamping,
        item.nimPendamping,
        item.mataKuliah,
        item.lokasi,
        item.kelas,
      ].some((value) =>
        value.toLowerCase().includes(keyword)
      );

      return (
        sesuaiTanggal &&
        sesuaiSemester &&
        sesuaiStatus &&
        sesuaiPencarian
      );
    });
  }, [search, semester, status, tanggal]);

  return (
    <div className="min-h-screen space-y-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#153D70]">
          Penjadwalan Pendampingan
        </h1>

        <p className="mt-1 text-sm text-[#647A9B]">
          Pantau dan kelola sinkronisasi jadwal pendampingan
          antara mahasiswa difabel dan volunteer secara berkala.
        </p>
      </div>

      <JadwalFilter
        search={search}
        setSearch={setSearch}
        semester={semester}
        setSemester={setSemester}
        status={status}
        setStatus={setStatus}
        tanggal={tanggal}
        setTanggal={setTanggal}
        onToday={handleToday}
      />

      {filteredJadwal.length > 0 ? (
        <JadwalTable data={filteredJadwal} />
      ) : (
        <JadwalEmpty
          onBack={handleToday}
          semester={semester === "genap"}
        />
      )}
    </div>
  );
}
