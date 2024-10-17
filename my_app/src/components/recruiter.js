import React, { useState, useEffect } from 'react'; // Added useEffect
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom'; // Added useParams and useNavigate
import { instance } from './myaxios';
import LoginPage from './login';
import AdminDashboard from './admin-dashboard';

const JobAdForm = ({ mode = 'create' }) => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    salary: '',
    location: '',
    contractType: '',
  });

  const { id } = useParams(); // Get the ad ID from the URL (useParams)
  const navigate = useNavigate(); // For programmatic navigation

  // If the form is in 'update' mode, fetch the advertisement's details
  useEffect(() => {
    if (mode === 'update' && id) {
      instance.get(`/advertisements/${id}`)
        .then(response => {
          setFormData(response.data); // Prepopulate the form with the ad data
        })
        .catch(error => {
          console.error('Error fetching the advertisement data!', error);
        });
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Determine if we are creating or updating
    if (mode === 'create') {
      instance.post('/advertisements_create', formData)
        .then(response => {
          alert('Job ad created successfully!');
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
          console.error('Error creating the job ad!', error);
        });
    } else if (mode === 'update') {
      instance.put(`/advertisements_update/${id}`, formData)
        .then(response => {
          alert('Job ad updated successfully!');
          navigate('/admin-dashboard'); // Redirect to the dashboard after successful update
        })
        .catch(error => {
          console.error('Error updating the job ad!', error);
        });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      instance.delete(`/advertisements_delete/${id}`)
        .then(response => {
          alert('Job ad deleted successfully!');
          navigate('/admin-dashboard'); // Redirect to the dashboard after successful deletion
        })
        .catch(error => {
          console.error('Error deleting the job ad!', error);
        });
    }
  };

  return (
    <div className="container my-5">
        {/* Logout Button */}
        <Button className="mt-3 btn btn-danger" onClick={handleLogout}>
          Logout
        </Button>
      <h2>{mode === 'create' ? 'Create a New Job Ad' : 'Update Job Ad'}</h2>
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
          <label htmlFor="description" className="form-label">Description</label>
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

        <button type="submit" className="btn btn-primary">
          {mode === 'create' ? 'Create Job Ad' : 'Update Job Ad'}
        </button>

        {mode === 'update' && (
          <button
            type="button"
            className="btn btn-danger ms-3"
            onClick={handleDelete}
          >
            Delete Job Ad
          </button>
        )}
      </form>
    </div>
  );
};

export default JobAdForm;