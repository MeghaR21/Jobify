import React, { useState } from 'react';
import { instance } from './myaxios';
import { Alert, Card, Button } from 'react-bootstrap';

function JobAdvert({ 
  title, 
  companyName, 
  place,
  contractType,
  salary, 
  description, 
  fullDescription, 
  creationDate,
  advertisementId
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
  const [alertMessage, setAlertMessage] = useState({ show: false, variant: '', message: '' });

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
      setAlertMessage({ show: true, variant: 'danger', message: 'Please enter a valid email address' });
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
    };

    
    instance.post('/applications_create_unregistered',applicationData)
      .then(response => {
        setAlertMessage({ show: true, variant: 'success', message: 'Application submitted successfully!' });
        handleCloseForm(); // Reset and close form after submission
      })
      .catch(error => {
        let errorMsg = 'An error occurred. Please try again.';
        if (error.response) {
          errorMsg = error.response.data.message || 'Server error';
        } else if (error.request) {
          errorMsg = 'No response received from the server.';
        }
        setAlertMessage({ show: true, variant: 'danger', message: errorMsg });
      });
  };

  return (
    <Card border="success" className="h-100 shadow-sm" style={{ backgroundColor: '#1E1E1E', color: 'white'  }}>
      <Card.Header style={{ color: 'lightgreen' }}>{companyName}</Card.Header>
      <Card.Body>
        <Card.Title style={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", borderBottom: '2px dotted lightgreen', marginBottom: "1rem" }}>
          {title}
        </Card.Title>
        <Card.Text>{description}</Card.Text>

        {isExpanded && (
          <div className="full-description">
            <p>{fullDescription}</p>
            <p><strong></strong> {}</p>
            <p><strong></strong> {place}</p>
            <p><strong></strong> {contractType}</p>
            <p><strong>$</strong> {salary}</p>
            <p><strong>Date:</strong> {creationDate}</p>
          </div>
        )}

        <Button 
          variant="dark" 
          style={{ fontWeight: "900", marginRight: "1rem" }} 
          onClick={handleToggle}>
          {isExpanded ? 'Show Less' : 'Learn More'}
        </Button>

        <Button 
          variant="success" 
          onClick={handleApplyClick}>
          Apply
        </Button>

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
                style={{ backgroundColor: '#333', color: 'white', border: '1px solid lightgreen' }}
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
                style={{ backgroundColor: '#333', color: 'white', border: '1px solid lightgreen' }}
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
                style={{ backgroundColor: '#333', color: 'white', border: '1px solid lightgreen' }}
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
                style={{ backgroundColor: '#333', color: 'white', border: '1px solid lightgreen' }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                style={{ backgroundColor: '#333', color: 'white', border: '1px solid lightgreen' }}
              />
            </div>
            <Button type="submit" variant="success" className="me-2">
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={handleCloseForm}>
              Close
            </Button>
          </form>
        )}

        {/* Display Alert if needed */}
        {alertMessage.show && (
          <Alert variant={alertMessage.variant} className="mt-3">
            {alertMessage.message}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default JobAdvert;