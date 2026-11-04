import { notFound } from "next/navigation";
import { getPendampingDetail } from "@/lib/pendamping-detail";
import BackLink from "./_components/BackLink";
import DetailContent from "./_components/DetailContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PendampingDetailPage({ params }: Props) {
  const { id } = await params;
  const data = getPendampingDetail(id);

  if (!data) notFound();

  return (
    <div className="mx-autow-full space-y-6 p-4 text-[#17345F] sm:p-6 lg:px-8">
      <BackLink />
      <DetailContent data={data} />
    </div>
  );
}