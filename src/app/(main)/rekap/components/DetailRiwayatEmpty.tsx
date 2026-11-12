import { CalendarDays } from "lucide-react";

export default function DetailRiwayatEmpty() {
  return (
    <tr>
      <td colSpan={7} className="px-5 py-14 text-center">
        <CalendarDays size={30} className="mx-auto mb-3 text-[#A5B4C8]" />
        <p className="text-sm font-semibold text-[#526985]">Belum ada riwayat pendampingan</p>
        <p className="mt-1 text-xs text-[#94A3B8]">Riwayat pendampingan akan muncul di sini.</p>
      </td>
    </tr>
  );
}