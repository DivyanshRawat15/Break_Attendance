import { Repository } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';
import { Attendance } from '../models/attendance.model';
import { UserEntity } from '../users/user.entity';
export declare class AttendanceService {
    private readonly attRepo;
    private readonly userRepo;
    constructor(attRepo: Repository<AttendanceEntity>, userRepo: Repository<UserEntity>);
    findOrCreate(userId: number, date: string, timing: string, status: string): Promise<Attendance>;
    findByDate(date: string): Promise<Attendance[]>;
}
