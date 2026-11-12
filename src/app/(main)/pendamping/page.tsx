import PageHeader from "@/components/ui/PageHeader";
import PendampingContent from "./_components/PendampingContent";

export default function PendampingPage() {
  return (
    <div className="w-full space-y-6 p-4 text-[#17345F] sm:p-5">
      <PageHeader
        title="Data Pendamping"
        description="Kelola data mahasiswa relawan pendamping."
      />
      <PendampingContent />
    </div>
  );
}