import React, { Component } from 'react';
import { instance } from './MyAxios';
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
      }
    };
  }

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

        // Check user role
        const userRole = response.data.user.role; // Adjust based on your API response structure

        // Redirect based on role
        if (userRole === 'admin') {
          this.props.navigate('/AdminDashboard'); // Redirect to Admin Dashboard
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

    instance.post('/register', signUpData)
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
    const { email, password, error, showSignUp, signUpData } = this.state;

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

                <Button variant="primary" type="submit" className="mt-4">
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

                {/* <Form.Group controlId="formSignUpMessage" className="mt-3">
                  <Form.Label>Message (to apply to company)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter text"
                    name="message"
                    value={signUpData.message}
                    onChange={this.handleSignUpChange}
                    required
                  />
                </Form.Group> */}

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

                <Button variant="primary" type="submit" className="mt-4">
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

          {/* Footer */}
          <footer className="bg-dark text-white text-center py-3">
            <p>&copy; 2024 Job Board. All rights reserved.</p>
          </footer>
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
