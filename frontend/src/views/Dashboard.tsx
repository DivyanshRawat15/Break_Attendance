import React, { useEffect, useState } from 'react';
import { AttendanceService } from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  const refresh = () => AttendanceService.getStatistics().then(setStats).catch(() => setStats(null));

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('attendance:updated', handler);
    return () => window.removeEventListener('attendance:updated', handler);
  }, []);

  const renderStatCard = (title: string, value: string | number, color: string) => (
    <div className={`bg-white rounded-lg shadow p-6 ${color}`}>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {!stats ? (
        <p className="text-gray-500">Loading statistics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {renderStatCard('Total Users', stats.totalUsers || 0, 'bg-blue-50 text-blue-800')}
          {renderStatCard('Total Records', stats.totalRecords || 0, 'bg-purple-50 text-purple-800')}
          {renderStatCard('Today Attendance', stats.todayAttendance || 0, 'bg-green-50 text-green-800')}
          {renderStatCard('Avg. Attendance %', `${stats.avgAttendance || 0}%`, 'bg-orange-50 text-orange-800')}
        </div>
      )}

      {stats?.userStats && stats.userStats.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">User-wise Attendance Analysis</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-center">Present</th>
                <th className="p-2 text-center">Absent</th>
                <th className="p-2 text-center">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {stats.userStats.map((u: any) => (
                <tr key={u.id} className="border-b">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 text-center text-green-600">{u.present}</td>
                  <td className="p-2 text-center text-red-600">{u.absent}</td>
                  <td className="p-2 text-center font-semibold">{u.attendancePercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;