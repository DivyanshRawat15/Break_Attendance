import { useState, useCallback } from 'react';
import { AttendanceRecord, User } from '../models/types';
import { AttendanceService } from '../services/api';

const TIMINGS = ['11:00', '15:00', '17:00', '19:00'] as const;

export const useAttendanceController = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<Record<string, AttendanceRecord>>({});
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const fetchAttendance = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const data = await AttendanceService.getByDate(date);
      const recordMap: Record<string, AttendanceRecord> = {};
      const draftMap: Record<string, string> = {};
      data.forEach(r => {
        recordMap[`${r.userId}-${r.timing}`] = r;
        draftMap[`${r.userId}-${r.timing}`] = r.status;
      });
      setRecords(recordMap);
      setStatusDrafts(draftMap);
    } catch (err) {
      console.error('Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  }, []);



  const updateDraft = (key: string, value: string) => {
    setStatusDrafts(prev => ({ ...prev, [key]: value }));
  };

  const submitChanges = async () => {
    setSubmitMessage(null);
    try {
      const entries = Object.entries(statusDrafts);
      for (const [key, value] of entries) {
        const [userId, timing] = key.split('-');
        await AttendanceService.saveRecord({ userId: Number(userId), date: selectedDate, timing, status: value });
      }
      await fetchAttendance(selectedDate);
      setSubmitMessage('Attendance updated successfully');
      setTimeout(() => setSubmitMessage(null), 3000);
      window.dispatchEvent(new Event('attendance:updated'));
    } catch (err) {
      setSubmitMessage('Failed to update attendance');
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    fetchAttendance(date);
  };

  return {
    selectedDate,
    records,
    users,
    setUsers,
    loading,
    statistics,
    timings: TIMINGS,
    statusDrafts,
    updateDraft,
    submitChanges,
    submitMessage,
    fetchAttendance,
    handleDateChange,
  };
};