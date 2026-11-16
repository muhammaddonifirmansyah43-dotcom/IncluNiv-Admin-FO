
import MahasiswaRow from "./MahasiswaRow";
import type { Mahasiswa, SortDirection } from "./types";

interface MahasiswaTableProps {
  data: Mahasiswa[];
  sort: SortDirection;
  onToggleSort: () => void;
  onView: (id: string) => void;
  onDelete: (item: Mahasiswa) => void;
}

const thBase = "px-5 py-4 text-sm font-semibold text-[#17365f]";

export default function MahasiswaTable({
  data,
  sort,
  onToggleSort,
  onView,
  onDelete,
}: MahasiswaTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <caption className="sr-only">Daftar mahasiswa difabel</caption>

        <thead>
          <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
            <th scope="col" className={`${thBase} w-[7%] text-center`}>
              No
            </th>
            <th scope="col" className={`${thBase} w-[26%] text-left`}>
              Nama Mahasiswa
            </th>
            <th scope="col" className={`${thBase} w-[18%] text-left`}>
              NIM
            </th>
            <th scope="col" className={`${thBase} w-[21%] text-left`}>
              Fakultas
            </th>
            <th scope="col" className={`${thBase} w-[18%] text-left`}>
              <button
                type="button"
                onClick={onToggleSort}
                className="inline-flex items-center gap-1.5 rounded-sm outline-none transition hover:text-[#2563C9] focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
              >
                Jenis Disabilitas
              </button>
            </th>
            <th scope="col" className={`${thBase} w-[10%] text-center`}>
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <MahasiswaRow
                key={item.id}
                item={item}
                index={index}
                onView={onView}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-5 py-16 text-center text-sm text-[#8495ac]"
              >
                Data mahasiswa tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

