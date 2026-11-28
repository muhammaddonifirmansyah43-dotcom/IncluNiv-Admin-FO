
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import MahasiswaToolbar from "./MahasiswaToolbar";
import MahasiswaTable from "./MahasiswaTable";
import TableFooter from "./TableFooter";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import type { Mahasiswa, SortDirection } from "./types";

const initialData: Mahasiswa[] = [
  { id: "253140707000065", nama: "Ahmad Macheda", nim: "253140707000065", fakultas: "Fakultas Vokasi", disability: "Tuna Daksa" },
  { id: "253140707000066", nama: "Nadia Putri Maharani", nim: "253140707000066", fakultas: "Fakultas Ilmu Komputer", disability: "Tuna Netra" },
  { id: "253140707000067", nama: "Rafi Alfarizi", nim: "253140707000067", fakultas: "Fakultas Teknik", disability: "Tuna Rungu" },
  { id: "253140707000068", nama: "Siti Aisyah Ramadhani", nim: "253140707000068", fakultas: "Fakultas Ekonomi dan Bisnis", disability: "Tuna Daksa" },
  { id: "253140707000069", nama: "Muhammad Farhan", nim: "253140707000069", fakultas: "Fakultas Ilmu Administrasi", disability: "Tuna Netra" },
  { id: "253140707000070", nama: "Dinda Safitri", nim: "253140707000070", fakultas: "Fakultas Hukum", disability: "Tuna Rungu" },
  { id: "253140707000071", nama: "Reza Maulana", nim: "253140707000071", fakultas: "Fakultas Peternakan", disability: "Tuna Daksa" },
  { id: "253140707000072", nama: "Nabila Zahra", nim: "253140707000072", fakultas: "Fakultas Kedokteran", disability: "Tuna Netra" },
  { id: "253140707000073", nama: "Aditya Prakoso", nim: "253140707000073", fakultas: "Fakultas MIPA", disability: "Tuna Rungu" },
  { id: "253140707000074", nama: "Intan Permatasari", nim: "253140707000074", fakultas: "Fakultas Ilmu Budaya", disability: "Tuna Daksa" },
  { id: "253140707000075", nama: "Bagas Saputra", nim: "253140707000075", fakultas: "Fakultas Vokasi", disability: "Tuna Netra" },
  { id: "253140707000076", nama: "Citra Lestari", nim: "253140707000076", fakultas: "Fakultas Ilmu Komputer", disability: "Tuna Rungu" },
  { id: "253140707000077", nama: "Dimas Arya Putra", nim: "253140707000077", fakultas: "Fakultas Teknik", disability: "Tuna Daksa" },
  { id: "253140707000078", nama: "Putri Amelia", nim: "253140707000078", fakultas: "Fakultas Ekonomi dan Bisnis", disability: "Tuna Netra" },
  { id: "253140707000079", nama: "Rangga Firmansyah", nim: "253140707000079", fakultas: "Fakultas Ilmu Administrasi", disability: "Tuna Rungu" },
  { id: "253140707000080", nama: "Aulia Rahmawati", nim: "253140707000080", fakultas: "Fakultas Hukum", disability: "Tuna Daksa" },
  { id: "253140707000081", nama: "Fikri Ramadhan", nim: "253140707000081", fakultas: "Fakultas Peternakan", disability: "Tuna Netra" },
  { id: "253140707000082", nama: "Laras Puspita", nim: "253140707000082", fakultas: "Fakultas Kedokteran", disability: "Tuna Rungu" },
  { id: "253140707000083", nama: "Yoga Pratama", nim: "253140707000083", fakultas: "Fakultas MIPA", disability: "Tuna Daksa" },
  { id: "253140707000084", nama: "Maya Anggraini", nim: "253140707000084", fakultas: "Fakultas Ilmu Budaya", disability: "Tuna Netra" },
  { id: "253140707000085", nama: "Andika Wijaya", nim: "253140707000085", fakultas: "Fakultas Vokasi", disability: "Tuna Rungu" },
  { id: "253140707000086", nama: "Vina Oktaviani", nim: "253140707000086", fakultas: "Fakultas Ilmu Komputer", disability: "Tuna Daksa" },
  { id: "253140707000087", nama: "Rizal Maulana", nim: "253140707000087", fakultas: "Fakultas Teknik", disability: "Tuna Netra" },
  { id: "253140707000088", nama: "Nanda Aprilia", nim: "253140707000088", fakultas: "Fakultas Ekonomi dan Bisnis", disability: "Tuna Rungu" },
  { id: "253140707000089", nama: "Gilang Ramadhan", nim: "253140707000089", fakultas: "Fakultas Ilmu Administrasi", disability: "Tuna Daksa" },
  { id: "253140707000090", nama: "Tiara Maharani", nim: "253140707000090", fakultas: "Fakultas Hukum", disability: "Tuna Netra" },
  { id: "253140707000091", nama: "Arif Setiawan", nim: "253140707000091", fakultas: "Fakultas Peternakan", disability: "Tuna Rungu" },
  { id: "253140707000092", nama: "Bella Novitasari", nim: "253140707000092", fakultas: "Fakultas Kedokteran", disability: "Tuna Daksa" },
  { id: "253140707000093", nama: "Daffa Kurniawan", nim: "253140707000093", fakultas: "Fakultas MIPA", disability: "Tuna Netra" },
  { id: "253140707000094", nama: "Salma Nur Azizah", nim: "253140707000094", fakultas: "Fakultas Ilmu Budaya", disability: "Tuna Rungu" },
];

