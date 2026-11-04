import DashboardHeader from "./_components/DashboardHeader";
import StatisticsChart from "./_components/StatisticsChart";
import ScheduleCalendar from "./_components/ScheduleCalendar";
import StudentSummaryCard from "./_components/StudentSummaryCard";
import VolunteerSummaryCard from "./_components/VolunteerSummaryCard";
import PermissionRequestCard from "./_components/PermissionRequestCard";

export default function DashboardPage() {
  return (
    <div className="min-h-full space-y-5 bg-[#E6F0FF] p-4 text-[#17345F] sm:p-5">
      <DashboardHeader />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(270px,0.9fr)]">
        <StatisticsChart />
        <ScheduleCalendar />
      </section>

      <section className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StudentSummaryCard />
        <VolunteerSummaryCard />
        <PermissionRequestCard />
      </section>
    </div>
  );
}