import { AttendanceService } from './attendance.service';
import { AttendanceEntity } from './attendance.entity';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    getByDate(date: string): Promise<AttendanceEntity[]>;
    save(body: Partial<AttendanceEntity>): Promise<AttendanceEntity[]>;
}
