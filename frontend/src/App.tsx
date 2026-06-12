import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Users from './views/Users';
import Attendance from './views/Attendance';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex gap-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">Dashboard</Link>
          <Link to="/users" className="text-blue-600 hover:text-blue-800 font-semibold">Users</Link>
          <Link to="/attendance" className="text-blue-600 hover:text-blue-800 font-semibold">Attendance</Link>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;