import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false); // State for showing the Sign-Up form
  const [signUpData, setSignUpData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  // Handle Login Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_LOGIN, { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);  // Store token
        navigate('/dashboard');  // Redirect to dashboard
      })
      .catch(() => {
        setError('Invalid credentials');
      });
  };

  // Handle Sign-Up Form submission
  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    axios.post(process.env.REACT_APP_API_REGISTER, signUpData)
      .then(response => {
        alert('Registration successful! Please log in.');
        setShowSignUp(false); // Hide Sign-Up form after successful registration
      })
      .catch(error => {
        setError('Error during registration: ' + error.message);
      });
  };

  // Handle Sign-Up input changes
  const handleSignUpChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className="mt-5">
      <h2>{showSignUp ? 'Sign Up' : 'Admin Login'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Show Login Form */}
      {!showSignUp && (
        <>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Login
            </Button>
          </Form>

          <div className="mt-3">
            <p>Don't have an account?{' '}
              <Button variant="link" onClick={() => setShowSignUp(true)}>
                Sign Up!
              </Button>
            </p>
          </div>
        </>
      )}

      {/* Show Sign-Up Form */}
      {showSignUp && (
        <>
          <Form onSubmit={handleSignUpSubmit}>
            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={signUpData.lastName}
                onChange={handleSignUpChange}
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
                onChange={handleSignUpChange}
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
                onChange={handleSignUpChange}
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
                onChange={handleSignUpChange}
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
                onChange={handleSignUpChange}
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
                onChange={handleSignUpChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Validate
            </Button>
          </Form>

          <div className="mt-3">
            <p>Already have an account?{' '}
              <Button variant="link" onClick={() => setShowSignUp(false)}>
                Login here!
              </Button>
            </p>
          </div>
        </>
      )}
    </Container>
  );
};

export default LoginPage;
