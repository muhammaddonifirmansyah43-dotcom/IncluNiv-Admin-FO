import NotificationHeader from "./_components/NotificationHeader";
import NotificationContent from "./_components/NotificationContent";

export default function NotifikasiPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 p-4 text-[#17345F] sm:p-6">
      <NotificationHeader />
      <NotificationContent />
    </div>
  );
}