import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';
import { Attendance } from '../models/attendance.model';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity) private readonly attRepo: Repository<AttendanceEntity>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOrCreate(userId: number, date: string, timing: string, status: string): Promise<Attendance> {
    const where = { userId, date, timing } as Partial<AttendanceEntity>;
    const existing = await this.attRepo.findOne({ where });
    if (existing) {
      existing.status = status;
      return this.attRepo.save(existing);
    }
    const created = this.attRepo.create({ userId, date, timing, status });
    return this.attRepo.save(created);
  }

  async findByDate(date: string): Promise<Attendance[]> {
    return this.attRepo.find({
      where: { date },
      relations: ['user'],
    });
  }
}