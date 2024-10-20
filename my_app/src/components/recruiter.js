import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Offcanvas, Form, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { instance } from './myaxios';

const JobAdForm = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [advertisements, setAdvertisements] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedAdApplications, setSelectedAdApplications] = useState({});
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' }); // State for alert messages
  const [adForm, setAdForm] = useState({
    job_title: '',
    location: '',
    salary: '',
    contract_type: '',
    full_description: '',
  });

  // Check if the user is authenticated and is a recruiter
  const checkAuth = async () => {
    try {
      const response = await instance.get('/user');
      setIsAuthenticated(true);
      setIsRecruiter(response.data.role === 'recruiter');
    } catch (error) {
      setIsAuthenticated(false);
      setIsRecruiter(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/'); // Redirect to login page
  };

  // Fetch companies to display in table button format
  const fetchCompanies = async () => {
    try {
      const response = await instance.get('/companies_list');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // Fetch advertisements based on selected company
  const fetchAdvertisements = async (companyId) => {
    try {
      const response = await instance.get(`/advertisements_list?company_id=${companyId}`);
      setAdvertisements(response.data || []); // Expecting an array of ads
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    }
  };

  // Handle form submission for creating or updating an advertisement
  const submitAdvertisement = async () => {
    try {
      if (selectedAd) {
        await instance.put(`/advertisements_update/${selectedAd.id}`, adForm);
        setAlert({ show: true, message: 'Advertisement updated successfully!', variant: 'success' });
      } else {
        await instance.post('/advertisements_create', { ...adForm, company_id: selectedCompany });
        setAlert({ show: true, message: 'Advertisement created successfully!', variant: 'success' });
      }
      fetchAdvertisements(selectedCompany); // Refresh advertisements after submission
      handleCloseOffcanvas();
      resetForm();
    } catch (error) {
      setAlert({ show: true, message: 'Error submitting advertisement. Please try again.', variant: 'danger' });
      console.error('Error submitting advertisement:', error);
    }
  };

  // Delete an advertisement
  const deleteAd = async (adId) => {
    try {
      await instance.delete(`/advertisements_delete/${adId}`);
      fetchAdvertisements(selectedCompany);
      setAlert({ show: true, message: 'Advertisement deleted successfully!', variant: 'warning' });
    } catch (error) {
      setAlert({ show: true, message: 'Error deleting advertisement. Please try again.', variant: 'danger' });
      console.error('Error deleting advertisement:', error);
    }
  };

  // Select an advertisement for updating
  const selectAd = (ad) => {
    setSelectedAd(ad);
    setAdForm({ ...ad });
    setShowOffcanvas(true); // Open Offcanvas for editing
  };

  // Reset the advertisement form
  const resetForm = () => {
    setSelectedAd(null);
    setAdForm({
      job_title: '',
      location: '',
      salary: '',
      contract_type: '',
      full_description: '',
    });
  };

  // Fetch and expand applications for an advertisement
  const expandApplications = async (adId) => {
    if (!selectedAdApplications[adId]) {
      try {
        const response = await instance.get(`/applications_list?ad_id=${adId}`);
        setSelectedAdApplications((prev) => ({ ...prev, [adId]: response.data }));
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    } else {
      setSelectedAdApplications((prev) => ({ ...prev, [adId]: null }));
    }
  };

  // Handle Offcanvas open and close
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
    resetForm();
  };

  // Effect to check authentication and fetch companies on mount
  useEffect(() => {
    checkAuth();
    fetchCompanies();
  }, []);

  return (
    <Container fluid className="dashboard">
      {isAuthenticated && isRecruiter ? (
        <>
          {alert.show && (
            <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
              {alert.message}
            </Alert>
          )}
          <Button variant="warning" className="mt-3" onClick={handleLogout}>
            Logout
          </Button>
          <h1 className="mt-4">Job Advertisements Dashboard</h1>

          {/* Table-like buttons for company selection */}
          <div className="table-buttons" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
            {companies.map((company) => (
              <Button
                key={company.id}
                variant={selectedCompany === company.id ? 'success' : 'outline-primary'}
                onClick={() => {
                  setSelectedCompany(company.id);
                  fetchAdvertisements(company.id);
                }}
              >
                {company.name}
              </Button>
            ))}
          </div>

          {/* Only show create button and advertisements if a company is selected */}
          {selectedCompany && (
            <>
              {/* Create Advertisement Button */}
              <Button variant="primary" className="my-3" onClick={handleShowOffcanvas}>
                Create New Advertisement
              </Button>

              {/* Offcanvas for Advertisement Form */}
              <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>{selectedAd ? 'Update Advertisement' : 'Create New Advertisement'}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitAdvertisement();
                    }}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Title"
                        value={adForm.job_title}
                        onChange={(e) => setAdForm({ ...adForm, job_title: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Location"
                        value={adForm.location}
                        onChange={(e) => setAdForm({ ...adForm, location: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Salary</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Salary"
                        value={adForm.salary}
                        onChange={(e) => setAdForm({ ...adForm, salary: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Contract Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Contract Type"
                        value={adForm.contract_type}
                        onChange={(e) => setAdForm({ ...adForm, contract_type: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Full Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter Full Description"
                        value={adForm.full_description}
                        onChange={(e) => setAdForm({ ...adForm, full_description: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Button variant="success" type="submit">
                      {selectedAd ? 'Update' : 'Create'} Advertisement
                    </Button>
                  </Form>
                </Offcanvas.Body>
              </Offcanvas>

              {/* List of Advertisements */}
              <Row>
                {advertisements.length > 0 ? (
                  advertisements.map((ad) => (
                    <Col md={4} key={ad.id} className="mb-4">
                      <Card>
                        <Card.Body>
                          <Card.Title>{ad.job_title}</Card.Title>
                          <Card.Text>
                            {ad.location} - {ad.salary} - {ad.contract_type}
                          </Card.Text>
                          <Button variant="primary" onClick={() => selectAd(ad)}>
                            Edit
                          </Button>{' '}
                          <Button variant="danger" onClick={() => deleteAd(ad.id)}>
                            Delete
                          </Button>{' '}
                          <Button variant="info" onClick={() => expandApplications(ad.id)}>
                            View Applications
                          </Button>
                        </Card.Body>
                      </Card>

                      {/* Expand Applications Section */}
                      {selectedAdApplications[ad.id] && (
                        <div className="applications">
                          <h5>Applications for {ad.job_title}</h5>
                          {selectedAdApplications[ad.id].length > 0 ? (
                            selectedAdApplications[ad.id].map((application) => (
                              <div key={application.id}>
                                <p>Name: {application.candidate_name}</p>
                                <p>Resume: <a href={application.resume_url}>Download</a></p>
                                <hr />
                              </div>
                            ))
                          ) : (
                            <p>No applications found for this job.</p>
                          )}
                        </div>
                      )}
                    </Col>
                  ))
                ) : (
                  <p>No advertisements found for the selected company.</p>
                )}
              </Row>
            </>
          )}
        </>
      ) : (
        <p>Please log in as a recruiter to access this page.</p>
      )}
    </Container>
  );
};

export default JobAdForm;
