import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import Recruiter from './components/Recruiter';
import AppUser from './components/AppUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Recruiter" element={<Recruiter />} />
        <Route path="/AppUser" element={<AppUser />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
