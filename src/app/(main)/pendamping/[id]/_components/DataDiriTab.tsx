import type { PendampingDetail } from "@/types/pendamping";
import AcademicInfoCard from "./AcademicInfoCard";
import ExpertiseCard from "./ExpertiseCard";

export default function DataDiriTab({ data }: { data: PendampingDetail }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
      <AcademicInfoCard data={data} />
      <ExpertiseCard keahlian={data.keahlian} />
    </div>
  );
}