import React, { useState } from 'react';
import { instance } from './myaxios';

function JobAdvert({ 
  title, 
  companyName, 
  place,
  contractType,
  salary, // Fixed typo here
  description, 
  fullDescription, 
  creationDate,
  advertisementId // Receiving the advertisement ID here
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleApplyClick = () => {
    setIsApplying(true);
  };

  const handleCloseForm = () => {
    setIsApplying(false);
    setFormData({  firstName: '', lastName: '', email: '', phone: '', message: '' }); // Reset form
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

      // Créer l'objet de données à envoyer
    const applicationData = {
      first_name: formData.firstName, // Prénom de l'utilisateur
      last_name: formData.lastName,   // Nom de famille
      email: formData.email,           // Email
      phone: formData.phone,           // Numéro de téléphone
      message: formData.message,       // Message de l'utilisateur
      advertisement_id: advertisementId // Add the advertisement ID here
      // Si tu as besoin d'envoyer d'autres informations comme `advertisement_id`, tu peux les ajouter ici
    };

    
    instance.post('/applications_create_unregistered',applicationData)
      .then(response => {
        alert('Application submitted successfully!');
        handleCloseForm(); // Reset and close form after submission
      })
      .catch(error => {
        if (error.response) {
          // Server responded with a status code other than 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          // Request was made but no response received
          console.error('No response received:', error.request);
        } else {
          // Other error during setup
          console.error('Error setting up request:', error.message);
        }
      })
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p><strong>Description:</strong> {description}</p>

        {isExpanded && (
          <div className="full-description">
            <p>{fullDescription}</p>
            <p><strong></strong> {companyName}</p>
            <p><strong></strong> {place}</p>
            <p><strong></strong> {contractType}</p>
            <p><strong></strong> {salary}</p>
            <p><strong>Date:</strong> {creationDate}</p>
          </div>
        )}

        <button className="btn btn-learn-more btn-pastel-orange me-3" onClick={handleToggle}>
          {isExpanded ? 'Show Less' : 'Learn More'}
        </button>
        <button className="btn btn-warning text-dark" onClick={handleApplyClick}>
          Apply
        </button>

        {isApplying && (
          <form onSubmit={handleFormSubmit} className="mt-3">
            <h4 className="mb-3">Apply for {title}</h4>
            <div className="mb-3">
              <label className="form-label">First name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit" className="btn btn-warning text-dark me-2">
              Submit
            </button>
            <button type="button" className="btn btn-warning text-dark ms-2" onClick={handleCloseForm}>
              Close
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default JobAdvert;