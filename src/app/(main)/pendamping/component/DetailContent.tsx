"use client";

import { useState } from "react";
import type { PendampingDetail } from "@/types/pendamping";
import ProfileCard from "./ProfileCard";
import DetailTabs, { type TabKey } from "./DetailTabs";
import DataDiriTab from "./DataDiriTab";
import ScheduleTab from "./ScheduleTab";

export default function DetailContent({ data }: { data: PendampingDetail }) {
  const [tab, setTab] = useState<TabKey>("diri");

  return (
    <div className="space-y-4">
      <ProfileCard data={data} />
      <DetailTabs value={tab} onChange={setTab} />

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
      >
        {tab === "diri" ? (
          <DataDiriTab data={data} />
        ) : (
          <ScheduleTab jadwal={data.jadwal} />
        )}
      </div>
    </div>
  );
}