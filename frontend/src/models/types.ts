export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceRecord {
  id: number;
  userId: number;
  date: string;
  timing: 'morning' | 'afternoon' | 'evening' | 'night';
  status: 'present' | 'absent';
}

export interface AttendanceTable {
  date: string;
  timings: string[];
  users: User[];
  records: AttendanceRecord[];
}