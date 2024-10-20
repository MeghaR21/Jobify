import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { instance } from './components/myaxios';

import AdminDashboard from './components/admin-dashboard';
import LoginPage from './components/login';
import JobAdForm from './components/recruiter';
import HomePage from './components/homepage';
import AppUserPage from './components/app-user';
import JobAdvert from './components/jobadvert'
import JobAdvertUser from './components/jobadvertuser';
import Profile from './components/profile';
import Wizard from './components/wizard.jsx';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layouts/Header.jsx';
import Footer from './components/layouts/Footer.jsx';


function AppRouter() {

  const [darkMode, setDarkMode] = useState(false);

  // Handle Dark/Light Theme Switch
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  
  return (
    <Router>
      <div className={`App ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        {/* Header */}
        <header className={`d-flex justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark' : 'bg-light'} border-bottom`} style={{ width: "100%" }}>
          <div>
            <h1 style={{ backgroundColor: "black", color: "green", textAlign: "center", padding: "2rem 0", fontSize: "3rem", fontFamily: "Montserrat, sans-serif" }}>Jobify</h1>
            <p>Find your next career hit!</p>
          </div>

          {/* Dark/Light Switches */}
          <div className="d-flex align-items-center">
            {/* Dark/Light Switch */}
            <div className="form-check form-switch me-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                {darkMode ? 'Dark' : 'Light'}
              </label>
            </div>
          </div>
        </header>

        <Routes>
          {/* <Route path="/" element={<Fonction />} /> */}
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/recruiter"element={<JobAdForm/>}/>
          <Route path="/app-user"element={<AppUserPage/>}/>
          <Route path="/" element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>}/>
          <Route path="/login"element={<LoginPage />}/>
          <Route path="/jobadvert" element={<JobAdvert/>}/>
          <Route path="/jobadvertuser" element={<JobAdvertUser/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/wizard" element={<Wizard/>}/>
          <Route path="/header" element={<Header/>}/>
          <Route path="/footer" element={<Footer/>}/>
        </Routes>

        {/* Footer */}
        <footer className={`footer_class=d-flex justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <div>
            <p>&copy; {new Date().getFullYear()} Jobify.All rights reserved.</p>
          </div>
          <div>
            <a href="/privacy-policy" className="text-decoration-none text-reset">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="/terms-of-service" className="text-decoration-none text-reset">Terms of Service'</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default AppRouter;
