
import { notFound } from "next/navigation";
import { getPendampingDetail } from "@/lib/pendamping-detail";
import BackLink from "../component/BackLink";
import DetailContent from "../component/DetailContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PendampingDetailPage({ params }: Props) {
  const { id } = await params;
  const data = getPendampingDetail(id);

  if (!data) notFound();

  return (
    <div className="mx-auto w-full space-y-6 p-4 text-[#17345F] sm:p-6 lg:px-8">
      <BackLink />
      <DetailContent data={data} />
    </div>
  );
}
