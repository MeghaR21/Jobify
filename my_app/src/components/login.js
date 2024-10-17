import React, { Component } from 'react';
import { instance } from './myaxios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      showSignUp: false,
      signUpData: {
        lastName: '',
        firstName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        isRecruiter: false,
        company_id: '', // to store selected company ID
      },
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignUpChange = (e) => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === 'checkbox';
    const { signUpData } = this.state;

    // If recruiter checkbox is checked, fetch companies
    if (name === 'isRecruiter' && checked) {
      this.fetchCompanies(); // Fetch companies when checked
    }

    this.setState({
      signUpData: {
        ...signUpData,
        [name]: isCheckbox ? checked : value,
      }
    });
  };

  fetchCompanies = () => {
    if (this.state.companies.length === 0) { // Only fetch if companies haven't been fetched yet
      this.setState({ loadingCompanies: true }); // Set loading state
      instance.get('/companies_list') // Adjust this endpoint based on your backend
        .then(response => {
          this.setState({
            companies: response.data,
            loadingCompanies: false, // Set loading to false when data arrives
          });
        })
        .catch(error => {
          this.setState({ error: 'Error fetching companies: ' + error.message, loadingCompanies: false });
        });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    instance.post("/login", { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.access_token); // Store token

        // Check user role
        const userRole = response.data.user.role; // Adjust based on your API response structure

        // Redirect based on role
        if (userRole === 'admin') {
          this.props.navigate('/admin-dashboard'); // Redirect to Admin Dashboard
        } else if (userRole === 'recruiter') {
          this.props.navigate('/Recruiter'); // Redirect to Recruiter page
        } else {
          this.props.navigate('/app-user'); // Redirect to User app
        }
      })
      .catch(() => {
        this.setState({ error: 'Invalid credentials' });
      });
  };

  handleSignUpSubmit = (e) => {
    e.preventDefault();
    const { signUpData } = this.state;

    if (signUpData.password !== signUpData.confirmPassword) {
      this.setState({ error: "Passwords do not match!" });
      return;
    }

    // Include the role based on whether the user is a recruiter
    const payload = {
      first_name: signUpData.firstName,
      last_name: signUpData.lastName,
      phone: signUpData.phone,
      email: signUpData.email,
      password: signUpData.password,
      password_confirmation: signUpData.confirmPassword, 
      role: signUpData.isRecruiter ? 'recruiter' : 'candidate', // Set role accordingly
    };

    instance.post('/register', payload)
      .then(() => {
        alert('Registration successful! Please log in.');
        this.setState({ showSignUp: false }); // Hide Sign-Up form after successful registration
      })
      .catch(error => {
        this.setState({ error: 'Error during registration: ' + error.message });
      });
  };

  toggleForm = () => {
    this.setState(prevState => ({
      showSignUp: !prevState.showSignUp,
      error: '',
    }));
  };

  render() {
    const { email, password, error, showSignUp, signUpData, companies, loadingCompanies } = this.state;

    return (
      <>
        <Container className="mt-5">
          <h2>{showSignUp ? 'Sign Up' : 'Login'}</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          {!showSignUp && (
            <>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="mt-4">
                  Login
                </Button>
              </Form>

              <div className="mt-3">
                <p>Don't have an account?{' '}
                  <Button variant="link" onClick={this.toggleForm}>
                    Sign Up!
                  </Button>
                </p>
              </div>
            </>
          )}

          {showSignUp && (
            <>
              <Form onSubmit={this.handleSignUpSubmit}>
                <Form.Group controlId="formFirstName" className="mt-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={signUpData.firstName}
                    onChange={this.handleSignUpChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={signUpData.lastName}
                    onChange={this.handleSignUpChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mt-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter Phone Number"
                    name="phone"
                    value={signUpData.phone}
                    onChange={this.handleSignUpChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formSignUpEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={signUpData.email}
                    onChange={this.handleSignUpChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formSignUpPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={signUpData.password}
                    onChange={this.handleSignUpChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={this.handleSignUpChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formIsRecruiter" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Are you a recruiter?"
                    name="isRecruiter"
                    checked={signUpData.isRecruiter}
                    onChange={this.handleSignUpChange}
                  />
                </Form.Group>

                {signUpData.isRecruiter && (
                  <Form.Group controlId="formCompany" className="mt-3">
                    <Form.Label>Select Company</Form.Label>
                    <Form.Control
                      as="select"
                      name="company_id"
                      value={signUpData.company_id}
                      onChange={this.handleSignUpChange}
                      required
                    >
                      <option value="">Select a company</option>
                      {loadingCompanies ? (
                        <option disabled>Loading companies...</option>
                      ) : (
                        companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))
                      )}
                    </Form.Control>
                  </Form.Group>
                )}

                <Button variant="warning" type="submit" className="mt-4">
                  Sign Up
                </Button>
              </Form>

              <div className="mt-3">
                <p>Already have an account?{' '}
                  <Button variant="link" onClick={this.toggleForm}>
                    Login here!
                  </Button>
                </p>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}

// Wrap component with withRouter to access navigate
export default function WrappedLoginPage(props) {
  const navigate = useNavigate();
  return <LoginPage {...props} navigate={navigate} />;
}
