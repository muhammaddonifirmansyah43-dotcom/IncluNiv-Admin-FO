
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  getPendingPermissions,
  mapPermissionsToPengajuan,
} from "@/lib/permissions";
import type { Pengajuan } from "@/types/pengajuan";

import DetailProfilCard from "../_components/DetailProfilCard";
import DetailInfoCard from "../_components/DetailInfoCard";
import DetailKeteranganCard from "../_components/DetailKeteranganCard";
import DetailAiCard from "../_components/DetailAiCard";

export default function PengajuanDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [item, setItem] = useState<Pengajuan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      try {
        setLoading(true);
        setError(null);

        const response = await getPendingPermissions();
        const mappedItems = mapPermissionsToPengajuan(response.data);

        const selectedItem = mappedItems.find(
          (permission) => permission.id === id
        );

        if (active) {
          setItem(selectedItem ?? null);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Gagal mengambil detail pengajuan."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4 text-[#17345F] sm:p-6">
      <Link
        href="/pengajuan"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] transition hover:text-[#17345F] hover:underline rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke Halaman Pengajuan
      </Link>

      {loading ? (
        <p className="py-10 text-center text-sm text-slate-500">
          Memuat detail pengajuan...
        </p>
      ) : error ? (
        <p className="py-10 text-center text-sm text-red-600">
          {error}
        </p>
      ) : !item ? (
        <p className="py-10 text-center text-sm text-slate-500">
          Pengajuan tidak ditemukan atau tidak tersedia.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <DetailProfilCard item={item} />
          <DetailInfoCard item={item} />
          <DetailKeteranganCard item={item} />
          <DetailAiCard item={item} />
        </div>
      )}
    </div>
  );
}
