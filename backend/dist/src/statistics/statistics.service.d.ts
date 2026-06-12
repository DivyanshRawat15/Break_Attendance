import { Repository } from 'typeorm';
import { AttendanceEntity } from '../attendance/attendance.entity';
import { UserEntity } from '../users/user.entity';
export declare class StatisticsService {
    private readonly attRepo;
    private readonly userRepo;
    constructor(attRepo: Repository<AttendanceEntity>, userRepo: Repository<UserEntity>);
    getOverview(): Promise<{
        totalUsers: number;
        totalRecords: number;
        todayAttendance: number;
        avgAttendance: number;
        userStats: {
            id: number;
            name: string;
            email: string;
            present: number;
            absent: number;
            attendancePercentage: string | number;
        }[];
    }>;
}
