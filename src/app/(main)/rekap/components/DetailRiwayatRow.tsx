
import type { RecapActivity } from "./types";
import DetailStatusBadge from "./DetailStatusBadge";

type Props = {
  no: number;
  item: RecapActivity;
};

const td = "px-5 py-4 align-middle text-sm text-[#526681]";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function DetailRiwayatRow({ no, item }: Props) {
  return (
    <tr className="border-b border-[#e8edf4] transition hover:bg-[#F8FAFD]">
      <td className={`${td} whitespace-nowrap text-[#657892]`}>
        {no}
      </td>

      <td className={`${td} whitespace-nowrap font-semibold text-[#17365f]`}>
        {formatDate(item.startAt)}
      </td>

      <td className={`${td} font-medium leading-relaxed`}>
        {item.studentName}
      </td>

      <td className={td}>
        <p className="font-medium text-[#17365f]">
          {item.location ?? "-"}
        </p>
      </td>

      <td className={`${td} whitespace-nowrap font-medium`}>
        {item.durationHours} jam
      </td>

      <td className={td}>
        <DetailStatusBadge status={item.status} />
      </td>
    </tr>
  );
}
