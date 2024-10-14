import React, { Component , useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

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

  // Handle input changes for login form
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle input changes for sign-up form
  handleSignUpChange = (e) => {
    const { signUpData } = this.state;
    this.setState({
      signUpData: {
        ...signUpData,
        [e.target.name]: e.target.value,
      }
    });
  };

  // Handle Login Form submission
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    axios.post("http://localhost:8000/api/login", { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);  // Store token
        this.props.navigate('/AdminDashboard');  // Redirect to dashboard
      })
      .catch(() => {
        this.setState({ error: 'Invalid credentials' });
      });
  };

  // Handle Sign-Up Form submission
  handleSignUpSubmit = (e) => {
    e.preventDefault();
    const { signUpData } = this.state;

    if (signUpData.password !== signUpData.confirmPassword) {
      this.setState({ error: "Passwords do not match!" });
      return;
    }

    axios.post('http://localhost:8000/api/register', signUpData)
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
      <Container className="mt-5">
        <h2>{showSignUp ? 'Sign Up' : 'Login'}</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Show Login Form */}
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

        {/* Show Sign-Up Form */}
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
      </Container>
    );
  }
}

export default LoginPage;