const disabilityOptions = ["Semua", "Tuna Daksa", "Tuna Netra", "Tuna Rungu"];
const limitOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function MahasiswaContent() {
  const router = useRouter();

  const [data, setData] = useState<Mahasiswa[]>(initialData);
  const [search, setSearch] = useState("");
  const [disability, setDisability] = useState("Semua");
  const [faculty, setFaculty] = useState("Semua Fakultas");
  const [limit, setLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortDirection>(null);
  const [deleteTarget, setDeleteTarget] = useState<Mahasiswa | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("q");

    if (keyword) {
      setSearch(keyword);
    }
  }, []);

  const facultyOptions = useMemo(
    () => [
      "Semua Fakultas",
      ...Array.from(new Set(data.map((item) => item.fakultas))).sort(),
    ],
    [data]
  );

  const toggleSort = () =>
    setSort(sort === null ? "asc" : sort === "asc" ? "desc" : null);

  const confirmDelete = () => {
    if (!deleteTarget) return;

    setData((prev) => prev.filter((row) => row.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    const result = data.filter((item) => {
      const matchSearch =
        !keyword ||
        item.nama.toLowerCase().includes(keyword) ||
        item.nim.toLowerCase().includes(keyword);

      const matchDisability =
        disability === "Semua" || item.disability === disability;

      const matchFaculty =
        faculty === "Semua Fakultas" || item.fakultas === faculty;

      return matchSearch && matchDisability && matchFaculty;
    });

    if (sort) {
      result.sort((a, b) =>
        sort === "asc"
          ? a.disability.localeCompare(b.disability)
          : b.disability.localeCompare(a.disability)
      );
    }

    return result;
  }, [data, search, disability, faculty, sort]);

  // Kondisi awal: seluruh data ditampilkan dengan pagination 10 data per halaman.
  // Jika admin memilih jumlah data, seluruh jumlah pilihan ditampilkan sekaligus.
  const selectedTotal =
    limit === 0 ? filtered.length : Math.min(filtered.length, limit);

  const rowsPerPage =
    limit === 0 ? 10 : Math.max(selectedTotal, 1);

  const pageCount = Math.max(1, Math.ceil(selectedTotal / rowsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, disability, faculty, limit, sort]);

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const startItem = selectedTotal === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + rowsPerPage, selectedTotal);

  const visible = filtered
    .slice(0, selectedTotal)
    .slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="space-y-6">
      <MahasiswaToolbar
        search={search}
        onSearchChange={setSearch}
        disability={disability}
        disabilityOptions={disabilityOptions}
        onDisabilityChange={setDisability}
        faculty={faculty}
        facultyOptions={facultyOptions}
        onFacultyChange={setFaculty}
        limit={limit}
        limitOptions={limitOptions}
        onLimitChange={setLimit}
      />

      <div className="overflow-hidden rounded-2xl border border-[#DCE6F2] bg-white shadow-sm">
        <MahasiswaTable
          data={visible}
          sort={sort}
          onToggleSort={toggleSort}
          onView={(id) => router.push(`/mahasiswa/${id}`)}
          onDelete={setDeleteTarget}
        />
        <TableFooter
          shown={visible.length}
          total={selectedTotal}
          startItem={startItem}
          endItem={endItem}
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        nama={deleteTarget?.nama ?? ""}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
