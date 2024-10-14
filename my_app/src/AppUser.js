import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { instance } from './components/MyAxios';
import JobAdvert from './components/JobAdvertUser';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';

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
      <div className={`App ${theme}`}>
        {/* Toggle for Light/Dark Mode */}
        <div className="toggle-theme">
          <label>
            <input type="checkbox" onChange={toggleTheme} />
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </label>
        </div>

        {/* Toggle for Language Switch */}
        <div className="toggle-language">
          <label>
            <input type="checkbox" onChange={toggleLanguage} />
            {language === 'EN' ? 'Switch to Français' : 'Switch to English'}
          </label>
        </div>

        <Routes>
          {/* Admin Dashboard Route */}
          <Route
            path="/AdminDashboard"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />

          {/* Job Board Route */}
          <Route
            path="/"
            element={
              <>
                {/* Job Board Header */}
                <header className="bg-orange text-white text-center py-5">
                <h1>{language === 'EN' ? 'Jobify' : 'Jobify'}</h1>
                <p>{language === 'EN' ? 'Find your next career hit!' : 'Trouvez votre prochain succès professionnel!'}</p>
                  {/* Login Button */}
                  <Link to="/profile">
                    <button className="btn btn-pale-orange">Profile</button>
                  </Link>
                  <Link to="/suggestions" className="ms-3">
                    <button className="btn btn-secondary">{language === 'EN' ? 'Suggestions/Ideas' : 'Suggestions / Idées'}</button>
                  </Link>
                </header>

                {/* Search Bar and Filters */}
                <div className="container my-4">
                  <div className="row">
                    <div className="col-md-4">
                      <input
                        type="text"
                        placeholder={language === 'EN' ? 'Search in job description...' : 'Rechercher dans la description de l\'emploi...'}
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
                            title={ad.title}
                            companyName={ad.company_name}
                            place={ad.place}
                            salary={ad.salary}
                            contractType={ad.contract_type}
                            description={ad.description}
                            fullDescription={ad.full_description}
                            creationDate={new Date(ad.creation_date).toLocaleDateString()}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="text-center">
                        <p>{language === 'EN' ? 'No job ads match your search or filters.' : 'Aucune annonce d\'emploi ne correspond à votre recherche ou à vos filtres.'}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <footer className="bg-dark text-white text-center py-3">
                  <p>&copy; 2024 Job Board. All rights reserved.</p>
                </footer>
              </>
            }
          />

          {/* Suggestions Page */}
          <Route
            path="/suggestions"
            element={<Suggestions />}
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={!isAdmin ? <LoginPage /> : <Navigate to="/AdminDashboard" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

