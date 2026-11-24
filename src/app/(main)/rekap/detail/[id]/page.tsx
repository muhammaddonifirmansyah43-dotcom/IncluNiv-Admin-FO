
"use client";

import { useParams } from "next/navigation";

import { volunteerData } from "../../components/RekapData";
import DetailBackLink from "../../components/DetailBackLink";
import DetailNotFound from "../../components/DetailNotFound";
import DetailProfileCard from "../../components/DetailProfileCard";
import DetailRiwayatTable from "../../components/DetailRiwayatTable";

export default function DetailRekapPage() {
  const { id } = useParams();
  const volunteer = volunteerData.find((v) => v.id === Number(id));

  if (!volunteer) {
    return <DetailNotFound />;
  }

  return (
    <div className="w-full space-y-4 p-4 text-[#0F2D5B] sm:p-5 lg:p-6">
      <DetailBackLink />

      <DetailProfileCard volunteer={volunteer} />

      <DetailRiwayatTable volunteer={volunteer} />
    </div>
  );
}
