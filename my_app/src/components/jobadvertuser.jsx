import React, { useState, useEffect } from 'react';
import { instance } from './myaxios';

function JobAdvertUser({ 
  title, 
  companyName, 
  place,
  contractType,
  salary, 
  description, 
  fullDescription, 
  creationDate,
  advertisementId,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    message: ''
  });
  const userId = localStorage.getItem('user_id');
  // useEffect(() => {
  //   // Pre-fill form data with user information if available
  //   if (userInfo) {
  //     setFormData({
  //       name: userInfo.name || '',
  //       email: userInfo.email || '',
  //       phone: userInfo.phone || '',
  //       message: ''
  //     });
  //   }
  // }, [userInfo]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleApplyClick = () => {
    setIsApplying(true);
  };

  const handleCloseForm = () => {
    setIsApplying(false);
    setFormData({ message: '' }); // Reset form
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

    const applicationData = {
      user_id: userId, // Add the user ID here
      message: formData.message,       // Message de l'utilisateur
      advertisement_id: advertisementId // Add the advertisement ID here
      // Si tu as besoin d'envoyer d'autres informations comme `advertisement_id`, tu peux les ajouter ici
    };

    instance.post('/applications_create_registered',applicationData)
    .then(response => 
      {alert('Application submitted successfully!');
      handleCloseForm(); // Reset and close form after submission
    })
    .catch(error => {
      console.error('Error submitting application:', error);
    });
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
            <p><strong>Date</strong> {creationDate}</p>
          </div>
        )}

        <button className="btn btn-warning me-3" onClick={handleToggle}>
          {isExpanded ? 'Show Less' : 'Learn More'}
        </button>
        <button className="btn btn-warning text-dark" onClick={handleApplyClick}>
          Apply
        </button>

        {isApplying && (
          <form onSubmit={handleFormSubmit} className="mt-3">
            <h4 className="mb-3">Apply for {title}</h4> 
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

export default JobAdvertUser;
