import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceEntity } from '../attendance/attendance.entity';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(AttendanceEntity) private readonly attRepo: Repository<AttendanceEntity>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getOverview() {
    const totalUsers = await this.userRepo.count();
    const totalRecords = await this.attRepo.count();

    const today = new Date().toISOString().slice(0, 10);
    const todayRecords = await this.attRepo.find({
      where: { date: today },
      relations: ['user'],
    });
    const todayAttendance = todayRecords.length;

    const allRecords = await this.attRepo.find({
      relations: ['user'],
    });
    const uniqueUserDates = new Set(allRecords.map(r => `${r.userId}-${r.date}`));
    const todayUnique = new Set(todayRecords.map(r => `${r.userId}-${r.date}`));
    const avgAttendance = totalUsers && totalUsers > 0 ? Number((todayUnique.size / totalUsers) * 100).toFixed(2) : 0;

    const userStats = [];
    for (const user of await this.userRepo.find()) {
      const records = allRecords.filter(r => r.userId === user.id);
      const present = records.filter(r => r.status === 'present').length;
      const absent = records.filter(r => r.status === 'absent').length;
      const attendancePercentage = records.length > 0 ? Number(((present / records.length) * 100) || 0).toFixed(2) : 0;
      userStats.push({
        id: user.id,
        name: user.name,
        email: user.email,
        present,
        absent,
        attendancePercentage,
      });
    }

    return {
      totalUsers,
      totalRecords,
      todayAttendance,
      avgAttendance: Number(avgAttendance),
      userStats,
    };
  }
}