import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { pengajuanList } from "@/lib/pengajuan-data";
import DetailProfilCard from "../_components/DetailProfilCard";
import DetailInfoCard from "../_components/DetailInfoCard";
import DetailKeteranganCard from "../_components/DetailKeteranganCard";
import DetailAiCard from "../_components/DetailAiCard";

export default async function PengajuanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = pengajuanList.find((p) => p.id === id);

  if (!item) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4 text-[#17345F] sm:p-6">
      <Link
        href="/pengajuan"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke Data Mahasiswa
      </Link>

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailProfilCard item={item} />
        <DetailInfoCard item={item} />
        <DetailKeteranganCard item={item} />
        <DetailAiCard item={item} />
      </div>
    </div>
  );
}