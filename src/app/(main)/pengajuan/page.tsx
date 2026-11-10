import PengajuanHeader from "./_components/PengajuanHeader";
import PengajuanList from "./_components/PengajuanList";

export default function PengajuanPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 p-4 text-[#17345F] sm:p-6">
      <PengajuanHeader />
      <PengajuanList />
    </div>
  );
}