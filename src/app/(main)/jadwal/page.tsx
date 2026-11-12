import PageHeader from "@/components/ui/PageHeader";
import JadwalContent from "./components/JadwalContent";

export default function JadwalPage() {
  return (
    <div className="w-full space-y-6 p-4 text-[#17345F] sm:p-5">
      <PageHeader
        title="Penjadwalan Pendampingan"
        description="Pantau dan kelola sinkronisasi jadwal pendampingan antara mahasiswa difabel dan volunteer secara berkala."
      />
      <JadwalContent />
    </div>
  );
}