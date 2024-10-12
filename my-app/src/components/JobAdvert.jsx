import React, { useState } from 'react';

function JobAdvert({ 
  title, 
  companyName, 
  place,
  contractType,
  salarys, 
  description, 
  fullDescription, 
  creationDate 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
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

  // Close the application form
  const handleCloseForm = () => {
    setIsApplying(false);
    setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
  // Post form data to backend
  fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        jobTitle: title,
        companyName: companyName,
      }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Application submitted successfully!');
      setIsApplying(false);  // Close form after submission
      setFormData({ name: '', email: '', phone: '', message: '' });  // Reset form
    })
    .catch(error => {
      console.error('Error submitting application:', error);
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p><strong></strong> {companyName}</p>
        <p><strong></strong> {place}</p>
        <p><strong></strong> {contractType}</p>
        <p><strong></strong> {salarys}</p>
        <p><strong>Description:</strong> {description}</p>

        {/* Learn More section */}
        {isExpanded && (
          <div className="full-description">
            <p><strong></strong> {fullDescription}</p>
            <p><strong></strong> {creationDate}</p>
          </div>
        )}

        {/* Buttons for Learn More and Apply */}
        <button className="btn btn-learn-more btn-pastel-orange me-3" onClick={handleToggle}>
          {isExpanded ? 'Show Less' : 'Learn More'}
        </button>
        <button className="btn btn-warning text-dark" onClick={handleApplyClick}>
          Apply
        </button>

        {/* Application Form (Appears after clicking Apply) */}
        {isApplying && (
          <form onSubmit={handleFormSubmit} className="mt-3">
            <h4 className="mb-3">Apply for {title}</h4>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
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
                required
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