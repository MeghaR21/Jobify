import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import JobAdvert from './components/JobAdvert';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage'; 

function App() {
  const [jobAds, setJobAds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status

  // Fetch job ads from the Laravel API when the component mounts
   useEffect(() => {
    fetchJobAds();
   }, []);

  const fetchJobAds = () => {
    axios.get("http://localhost:8000/api/advertisements_list") // Use env variable
      .then(response => {
        setJobAds(response.data); // Store fetched job ads in state
      })
      .catch(error => {
        console.error('Error fetching job ads:', error);
      });
  };

  // Handle admin login
  const handleLogin = (email, password) => {
    axios.post('http://localhost:8000/api/login', { email, password }) // Use env variable
      .then(response => {
        localStorage.setItem('token', response.data.token);  // Store token
        setIsAdmin(true);  // Set admin status to true
      })
      .catch(() => {
        alert('Invalid credentials');
      });
  };

  // Fetch records for admin dashboard
  const fetchAdminDashboardData = () => {
    axios.get('API ADMIN') // Use env variable
      .then(response => {
        console.log('Admin dashboard data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching admin dashboard data:', error);
      });
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Dashboard Route */}
          <Route
            path="/AdminDashboard"
            element={isAdmin ? <AdminDashboard fetchAdminData={fetchAdminDashboardData} /> : <Navigate to="/" />}
          />

          {/* Job Board Route */}
          <Route
            path="/"
            element={
              <>
                {/* Job Board Header */}
                <header className="bg-orange text-white text-center py-5">
                  <h1>Jobify</h1>
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
                          salary={ad.salary}
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
            }
          />

          {/* Login Route (Fallback) */}
          <Route
            path="*"
            element={!isAdmin ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/Admindashboard" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
