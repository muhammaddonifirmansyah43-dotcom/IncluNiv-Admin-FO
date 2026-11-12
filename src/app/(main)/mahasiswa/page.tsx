import PageHeader from "@/components/ui/PageHeader";
import MahasiswaContent from "./component/MahasiswaContent";

export default function MahasiswaPage() {
  return (
    <div className="w-full space-y-6 p-4 text-[#17345F] sm:p-5">
      <PageHeader
        title="Data Mahasiswa Difabel"
        description="Kelola data mahasiswa difabel dan pantau kebutuhan pendampingan mereka."
      />
      <MahasiswaContent />
    </div>
  );
}