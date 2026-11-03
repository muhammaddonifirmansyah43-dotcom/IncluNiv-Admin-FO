"use client";

import { useState } from "react";
import { Eye, Trash2, Search, ChevronDown } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";

export default function PendampingPage() {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const pendamping = [
    {
      no: 1,
      nama: "Ahmad Macheda",
      nim: "253140707000065",
      fakultas: "Fakultas Vokasi",
    },
  ];

  const filteredPendamping = pendamping.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f1f5ff]">
      {/* PAGE HEADER */}
      <PageHeader
        title="Data Pendamping"
        description="Kelola data mahasiswa relawan pendamping."
      />

      {/* SEARCH & FILTER */}
      <div className="mt-6 rounded-2xl border border-[#e3eaf5] bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da0bd]"
            />

            <input
              type="text"
              placeholder="Cari nama volunteer atau NIM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[38px] w-full rounded-xl border border-[#dce5f2] bg-[#f9fbff] pl-11 pr-4 text-sm text-[#193b6d] outline-none transition placeholder:text-[#9aabc3] focus:border-[#5b96ff]"
            />
          </div>

          {/* TOTAL DATA */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-[38px] min-w-[150px] items-center justify-between gap-3 rounded-xl border border-[#dce5f2] bg-white px-4 text-sm text-[#344866]"
            >
              <span>20 data volunteer</span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-11 z-20 w-[150px] rounded-xl border border-[#e1e8f2] bg-white p-1 shadow-lg">
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#344866] hover:bg-[#f1f5ff]"
                >
                  10 data volunteer
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#344866] hover:bg-[#f1f5ff]"
                >
                  20 data volunteer
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#344866] hover:bg-[#f1f5ff]"
                >
                  50 data volunteer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#e0e7f1] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
                <th className="w-[10%] px-5 py-3.5 text-center text-xs font-semibold text-[#17365f]">
                  No
                </th>

                <th className="w-[25%] px-5 py-3.5 text-left text-xs font-semibold text-[#17365f]">
                  Nama Pendamping
                </th>

                <th className="w-[20%] px-5 py-3.5 text-left text-xs font-semibold text-[#17365f]">
                  NIM
                </th>

                <th className="w-[25%] px-5 py-3.5 text-left text-xs font-semibold text-[#17365f]">
                  Fakultas
                </th>

                <th className="w-[20%] px-5 py-3.5 text-center text-xs font-semibold text-[#17365f]">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPendamping.length > 0 ? (
                filteredPendamping.map((item) => (
                  <tr
                    key={item.nim}
                    className="border-b border-[#e9eef5] last:border-b-0"
                  >
                    <td className="px-5 py-4 text-center text-sm text-[#667994]">
                      {item.no}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#17365f]">
                      {item.nama}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#526681]">
                      {item.nim}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#526681]">
                      {item.fakultas}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {/* DETAIL */}
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#4385f5] transition hover:bg-[#dceaff]"
                          title="Lihat detail"
                        >
                          <Eye size={16} strokeWidth={2} />
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8293ad] transition hover:bg-[#fff1f1] hover:text-[#e05252]"
                          title="Hapus"
                        >
                          <Trash2 size={16} strokeWidth={1.8} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="h-[400px] text-center text-sm text-[#8293ad]"
                  >
                    Data pendamping tidak ditemukan.
                  </td>
                </tr>
              )}

              {/* EMPTY ROWS UNTUK MENYAMAI TINGGI SCREENSHOT */}
              {filteredPendamping.length > 0 &&
                Array.from({ length: 7 }).map((_, index) => (
                  <tr
                    key={`empty-${index}`}
                    className="border-b border-[#e9eef5]"
                  >
                    <td colSpan={5} className="h-[53px]"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER */}
        <div className="border-t border-[#e1e8f0] bg-[#f8fafc] px-5 py-3.5">
          <p className="text-xs text-[#71829b]">
            Menampilkan{" "}
            <span className="font-semibold text-[#17365f]">20</span> dari{" "}
            <span className="font-semibold text-[#17365f]">
              48 data pendamping
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}