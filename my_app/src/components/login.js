import React, { Component, useState } from 'react';
import { instance } from './myaxios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      successMessage: '',
      showSignUp: false,
      signUpData: {
        lastName: '',
        firstName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        isRecruiter: false, // Default value for isRecruiter
        company_id: '', // Add company_id to signUpData
      },
      loadingCompanies: true, // Loading state for companies
      companies: [], // Store companies fetched from API
    };
  }

  componentDidMount() {
    this.fetchCompanies();
  }

  fetchCompanies = () => {
    // Fetch companies from API and update state
    instance.get('companies_list') // Adjust endpoint as necessary
      .then(response => {
        this.setState({ companies: response.data, loadingCompanies: false });
      })
      .catch(() => {
        this.setState({ error: 'Error fetching companies', loadingCompanies: false });
      });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignUpChange = (e) => {
    const { signUpData } = this.state;
    this.setState({
      signUpData: {
        ...signUpData,
        [e.target.name]: e.target.value,
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    instance.post("/login", { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.access_token); // Store token
        localStorage.setItem('user_id', response.data.user.id); // Store user ID
        localStorage.setItem('user_role', response.data.user.role); // Store user ID

        // Check user role
        const userRole = response.data.user.role;

        // Redirect based on role
        if (userRole === 'admin') {
          this.props.navigate('/admin-dashboard'); // Redirect to Admin Dashboard
        } else if (userRole === 'recruiter') {
          this.props.navigate('/recruiter'); // Redirect to Recruiter page
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
      this.setState({ error: "Passwords do not match!", successMessage: ''});
      return;
    }

    // Prepare data with the correct key names
    const signUpPayload = {
      first_name: signUpData.firstName,
      last_name: signUpData.lastName,
      phone: signUpData.phone,
      email: signUpData.email,
      password: signUpData.password,
      password_confirmation: signUpData.confirmPassword, // Laravel expects 'password_confirmation'
      role: signUpData.isRecruiter ? 'recruiter' : 'candidate', // Set role based on recruiter status
      company_id: signUpData.isRecruiter ? signUpData.company_id : null // Include company_id if recruiter
    };

    instance.post('/register', signUpPayload)
    .then(() => {
      this.setState({ 
        successMessage: 'Registration successful! Please log in.',
        error: '', 
        showSignUp: false, // Hide Sign-Up form
      });
    })
    .catch(error => {
      this.setState({ error: 'Error during registration: ' + error.message, successMessage: ''  });
    });
  };

  toggleForm = () => {
    this.setState(prevState => ({
      showSignUp: !prevState.showSignUp,
      error: '',
      successMessage: '',
    }));
  };

  render() {
    const { email, password, error, showSignUp, signUpData, loadingCompanies, companies } = this.state;

    return (
      <>
        <Link to="/"> 
          <button className="btn btn-pale-orange"> Home </button> 
        </Link> 
        <Container className="mt-5">
          <h2>{showSignUp ? 'Sign Up' : 'Login'}</h2>
          {/* Display error message */}
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
                  <Form.Label>Password </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password (char.8 min)"
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
                    placeholder="Confirm password (char.8 min)"
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
                  Validate
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

// Use withRouter to enable navigation
const LoginPageWithRouter = (props) => {
  const navigate = useNavigate();
  return <LoginPage {...props} navigate={navigate} />;
};

export default LoginPageWithRouter;
