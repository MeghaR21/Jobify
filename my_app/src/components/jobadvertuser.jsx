import React, { useState, useEffect } from 'react';
import { Alert, Card, Button } from 'react-bootstrap';
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
  const [successMessage, setSuccessMessage] = useState('');  // Success message state
  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState({ show: false, variant: '', message: '' });

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
    };

    instance.post('/applications_create_registered', applicationData)
    .then(response => {
      setSuccessMessage('Application submitted successfully!');  // Show success message
      setErrorMessage(''); 
      handleCloseForm(); // Reset and close form after submission
    })
    .catch(error => {
      console.error('Error submitting application:', error);
      setErrorMessage('Failed to submit the application. Please try again later.');
      setSuccessMessage('');
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
        {/* Display success or error messages */}
        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
            {errorMessage}
          </Alert>
        )}

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

export default JobAdvertUser;
