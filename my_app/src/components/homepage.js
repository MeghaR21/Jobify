import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobAdvert from './jobadvert';
import { instance } from './myaxios';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function HomePage({ darkMode }) {
  const [jobAds, setJobAds] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    localization: '',
    salary: '',
    date: '',
  });

  const [error, setError] = useState(''); // State for handling error messages
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State to control alert visibility

  // Fetch job ads from the Laravel API when the component mounts
  useEffect(() => {
    fetchJobAds();
  }, []);

  const fetchJobAds = () => {
    instance.get("/advertisements_list") // Use env variable
      .then(response => {
        setJobAds(response.data);
        setShowAlert(false); 
      })
      .catch(error => {
        console.error('Error fetching job ads:', error);
        setError('Error fetching job ads. Please try again later.');
        setShowAlert(true);
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
      {/* Combined layout with login button, search bar, and filters */}
      <div className="container-fluid">
        <div className="row justify-content-between align-items-start">
          <div className="col-md-2 login-container mb-3">
            <Link to="/login" className="login-link">
              <button className="btn-spotify-style" onClick={() => console.log('Button clicked!')}>
                Login / Sign Up
              </button>
            </Link>
          </div>

          <div className="col-md-10">
            <div className="row mt-3 search-filter-container justify-content-start">
              <div className="col-md-2">
                <input
                  type="text"
                  placeholder="Search in job description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="form-control spotify-input"
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

        {/* Error Alert */}
        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            {error}
          </Alert>
        )}

        {/* Job Ads Listing */}
        <div className="container my-5">
          <div className="row">
            {/* Map through the filtered and searched job ads and render JobAdvert components */}
            {filteredJobAds.length > 0 ? (
              filteredJobAds.map((ad) => (
                <div key={ad.id} className="playlist-container">
                  <JobAdvert
                    title={ad.job_title}
                    companyName={ad.company.name}
                    place={ad.location}
                    salary={ad.salary}
                    contractType={ad.contract_type}
                    description={ad.description}
                    fullDescription={ad.full_description}
                    creationDate={new Date(ad.created_at).toLocaleDateString()}
                    advertisementId={ad.id} // Pass the advertisement ID here
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
  );
}

export default HomePage;