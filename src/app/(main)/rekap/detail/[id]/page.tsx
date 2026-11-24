
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getRecapDetail, RecapApiError } from "@/lib/recap";

import DetailBackLink from "../../components/DetailBackLink";
import DetailNotFound from "../../components/DetailNotFound";
import DetailProfileCard from "../../components/DetailProfileCard";
import DetailRiwayatTable from "../../components/DetailRiwayatTable";
import type { RecapVolunteerDetail } from "../../components/types";

export default function DetailRekapPage() {
  const params = useParams<{ id: string }>();
  const mentorId = Number(params.id);

  const [volunteer, setVolunteer] =
    useState<RecapVolunteerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchDetail() {
      if (!Number.isSafeInteger(mentorId) || mentorId <= 0) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setNotFound(false);

        const response = await getRecapDetail(mentorId);

        if (!isMounted) return;

        setVolunteer(response.data);
      } catch (err) {
        if (!isMounted) return;

        const message =
          err instanceof Error
            ? err.message
            : "Gagal mengambil detail rekap volunteer.";

if (err instanceof RecapApiError && err.status === 404) {
  setNotFound(true);
} else {
  setError(message);
}
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [mentorId]);

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-5 lg:p-6">
        <div className="rounded-2xl border border-[#DCE6F2] bg-white px-5 py-16 text-center text-sm text-[#657892]">
          Memuat detail rekap volunteer...
        </div>
      </div>
    );
  }

  if (notFound) {
    return <DetailNotFound />;
  }

  if (error || !volunteer) {
    return (
      <div className="w-full space-y-4 p-4 sm:p-5 lg:p-6">
        <DetailBackLink />

        <div className="rounded-2xl border border-red-200 bg-white px-5 py-10 text-center">
          <p className="text-sm font-semibold text-red-600">
            {error || "Data detail volunteer tidak tersedia."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 p-4 text-[#0F2D5B] sm:p-5 lg:p-6">
      <DetailBackLink />

      <DetailProfileCard volunteer={volunteer} />

      <DetailRiwayatTable volunteer={volunteer} />
    </div>
  );
}
