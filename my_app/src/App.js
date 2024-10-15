import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { instance } from './components/MyAxios';
import JobAdvert from './components/JobAdvert';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import Suggestions from './components/Suggestions';
import Recruiter from './components/Recruiter';

function App() {
  const [jobAds, setJobAds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // For search engine
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    localization: '',
    salary: '',
    date: '',
  });

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

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filtered and searched job ads
  const filteredJobAds = jobAds.filter(ad => {
    const matchesSearchTerm = ad.description.toLowerCase().includes(searchTerm);
    const matchesTitle = filters.title ? ad.title.toLowerCase().includes(filters.title.toLowerCase()) : true;
    const matchesCompany = filters.company ? ad.company_name.toLowerCase().includes(filters.company.toLowerCase()) : true;
    const matchesLocalization = filters.localization ? ad.place.toLowerCase().includes(filters.localization.toLowerCase()) : true;
    const matchesSalary = filters.salary ? ad.salary >= filters.salary : true;
    const matchesDate = filters.date ? new Date(ad.creation_date) >= new Date(filters.date) : true;

    return matchesSearchTerm && matchesTitle && matchesCompany && matchesLocalization && matchesSalary && matchesDate;
  });

  return (
    <Router>
      <div className={`App ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        {/* Header */}
        <header className={`d-flex justify-content-between align-items-center p-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
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
          {/* Admin Dashboard Route */}
          <Route
             path="/" element={<LoginPage />} />
             <Route path="/AdminDashboard" element={<AdminDashboard />} />
             <Route path="/Recruiter"element={<JobAdForm />}  />
             {/* Add more routes as needed */}

          {/* Job Board Route */}
          <Route
            path="/"
            element={
              <>
                {/* Search Bar and Filters */}
                <div className="container my-4">
                  <div className="row">
                    <div className="col-md-4">
                      <input
                        type="text"
                        placeholder={language === 'EN' ? 'Search in job description...' : 'Recherchez dans la description...'}
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        type="text"
                        placeholder={language === 'EN' ? 'Filter by title' : 'Filtrer par titre'}
                        className="form-control"
                        name="title"
                        value={filters.title}
                        onChange={handleFilterChange}
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        type="text"
                        placeholder={language === 'EN' ? 'Filter by company' : 'Filtrer par entreprise'}
                        className="form-control"
                        name="company"
                        value={filters.company}
                        onChange={handleFilterChange}
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        type="text"
                        placeholder={language === 'EN' ? 'Filter by localization' : 'Filtrer par localisation'}
                        className="form-control"
                        name="localization"
                        value={filters.localization}
                        onChange={handleFilterChange}
                      />
                    </div>

                    <div className="col-md-1">
                      <input
                        type="number"
                        placeholder={language === 'EN' ? 'Salary' : 'Salaire'}
                        className="form-control"
                        name="salary"
                        value={filters.salary}
                        onChange={handleFilterChange}
                      />
                    </div>

                    <div className="col-md-1">
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Job Ads Listing */}
                <div className="container my-5">
                  <div className="row">
                    {/* Map through the filtered and searched job ads and render JobAdvert components */}
                    {filteredJobAds.length > 0 ? (
                      filteredJobAds.map((ad) => (
                        <div key={ad.id} className="col-md-4 mb-4">
                          <JobAdvert
                            title={ad.job_title}
                            companyName={ad.company_id}
                            place={ad.location}
                            salary={ad.salary}
                            contractType={ad.contract_type}
                            description={ad.description}
                            fullDescription={ad.full_description}
                            creationDate={new Date(ad.creation_at).toLocaleDateString()}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="text-center">
                        <p>{language === 'EN' ? 'No job ads match your search or filters.' : "Aucune annonce d'emploi ne correspond à votre recherche ou à vos filtres."}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <footer className={`text-center py-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                  <p>&copy; 2024 Job Board. {language === 'EN' ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
                </footer>
              </>
            }
          />

          {/* Login Route */}
          <Route
            path="*"
            element={!isAdmin ? <LoginPage /> : <Navigate to="/AdminDashboard" />}
          />

          {/* Suggestions Route */}
          <Route
            path="/suggestions"
            element={<Suggestions darkMode={darkMode} toggleDarkMode={toggleDarkMode} language={language} toggleLanguage={toggleLanguage} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
