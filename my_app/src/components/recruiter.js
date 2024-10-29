import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Offcanvas, Form, Card, Container, Row, Col } from 'react-bootstrap';
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

  const fetchCompanies = async () => {
    try {
      const response = await instance.get('/companies_list');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchAdvertisements = async (companyId) => {
    try {
      const response = await instance.get(`/advertisements_list?company_id=${companyId}`);
      setAdvertisements(response.data || []);
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    }
  };

  const submitAdvertisement = async () => {
    try {
      if (selectedAd) {
        await instance.put(`/advertisements_update/${selectedAd.id}`, adForm);
      } else {
        await instance.post('/advertisements_create', { ...adForm, company_id: selectedCompany });
      }
      fetchAdvertisements(selectedCompany); // Refresh advertisements after submission
      handleCloseOffcanvas();
      resetForm();
    } catch (error) {
      console.error('Error submitting advertisement:', error);
    }
  };

  const deleteAd = async (adId) => {
    try {
      await instance.delete(`/advertisements_delete/${adId}`);
      fetchAdvertisements(selectedCompany); // Refresh advertisements after deletion
    } catch (error) {
      console.error('Error deleting advertisement:', error);
    }
  };

  const selectAd = (ad) => {
    setSelectedAd(ad);
    setAdForm({ ...ad });
    setShowOffcanvas(true); // Open Offcanvas for editing
  };

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

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
    resetForm();
  };

  useEffect(() => {
    checkAuth();
    fetchCompanies();
  }, []);

  return (
    <Container fluid className="dashboard">
      {isAuthenticated && isRecruiter ? (
        <>
          <Link to="/" className="login-link">
            <button className="btn-spotify-style" onClick={handleLogout}>
              Logout
            </button>
          </Link>
          <h2 style={{ padding: "2rem 0", textAlign: "center", textTransform: "uppercase", letterSpacing: "5px" }}>Recruiter Dashboard</h2>

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

          {selectedCompany && (
            <>
              <Button variant="primary" className="my-3 btn-spotify-style" onClick={handleShowOffcanvas}>
                Create New Advertisement
              </Button>

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
                        className="spotify-input"
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
                        className="spotify-input"
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
                        className="spotify-input"
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
                        className="spotify-input"
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
                        className="spotify-input"
                        placeholder="Enter Full Description"
                        value={adForm.full_description}
                        onChange={(e) => setAdForm({ ...adForm, full_description: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Button variant="success" className="btn-spotify-style" type="submit">
                      {selectedAd ? 'Update' : 'Create'} Advertisement
                    </Button>
                  </Form>
                </Offcanvas.Body>
              </Offcanvas>

              {/* Advertisements List */}
              <Row>
                {advertisements.length > 0 ? (
                  advertisements.map((ad) => (
                    <Col md={4} key={ad.id} className="mb-4">
                      <Card border="success" className="h-100 shadow-sm" style={{ backgroundColor: '#1E1E1E', color: 'white' }}>
                        <Card.Header style={{ color: '#1DB954', fontWeight: 'bold', textTransform: 'uppercase' }}>
                          {ad.job_title}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <strong>Location:</strong> {ad.location}
                          </Card.Text>
                          <Card.Text>
                            <strong>Salary:</strong> {ad.salary}
                          </Card.Text>
                          <Card.Text>
                            <strong>Contract Type:</strong> {ad.contract_type}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button variant="secondary" className="me-2" onClick={() => selectAd(ad)}>
                            Edit
                          </Button>
                          <Button variant="danger" onClick={() => deleteAd(ad.id)}>
                            Delete
                          </Button>
                          <Button variant="outline-light" onClick={() => expandApplications(ad.id)} className="ml-2">
                            {selectedAdApplications[ad.id] ? 'Hide Applications' : 'View Applications'}
                          </Button>
                          {selectedAdApplications[ad.id] && (
                            <div className="mt-3" style={{ color: '#1DB954' }}>
                              {selectedAdApplications[ad.id].length > 0 ? (
                                <ul>
                                  {selectedAdApplications[ad.id].map((app) => (
                                    <li key={app.id}>
                                      {app.applicant_name}: {app.application_text}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>No applications yet.</p>
                              )}
                            </div>
                          )}
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>No advertisements available for this company.</p>
                )}
              </Row>
            </>
          )}
        </>
      ) : (
        <p>You need to log in as a recruiter to access this page.</p>
      )}
    </Container>
  );
};

export default JobAdForm;
