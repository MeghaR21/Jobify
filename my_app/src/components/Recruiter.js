import React, { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { instance } from './MyAxios';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';


const JobAdForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    salary: '',
    location: '',
    contractType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post the form data to the API
    instance.post('/advertisements_create', formData) // Adjust the API endpoint based on your setup
      .then(response => {
        alert('Job ad created successfully!');
        // Clear the form after successful submission
        setFormData({
          title: '',
          companyName: '',
          description: '',
          salary: '',
          location: '',
          contractType: '',
        });
      })
      .catch(error => {
        console.error('There was an error creating the job ad!', error);
      });
  };

  return (
    <div className="container my-5">
      <h2>Create a New Job Ad</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Job Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contractType" className="form-label">Contract Type</label>
          <input
            type="text"
            className="form-control"
            id="contractType"
            name="contractType"
            value={formData.contractType}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Job Ad</button>
      </form>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
