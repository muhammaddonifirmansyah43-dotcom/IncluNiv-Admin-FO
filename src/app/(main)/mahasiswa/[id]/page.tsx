
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MahasiswaHeader from "../component/MahasiswaHeader";
import DataDiri from "../component/DataDiri";
import JadwalKuliah from "../component/JadwalKuliah";
import RiwayatPendampingan from "../component/RiwayatPendampingan";

export default function MahasiswaDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("data-diri");

  return (
    <div className="min-h-full w-full bg-[#E6F0FF] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto w-full max-w-[1440px] space-y-5">
        <MahasiswaHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBack={() => router.push("/mahasiswa")}
        />

        <div className="min-w-0">
          {activeTab === "data-diri" && <DataDiri />}
          {activeTab === "jadwal" && <JadwalKuliah />}
          {activeTab === "riwayat" && <RiwayatPendampingan />}
        </div>
      </div>
    </div>
  );
}
