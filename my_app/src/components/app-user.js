import React, { useState, useEffect } from 'react';
import { BrowserRouter as Button, Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { instance } from './myaxios';
import JobAdvertUser from './jobadvertuser';


function AppUserPage(darkMode) {
  const [jobAds, setJobAds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Dynamic admin status
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    localization: '',
    salary: '',
    date: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [showAlert, setShowAlert] = useState(false); 
  const navigate = useNavigate(); // For navigation after logout

  // Check if the user is authenticated and has the correct role
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('user_role');

  // if (!token) {
  //   setErrorMessage('You must be logged in to access this page.');
  //   setAuthenticated(false);
  //   return;
  // }

  // Fetch job ads from the Laravel API when the component mounts
  useEffect(() => {
    if (!token) {
      setErrorMessage('You must be logged in to access this page.');
      setShowAlert(true); // Show the alert if the user is not authenticated
      return;
    } else {
      fetchJobAds(); // Fetch job ads only if the user is authenticated
    }
  }, [token]);

  const fetchJobAds = () => {
    instance.get('/advertisements_list')
      .then((response) => {
        setJobAds(response.data);
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
    localStorage.removeItem('user_id'); // Reset admin state
    navigate('/'); // Redirect to login page
  };

  // Filtered and searched job ads
  const filteredJobAds = jobAds.filter(ad => {
    // const matchesSearchTerm = filters.searchTerm ? ad.description.toLowerCase().includes(searchTerm.toLowerCase().trim()):true;
    const matchesTitle = filters.title ? ad.job_title.toLowerCase().includes(filters.title.toLowerCase().trim()) : true;
    const matchesCompany = filters.company ? ad.company.name.toLowerCase().includes(filters.company.toLowerCase().trim()) : true;
    const matchesLocalization = filters.localization ? ad.location.toLowerCase().includes(filters.localization.toLowerCase().trim()) : true;
    const matchesSalary = filters.salary ? parseFloat(ad.salary) >= parseFloat(filters.salary) : true;
    const matchesDate = filters.date ? new Date(ad.creation_date) >= new Date(filters.date) : true;

    return matchesTitle && matchesCompany && matchesLocalization && matchesSalary && matchesDate;
  });

  return (
    <>
      {/* Display the alert if there's an error message */}
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {errorMessage}
        </Alert>
      )}
  
      {token && (
        <>
          <div className="container">
            <div className="row">
              {/* Logout and Profile Buttons */}
              <div className="col-md-2 login-container mb-3">
                <Link to="/profile" className="login-link">
                  <button className="btn-spotify-style" onClick={() => console.log('Button clicked!')}>
                    Profile
                  </button>
                </Link>
                <Link to="/" className="login-link">
                  <button className="btn-spotify-style" onClick={handleLogout}>
                    Logout
                  </button>
                </Link>
              </div>
              {/* Search Bar and Filters */}
              <div className="col-md-8">
                <div className="row mt-3 search-filter-container justify-content-start">
                  <div className="col-md-4">
                    <input
                      type="text"
                      placeholder="Search in job description..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="form-control"
                    />
                  </div>
  
                  {['title', 'company', 'localization', 'salary', 'date'].map((filter, index) => (
                    <div className={`col-md-${filter === 'date' ? '2' : '3'} mb-2`} key={index}>
                      <input
                        type={filter === 'salary' ? 'number' : filter === 'date' ? 'date' : 'text'}
                        placeholder={`Filter by ${filter}`}
                        className="form-control"
                        name={filter}
                        value={filters[filter]}
                        onChange={handleFilterChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Job Ads Listing */}
            <div className="container my-5">
              <div className="row">
                {filteredJobAds.length > 0 ? (
                  filteredJobAds.map((ad) => (
                    <div key={ad.id} className="playlist-container">
                      <JobAdvertUser
                        title={ad.job_title}
                        companyName={ad.company.name}
                        place={ad.location}
                        salary={ad.salary}
                        contractType={ad.contract_type}
                        description={ad.description}
                        fullDescription={ad.full_description}
                        creationDate={new Date(ad.created_at).toLocaleDateString()}
                        advertisementId={ad.id}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <p>No job ads match your search or filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}  

export default AppUserPage;
