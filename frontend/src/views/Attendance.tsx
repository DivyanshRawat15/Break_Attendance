import React, { useEffect, useState } from 'react';
import { useAttendanceController } from '../controllers/attendanceController';
import { UserService } from '../services/api';

const AttendanceView: React.FC = () => {
  const { selectedDate, records, loading, timings, users, setUsers, statusDrafts, updateDraft, submitChanges, submitMessage, fetchAttendance, handleDateChange } = useAttendanceController();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    UserService.getAll().then(setUsers);
  }, []);

  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [selectedDate, fetchAttendance]);

  const getDaysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Attendance Calendar</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-4 items-center">
          <label className="font-medium">Month:</label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="border rounded px-3 py-2">
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>

          <label className="font-medium">Year:</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="border rounded px-3 py-2">
            {Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - 2 + i)).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-7 gap-2 mt-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-600">{day}</div>
          ))}
          <div className="contents">
            {Array.from({ length: new Date(selectedYear, selectedMonth - 1, 1).getDay() }, (_, i) => <div key={`empty-${i}`} />)}
            {days.map(day => {
              const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = dateStr === selectedDate;
              return (
                <button
                  key={day}
                  onClick={() => handleDateChange(dateStr)}
                  className={`p-2 rounded border text-center ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-blue-50'}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">Attendance for {selectedDate}</h2>

      {loading && <p>Loading...</p>}

      {users.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left font-semibold">Timing</th>
                {users.map(user => (
                  <th key={user.id} className="p-3 text-center font-semibold">{user.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timings.map(timing => (
                <tr key={timing} className="border-b">
                  <td className="p-3 font-medium capitalize">{timing}</td>
                  {users.map(user => {
                    const key = `${user.id}-${timing}`;
                    const draft = statusDrafts[key] ?? '';
                    return (
                      <td key={user.id} className="p-3 text-center">
                        <input
                          value={draft}
                          onChange={(e) => updateDraft(key, e.target.value)}
                          placeholder="present / absent"
                          className={`border rounded px-2 py-1 w-36 ${draft.toLowerCase() === 'present' ? 'bg-green-100 text-green-800' : draft.toLowerCase() === 'absent' ? 'bg-red-100 text-red-800' : 'bg-white'}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center gap-4 p-4">
            <button type="button" onClick={submitChanges} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            {submitMessage && <span className="text-sm text-gray-700">{submitMessage}</span>}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No users found. Add users first.</p>
      )}
    </div>
  );
};

export default AttendanceView;