import { UserService } from '../services/api';

export class AttendanceController {
  static async getUsers() {
    return UserService.getAll();
  }
}