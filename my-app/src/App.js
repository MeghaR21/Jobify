import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobAdvert from './components/JobAdvert.jsx';
import AdminDashboard from './components/AdminDashboard.js';
import LoginPage from './components/login.js'; // Assuming your login file is named Login.js

function App() {
  // State to store fetched job ads
  const [jobAds, setJobAds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status

  // Fetch job ads from the Laravel API when the component mounts
  useEffect(() => {
    fetchJobAds();
  }, []);

  const fetchJobAds = () => {
    axios.get(process.env.REACT_APP_API_JOB_ADS_INDEX) // Use env variable
      .then(response => {
        setJobAds(response.data); // Store fetched job ads in state
      })
      .catch(error => {
        console.error('Error fetching job ads:', error);
      });
  };

 // Handle admin login
 const handleLogin = (email, password) => {
  axios.post(process.env.REACT_APP_API_LOGIN, { email, password }) // Use env variable
    .then(response => {
      localStorage.setItem('token', response.data.token);  // Store token
      setIsAdmin(true);  // Set admin status to true
    })
    .catch(() => {
      alert('Invalid credentials');
    });
};

// Handle user registration
const registerUser = (userData) => {
  axios.post(process.env.REACT_APP_API_REGISTER, userData) // Use env variable
    .then(response => {
      console.log('User registered:', response.data);
    })
    .catch(error => {
      console.error('Error registering user:', error);
    });
};

// Fetch records for admin dashboard
const fetchAdminDashboardData = () => {
  axios.get(process.env.REACT_APP_API_ADMIN_DASHBOARD) // Use env variable
    .then(response => {
      console.log('Admin dashboard data:', response.data);
    })
    .catch(error => {
      console.error('Error fetching admin dashboard data:', error);
    });
};

  return (
    <div className="App">
      {/* Conditional rendering: Show AdminDashboard if admin is logged in, else show Job Board */}
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          {/* Job Board Header */}
          <header className="bg-orange text-white text-center py-5">
            <h1>Job Board</h1>
            <p>Find the right job for you!</p>
          </header>

          {/* Job Ads Listing */}
          <div className="container my-5">
            <div className="row">
              {/* Map through the job ads and render JobAdvert component dynamically */}
              {jobAds.map((ad) => (
                <div key={ad.id} className="col-md-4 mb-4">
                  <JobAdvert
                    title={ad.title}
                    companyName={ad.company_name}
                    place={ad.place}
                    salarys={ad.salary}
                    contractType={ad.contract_type}
                    description={ad.description}
                    fullDescription={ad.full_description}
                    creationDate={new Date(ad.creation_date).toLocaleDateString()}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-dark text-white text-center py-3">
            <p>&copy; 2024 Job Board. All rights reserved.</p>
          </footer>
        </>
      )}

      {/* Show the login page if the user is not logged in as admin */}
      {!isAdmin && <LoginPage onLogin={handleLogin} />}
    </div>
  );
}

export default App;
