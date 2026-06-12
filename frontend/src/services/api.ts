import axios from 'axios';
import { User, AttendanceRecord } from '../models/types';

const API_BASE = '/api';

export class UserService {
  static async getAll(): Promise<User[]> {
    const response = await axios.get<User[]>(`${API_BASE}/users`);
    return response.data;
  }

  static async create(user: Partial<User>): Promise<User> {
    const response = await axios.post<User>(`${API_BASE}/users`, user);
    return response.data;
  }

  static async update(id: number, user: Partial<User>): Promise<User> {
    const response = await axios.put<User>(`${API_BASE}/users/${id}`, user);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await axios.delete(`${API_BASE}/users/${id}`);
  }
}

export class AttendanceService {
  static async getByDate(date: string): Promise<AttendanceRecord[]> {
    const response = await axios.get<AttendanceRecord[]>(`${API_BASE}/attendance?date=${date}`);
    return response.data;
  }

  static async saveRecord(record: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
    const response = await axios.post<AttendanceRecord>(`${API_BASE}/attendance`, record);
    return response.data;
  }

  static async getStatistics(): Promise<any> {
    const response = await axios.get(`${API_BASE}/statistics`);
    return response.data;
  }
}