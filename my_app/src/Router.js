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
import'./components/layouts/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
        <header className="header">
          <div className="header-background">
            <h1><span class="first-letter">J</span>obify</h1>
            <p>Find your next career hit!</p>
          </div>

          <div className="switch-container">
            <div className="form-check form-switch">
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
          <Route path="/footer" element={<Footer/>}/>
        </Routes>

        {/* Footer */}
        <footer className={`footer p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <div className="text-center">
            <a href="/privacy-policy" className="text-decoration-none text-reset">Jobify</a>
            <span className="mx-2">|</span>
            <a href="/privacy-policy" className="text-decoration-none text-reset">All rights reserved</a>
            <span className="mx-2">|</span>
            <a href="/privacy-policy" className="text-decoration-none text-reset">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="/terms-of-service" className="text-decoration-none text-reset">Terms of Service</a>
          </div>
          <div className="social-media mt-3">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fa-brands fa-linkedin" ></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.epitech.eu" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fa-solid fa-share-nodes"></i>
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default AppRouter;
