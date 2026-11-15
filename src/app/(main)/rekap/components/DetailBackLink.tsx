"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function DetailBackLink() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/rekap")}
      className="flex items-center gap-2 text-sm font-medium text-[#4387E9] transition hover:text-[#153D70] outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 rounded-md"
    >
      <ArrowLeft size={16} />
      Kembali ke Rekap Pendampingan
    </button>
  );
}
