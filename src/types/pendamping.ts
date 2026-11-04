export type Pendamping = {
  id: string;
  nama: string;
  nim: string;
  fakultas: string;
};

export type Course = {
  nama: string;
  sks: number;
  jam: string;
  ruang: string;
  dosen: string;
};

export type ScheduleDay = {
  hari: string;
  courses: Course[];
};

export type PendampingDetail = Pendamping & {
  prodi: string;
  email: string;
  whatsapp: string;
  keahlian: string;
  jadwal: ScheduleDay[];
};