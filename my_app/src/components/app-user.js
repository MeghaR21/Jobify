import React, { useState, useEffect } from 'react';
import { BrowserRouter as Button, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { instance } from './myaxios';
import JobAdvertUser from './jobadvertuser';


function AppUserPage() {
  const [jobAds, setJobAds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Dynamic admin status
  const [searchTerm, setSearchTerm] = useState(''); // For search functionality
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    localization: '',
    salary: '',
    date: '',
  });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN'); // Default language
  const navigate = useNavigate(); // For navigation after logout

  // Fetch job ads from the Laravel API when the component mounts
  useEffect(() => {
    fetchJobAds();
  }, []);

  const fetchJobAds = () => {
    instance.get('/advertisements_list')
      .then((response) => {
        setJobAds(response.data); // Store fetched job ads in state
      })
      .catch((error) => {
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

  // Handle Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token on logout
    setIsAdmin(false); // Reset admin state
    navigate('/'); // Redirect to login page
  };

  // Filtered and searched job ads
  const filteredJobAds = jobAds.filter(ad => {
    const matchesSearchTerm = ad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const matchesTitle = filters.title ? ad.title?.toLowerCase().includes(filters.title?.toLowerCase() || '') : true;
    const matchesCompany = filters.company ? ad.company_name?.toLowerCase().includes(filters.company?.toLowerCase() || '') : true;
    const matchesLocalization = filters.localization ? ad.place?.toLowerCase().includes(filters.localization?.toLowerCase() || '') : true;
    const matchesSalary = filters.salary ? (ad.salary >= filters.salary) : true;
    const matchesDate = filters.date ? (new Date(ad.creation_date) >= new Date(filters.date)) : true;

    console.log(`Ad: ${ad.title}, matchesSearchTerm: ${matchesSearchTerm}, matchesTitle: ${matchesTitle}, matchesCompany: ${matchesCompany}, matchesLocalization: ${matchesLocalization}, matchesSalary: ${matchesSalary}, matchesDate: ${matchesDate}`);
  
    return matchesSearchTerm && matchesTitle && matchesCompany && matchesLocalization && matchesSalary && matchesDate;
  });

  return (
    <>
    {/* Logout Button */}
    <Button className="mt-3 btn btn-warning" onClick={handleLogout}>
      Logout
    </Button>
    <Link to="/profile">  
      <button className="btn btn-pale-orange"> {language === 'EN' ? 'My Profils' : 'Mon Profile'} </button> 
    </Link>
    <button onClick={handleLogout}>Logout {language === 'EN' ? 'Log Out' : 'Déconnexion'} </button>
    <Link to="/suggestions" className="ms-3">
      <button className="btn btn-warning"> {language === 'EN' ? 'Suggestions' : 'Suggestions'} </button>
    </Link>
      {localStorage.getItem('token') && (
        <>
          {/* Search Bar and Filters */}
          <div className="container my-4">
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder={
                    language === 'EN'
                      ? 'Search in job description...'
                      : "Rechercher dans la description de l'emploi..."
                  }
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
                  placeholder={
                    language === 'EN' ? 'Filter by localization' : 'Filtrer par localisation'
                  }
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
              {filteredJobAds.length > 0 ? (
                filteredJobAds.map((ad) => (
                  <div key={ad.id} className="col-md-4 mb-4">
                    <JobAdvertUser
                      title={ad.job_title}
                      companyName={ad.company.name}
                      place={ad.location}
                      salary={ad.salary}
                      contractType={ad.contract_type}
                      description={ad.description}
                      fullDescription={ad.full_description}
                      creationDate={new Date(ad.created_at).toLocaleDateString()}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p>
                    {language === 'EN'
                      ? 'No job ads match your search or filters.'
                      : 'Aucune annonce ne correspond à vos critères.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AppUserPage;
