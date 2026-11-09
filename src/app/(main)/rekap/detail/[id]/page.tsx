"use client";

import { useParams } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import { volunteerData } from "../../components/RekapData";
import DetailBackLink from "../../components/DetailBackLink";
import DetailNotFound from "../../components/DetailNotFound";
import DetailProfileCard from "../../components/DetailProfileCard";
import DetailRiwayatTable from "../../components/DetailRiwayatTable";

export default function DetailRekapPage() {
  const { id } = useParams();
  const volunteer = volunteerData.find((v) => v.id === Number(id));

  if (!volunteer) return <DetailNotFound />;

  return (
    <div className="space-y-5 p-8">
      <DetailBackLink />
      <PageHeader
        title="Detail Pendamping"
        description="Profil dan riwayat kontribusi pendamping pada semester berjalan."
      />
      <DetailProfileCard volunteer={volunteer} />
      <DetailRiwayatTable volunteer={volunteer} />
    </div>
  );
}