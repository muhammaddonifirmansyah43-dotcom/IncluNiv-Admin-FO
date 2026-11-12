"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function DetailBackLink() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/rekap")}
      className="flex items-center gap-2 text-sm font-medium text-[#4387E9] transition hover:text-[#153D70]"
    >
      <ArrowLeft size={16} />
      Kembali ke Rekap Pendampingan
    </button>
  );
}