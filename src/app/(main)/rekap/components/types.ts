
export interface RecapVolunteer {
  mentorId: number;
  userId: number;
  nim: string | null;
  fullName: string;
  email: string;
  photoUrl: string | null;
  department: string | null;
  totalActivities: number;
  totalHours: number;
}

export interface RecapActivity {
  assignmentId: number;
  studentId: number;
  studentName: string;
  startAt: string;
  endAt: string;
  location: string | null;
  status: string;
  confirmedAt: string | null;
  notes: string | null;
  durationHours: number;
}

export interface RecapVolunteerDetail extends RecapVolunteer {
  skills: string | null;
  activities: RecapActivity[];
}

export interface RecapListResponse {
  success: boolean;
  message: string;
  data: {
    totalVolunteers: number;
    totalMonthActivities: number;
    totalWeekActivities: number;
    volunteers: RecapVolunteer[];
  };
}

export interface RecapDetailResponse {
  success: boolean;
  message: string;
  data: RecapVolunteerDetail;
}
