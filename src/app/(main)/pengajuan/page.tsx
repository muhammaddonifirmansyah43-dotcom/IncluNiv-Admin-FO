
import PengajuanHeader from "./_components/PengajuanHeader";
import PengajuanList from "./_components/PengajuanList";

export default function PengajuanPage() {
  return (
    <div className="w-full space-y-5 p-4 text-[#17345F] sm:p-5">
      <PengajuanHeader />
      <PengajuanList />
    </div>
  );
}
