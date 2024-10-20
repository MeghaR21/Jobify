import React, { useState, useEffect } from 'react';
import { instance } from './myaxios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Profile({ language }) {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [userId, setUserId] = useState(localStorage.getItem('user_id')); // Add userId state
  const navigate = useNavigate(); //after logout

  useEffect(() => {
    if (userId) {
      instance
        .get(`/users_show/${userId}`)
        .then((response) => {
          const userData = response.data;
          setFirst(userData.first_name);
          setLast(userData.last_name);
          setEmail(userData.email);
          setPhone(userData.phone);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [userId]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      password: password || undefined, // Include password only if it's being changed
    };

    instance
    .put(`/users_update/${userId}`, payload)
    .then((response) => {
      setSuccess('Profile updated successfully!');
    })
    .catch((error) => {
      setError('Error updating profile. Please try again.');
      console.error('Error updating account:', error);
    })
  };
  
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      instance
        .delete(`/users_delete/${userId}`)
        .then(() => {
          localStorage.removeItem('user_id'); // Remove user_id from local storage
          localStorage.removeItem('token');   // Remove token from local storage
          setSuccess('Account deleted successfully');
          navigate('/');
        })
        .catch((error) => {
          setError('Error deleting account. Please try again.');
          console.error('Error deleting account:', error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id')
    navigate('/');
  };

  return (
    <>
      <Container>
        <div className="col-md-2 login-container mb-3">
          <Link to="/app-user" className="login-link">
            <button className="btn-spotify-style" onClick={() => console.log('Button clicked!')}>
              Home
            </button>
          </Link>
          <Link to="/" className="login-link">
            <button className="btn-spotify-style" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        </div>
        <h2 style={{ padding: "2rem 0", textAlign: "center", textTransform: "uppercase", letterSpacing: "5px" }}>Profile</h2>
        <h4 style={{ padding: "2rem 0", textAlign: "left", textTransform: "uppercase", letterSpacing: "5px" }}> Modify Account</h4>

        {/* Display Error Alert */}
        {error && <Alert variant="danger">{error}</Alert>}
        
        {/* Display Success Alert */}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleProfileUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirst(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLast(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank if not changing"

            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <div className="col-md-2 login-container mb-3">
            <Button variant="spotify" type="submit" className="mt-4" style={{backgroundColor: '#1DB954'}}>
              Login
            </Button>
            <Button variant="spotify" type="button" className="mt-4" onClick={handleDeleteAccount} style={{backgroundColor: '#1DB954'}}>
              Delete
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Profile;