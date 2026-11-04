import type { Pendamping } from "@/types/pendamping";
import PendampingRow from "./PendampingRow";

const headers = [
  { label: "No", className: "w-[10%] text-center" },
  { label: "Nama Pendamping", className: "w-[25%] text-left" },
  { label: "NIM", className: "w-[20%] text-left" },
  { label: "Fakultas", className: "w-[25%] text-left" },
  { label: "Aksi", className: "w-[20%] text-center" },
];

type Props = {
  data: Pendamping[];
  onRequestDelete: (item: Pendamping) => void;
};

export default function PendampingTable({ data, onRequestDelete }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
            {headers.map((header) => (
              <th
                key={header.label}
                scope="col"
                className={`px-5 py-3.5 text-xs font-semibold text-[#17365f] ${header.className}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <PendampingRow
                key={item.id}
                no={index + 1}
                item={item}
                onRequestDelete={onRequestDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="h-[240px] text-center text-sm text-[#8293ad]">
                Data pendamping tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}