"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("../attendance/attendance.entity");
const user_entity_1 = require("../users/user.entity");
let StatisticsService = class StatisticsService {
    attRepo;
    userRepo;
    constructor(attRepo, userRepo) {
        this.attRepo = attRepo;
        this.userRepo = userRepo;
    }
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
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.AttendanceEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map