import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type DataTableProps<T extends { id: string | number }> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
};

export default function DataTable<
  T extends { id: string | number }
>({
  columns,
  data,
  emptyMessage = "Belum ada data.",
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className="whitespace-nowrap border-b border-slate-200 px-4 py-3 font-semibold"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                {columns.map((column) => {
                  const value = row[column.key];

                  return (
                    <td
                      key={String(column.key)}
                      className="px-4 py-3 align-middle text-slate-700"
                    >
                      {column.render
                        ? column.render(value, row)
                        : String(value ?? "—")}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}