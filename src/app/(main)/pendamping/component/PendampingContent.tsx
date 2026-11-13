
"use client";

import { useMemo, useState } from "react";
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
  const [target, setTarget] = useState<Pendamping | null>(null);

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
        item.nama.toLowerCase().includes(query) ||
        item.nim.toLowerCase().includes(query);

      const matchFaculty =
        faculty === "Semua Fakultas" || item.fakultas === faculty;

      return matchSearch && matchFaculty;
    });
  }, [items, search, faculty]);

  const visible = filtered.slice(0, pageSize);

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

      <div className="overflow-hidden rounded-2xl border border-[#e0e7f1] bg-white shadow-sm">
        <PendampingTable data={visible} onRequestDelete={setTarget} />
        <TableFooter shown={visible.length} total={filtered.length} />
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
