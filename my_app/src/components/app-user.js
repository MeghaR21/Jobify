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
          {/* Logout Button */}
          <Link to="/profile">
            <button className="btn btn-pale-orange">My Profile</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>

          {/* Search Bar and Filters */}
          <div className="container my-4">
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder='Filter by title'
                  className="form-control"
                  name="title"
                  value={filters.title}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  placeholder='Filter by company'
                  className="form-control"
                  name="company"
                  value={filters.company}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-md-2">
                <input
                  type="text"
                  placeholder='Filter by localization'
                  className="form-control"
                  name="localization"
                  value={filters.localization}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  placeholder='Salary'
                  className="form-control"
                  name="salary"
                  value={filters.salary}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-md-2">
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
        </>
      )}
    </>
  );
}

export default AppUserPage;
