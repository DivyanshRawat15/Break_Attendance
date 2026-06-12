import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceEntity } from './attendance.entity';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  async getByDate(@Query('date') date: string): Promise<AttendanceEntity[]> {
    if (!date) throw new BadRequestException('date query is required');
    return this.attendanceService.findByDate(date);
  }

  @Post()
  async save(@Body() body: Partial<AttendanceEntity>) {
    const userId = Number(body.userId);
    if (!userId || !body.date || !body.timing || !body.status) {
      throw new BadRequestException('userId, date, timing, and status are required');
    }
    const record = await this.attendanceService.findOrCreate(userId, String(body.date), String(body.timing), String(body.status));
    return this.attendanceService.findByDate(String(body.date));
  }
}