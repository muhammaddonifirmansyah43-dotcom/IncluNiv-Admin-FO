"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import MahasiswaToolbar from "./MahasiswaToolbar";
import MahasiswaTable from "./MahasiswaTable";
import TableFooter from "./TableFooter";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import type { Mahasiswa, SortDirection } from "./types";

const initialData: Mahasiswa[] = [
  {
    id: "253140707000065",
    nama: "Ahmad Macheda",
    nim: "253140707000065",
    fakultas: "Fakultas Vokasi",
    disability: "Tuna Daksa",
  },
];

const disabilityOptions = ["Semua", "Tuna Daksa", "Tuna Netra", "Tuna Rungu"];
const limitOptions = [10, 20, 50];

export default function MahasiswaContent() {
  const router = useRouter();

  const [data, setData] = useState<Mahasiswa[]>(initialData);
  const [search, setSearch] = useState("");
  const [disability, setDisability] = useState("Semua");
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState<SortDirection>(null);
  const [deleteTarget, setDeleteTarget] = useState<Mahasiswa | null>(null);

  const toggleSort = () =>
    setSort(sort === null ? "asc" : sort === "asc" ? "desc" : null);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    // Nanti: panggil API hapus di sini sebelum memperbarui state.
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

      return matchSearch && matchDisability;
    });

    if (sort) {
      result.sort((a, b) =>
        sort === "asc"
          ? a.disability.localeCompare(b.disability)
          : b.disability.localeCompare(a.disability)
      );
    }

    return result;
  }, [data, search, disability, sort]);

  const visible = filtered.slice(0, limit);

  return (
    <div className="space-y-6">
      <MahasiswaToolbar
        search={search}
        onSearchChange={setSearch}
        disability={disability}
        disabilityOptions={disabilityOptions}
        onDisabilityChange={setDisability}
        limit={limit}
        limitOptions={limitOptions}
        onLimitChange={setLimit}
      />

      <div className="overflow-hidden rounded-2xl border border-[#e0e7f0] bg-white shadow-sm">
        <MahasiswaTable
          data={visible}
          sort={sort}
          onToggleSort={toggleSort}
          onView={(id) => router.push(`/mahasiswa/${id}`)}
          onDelete={setDeleteTarget}
        />
        <TableFooter shown={visible.length} total={filtered.length} />
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