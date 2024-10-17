import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { instance } from './components/myaxios';
import AdminDashboard from './components/admin-dashboard';
import LoginPage from './components/login';
import Suggestions from './components/suggestions';
import JobAdForm from './components/recruiter';
import HomePage from './components/homepage';
import AppUserPage from './components/app-user';
import JobAdvert from './components/jobadvert'
import JobAdvertUser from './components/jobadvertuser';
import Profile from './components/profile';
import LogoutButton from './components/logout';


function AppRouter() {
  const [jobAds, setJobAds] = useState([]);
  const [isAdmin, ] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN'); // Default language

  // Handle Dark/Light Theme Switch
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Handle Language Switch
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'EN' ? 'FR' : 'EN'));
  };

  // Fetch job ads from the Laravel API when the component mounts
  useEffect(() => {
    fetchJobAds();
  }, []);

  const fetchJobAds = () => {
    instance.get("/advertisements_list") // Use env variable
      .then(response => {
        setJobAds(response.data); // Store fetched job ads in state
      })
      .catch(error => {
        console.error('Error fetching job ads:', error);
      });
  };
  
  return (
    <Router>
      <div className={`App ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        {/* Header */}
        <header className={`header_class=d-flex justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <div>
            <h1>Jobify</h1>
            <p>{language === 'EN' ? 'Find your next career hit!' : 'Trouvez votre prochaine carrière!'}</p>
          </div>

          {/* Dark/Light and Language Switches */}
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

            {/* Language Switch */}
            <button className="btn btn-outline-primary me-3" onClick={toggleLanguage}>
              {language === 'EN' ? 'FR' : 'EN'}
            </button>
          </div>
        </header>

        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/recruiter"element={<JobAdForm/>}/>
          <Route path="/app-user"element={<AppUserPage/>}/>
          <Route path="/" element={<HomePage darkMode={darkMode} language={language}/>}/>
          <Route path="/login"element={!isAdmin ? <LoginPage /> : <Navigate to="/admin-dashboard"/>}/>
          <Route path="/jobadvert" element={<JobAdvert/>}/>
          <Route path="/jobadvertuser" element={<JobAdvertUser/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/logout" element={<LogoutButton/>}/>

          {/* Suggestions Route */}
          <Route path="/suggestions"
            element={<Suggestions darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />}
          />
        </Routes>

        {/* Footer */}
        <footer className={`footer_class=d-flex justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <div>
            <p>&copy; {new Date().getFullYear()} Jobify. {language === 'EN' ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
          </div>
          <div>
            <a href="/privacy-policy" className="text-decoration-none text-reset">{language === 'EN' ? 'Privacy Policy' : 'Politique de confidentialité'}</a>
            <span className="mx-2">|</span>
            <a href="/terms-of-service" className="text-decoration-none text-reset">{language === 'EN' ? 'Terms of Service' : 'Conditions d\'utilisation'}</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default AppRouter;
