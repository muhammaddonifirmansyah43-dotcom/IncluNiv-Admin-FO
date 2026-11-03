export type Period = "Mingguan" | "Bulanan" | "Semester";

export type ChartSeries = {
  labels: string[];
  values: number[];
};

export type RequestTone = "green" | "orange" | "red";

export type PermissionRequest = {
  name: string;
  detail: string;
  status: string;
  tone: RequestTone;
};