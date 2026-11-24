import NotificationHeader from "./_components/NotificationHeader";
import NotificationContent from "./_components/NotificationContent";

export default function NotifikasiPage() {
  return (
    <div className="w-full space-y-5 p-4 text-[#17345F] sm:p-5">
      <NotificationHeader />
      <NotificationContent />
    </div>
  );
}