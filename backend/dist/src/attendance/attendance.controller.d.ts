import { AttendanceService } from './attendance.service';
import { Attendance } from '../models/attendance.model';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    getByDate(date: string): Promise<Attendance[]>;
    save(body: Partial<Attendance>): Promise<Attendance[]>;
}
