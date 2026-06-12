import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getStatistics(): Promise<{
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
