import { UserEntity } from '../users/user.entity';
export declare class AttendanceEntity {
    id: number;
    userId: number;
    date: string;
    timing: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
