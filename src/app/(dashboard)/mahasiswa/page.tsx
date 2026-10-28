"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Trash2,
} from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";

export default function MahasiswaPage() {
  const [search, setSearch] = useState("");
  const [disability, setDisability] = useState("Semua");
  const [showDisability, setShowDisability] = useState(false);
  const [showLimit, setShowLimit] = useState(false);

  const mahasiswa = [
    {
      no: 1,
      nama: "Ahmad Macheda",
      nim: "253140707000065",
      fakultas: "Fakultas Vokasi",
      disability: "Tuna Daksa",
    },
  ];

  const filteredMahasiswa = mahasiswa.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.toLowerCase().includes(search.toLowerCase());

    const matchDisability =
      disability === "Semua" ||
      item.disability === disability;

    return matchSearch && matchDisability;
  });

  return (
    <div className="min-h-screen bg-[#edf4ff]">
      {/* HEADER */}
      <PageHeader
        title="Data Mahasiswa Difabel"
        description="Kelola data mahasiswa difabel dan pantau kebutuhan pendampingan mereka."
      />

      {/* SEARCH & FILTER */}
      <div className="mt-6 rounded-2xl border border-[#e0e8f3] bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a3bb]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama mahasiswa atau NIM..."
              className="h-[36px] w-full rounded-lg border border-[#dbe4ef] bg-[#fafcff] pl-11 pr-4 text-xs text-[#183963] outline-none placeholder:text-[#9aabc0] focus:border-[#4b8df5]"
            />
          </div>

          {/* DISABILITY FILTER */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDisability(!showDisability)}
              className="flex h-[36px] min-w-[182px] items-center justify-between gap-3 rounded-lg border border-[#dbe4ef] bg-white px-3 text-xs font-medium text-[#344866]"
            >
              <span>
                Jenis disabilitas: {disability}
              </span>

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  showDisability ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDisability && (
              <div className="absolute right-0 top-10 z-30 w-[182px] rounded-xl border border-[#dce5ef] bg-white p-1.5 shadow-lg">
                {[
                  "Semua",
                  "Tuna Daksa",
                  "Tuna Netra",
                  "Tuna Rungu",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setDisability(item);
                      setShowDisability(false);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-xs text-[#344866] hover:bg-[#f0f5ff]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DATA LIMIT */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLimit(!showLimit)}
              className="flex h-[36px] min-w-[156px] items-center justify-between gap-3 rounded-lg border border-[#dbe4ef] bg-white px-3 text-xs font-medium text-[#344866]"
            >
              <span>20 data mahasiswa</span>

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  showLimit ? "rotate-180" : ""
                }`}
              />
            </button>

            {showLimit && (
              <div className="absolute right-0 top-10 z-30 w-[156px] rounded-xl border border-[#dce5ef] bg-white p-1.5 shadow-lg">
                {["10", "20", "50"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setShowLimit(false)}
                    className="w-full rounded-lg px-3 py-2 text-left text-xs text-[#344866] hover:bg-[#f0f5ff]"
                  >
                    {item} data mahasiswa
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#e0e7f0] bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
              <th className="w-[7%] px-5 py-3.5 text-center text-xs font-semibold text-[#17365f]">
                No
              </th>

              <th className="w-[26%] px-5 py-3.5 text-left text-xs font-semibold text-[#17365f]">
                Nama Mahasiswa
              </th>

              <th className="w-[18%] px-5 py-3.5 text-left text-xs font-semibold text-[#17365f]">
                NIM
              </th>

              <th className="w-[21%] px-5 py-3.5 text-left text-xs font-semibold text-[#17365f]">
                Fakultas
              </th>

              <th className="w-[18%] px-5 py-3.5 text-left text-xs font-semibold text-[#17365f]">
                <span className="inline-flex items-center gap-1">
                  Jenis Disabilitas
                  <ArrowUpDown
                    size={13}
                    className="text-[#8ca0b8]"
                  />
                </span>
              </th>

              <th className="w-[10%] px-5 py-3.5 text-center text-xs font-semibold text-[#17365f]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMahasiswa.length > 0 ? (
              filteredMahasiswa.map((item) => (
                <tr
                  key={item.nim}
                  className="border-b border-[#e8edf4]"
                >
                  {/* NO */}
                  <td className="px-5 py-4 text-center text-xs text-[#657892]">
                    {item.no}
                  </td>

                  {/* NAMA */}
                  <td className="px-5 py-4 text-xs font-semibold text-[#17365f]">
                    {item.nama}
                  </td>

                  {/* NIM */}
                  <td className="px-5 py-4 text-xs text-[#526681]">
                    {item.nim}
                  </td>

                  {/* FAKULTAS */}
                  <td className="px-5 py-4 text-xs text-[#526681]">
                    {item.fakultas}
                  </td>

                  {/* JENIS DISABILITAS */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1ff] px-3 py-1.5 text-[10px] font-semibold text-[#4385f5]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4385f5]" />
                      {item.disability}
                    </span>
                  </td>

                  {/* AKSI */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f1ff] text-[#4385f5] transition hover:bg-[#dbe9ff]"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8495ac] transition hover:bg-[#fff0f0] hover:text-[#e05252]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="h-[430px] text-center text-xs text-[#8495ac]"
                >
                  Data mahasiswa tidak ditemukan.
                </td>
              </tr>
            )}

            {/* BARIS KOSONG AGAR TABEL TINGGI */}
            {filteredMahasiswa.length > 0 &&
              Array.from({ length: 8 }).map((_, index) => (
                <tr
                  key={`empty-${index}`}
                  className="border-b border-[#e8edf4]"
                >
                  <td
                    colSpan={6}
                    className="h-[53px]"
                  />
                </tr>
              ))}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="border-t border-[#e0e7ef] bg-[#f8fafc] px-5 py-3.5">
          <p className="text-xs text-[#71829b]">
            Menampilkan{" "}
            <span className="font-semibold text-[#17365f]">
              20
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-[#17365f]">
              64 data mahasiswa
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}