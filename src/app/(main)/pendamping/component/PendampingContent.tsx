
"use client";

import { useEffect, useMemo, useState } from "react";
import { pendampingList } from "@/lib/pendamping-data";
import type { Pendamping } from "@/types/pendamping";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import PendampingToolbar from "./PendampingToolbar";
import PendampingTable from "./PendampingTable";
import TableFooter from "./TableFooter";

export default function PendampingContent() {
  const [items, setItems] = useState(pendampingList);
  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState("Semua Fakultas");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [target, setTarget] = useState<Pendamping | null>(null);

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
      ...Array.from(new Set(items.map((item) => item.fakultas))).sort(),
    ],
    [items]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchSearch =
        !query ||
        item.nama.toLowerCase().includes(query) ||
        item.nim.toLowerCase().includes(query) ||
        item.fakultas.toLowerCase().includes(query);

      const matchFaculty =
        faculty === "Semua Fakultas" || item.fakultas === faculty;

      return matchSearch && matchFaculty;
    });
  }, [items, search, faculty]);

  const rowsPerPage = 10;
  const selectedTotal =
    pageSize === 0 ? filtered.length : Math.min(filtered.length, pageSize);
  const pageCount = Math.max(1, Math.ceil(selectedTotal / rowsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, faculty, pageSize]);

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

  function handleConfirmDelete() {
    if (!target) return;

    setItems((prev) => prev.filter((item) => item.id !== target.id));
    setTarget(null);
  }

  return (
    <div className="space-y-6">
      <PendampingToolbar
        search={search}
        onSearchChange={setSearch}
        faculty={faculty}
        facultyOptions={facultyOptions}
        onFacultyChange={setFaculty}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      <div className="overflow-hidden rounded-2xl border border-[#DCE6F2] bg-white shadow-sm">
        <PendampingTable data={visible} onRequestDelete={setTarget} />
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

      <ConfirmDialog
        open={target !== null}
        title="Hapus data pendamping?"
        description={
          target
            ? `Data ${target.nama} (${target.nim}) akan dihapus dan tidak dapat dikembalikan.`
            : ""
        }
        confirmLabel="Hapus"
        onConfirm={handleConfirmDelete}
        onCancel={() => setTarget(null)}
      />
    </div>
  );
}


