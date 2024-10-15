import React, { useState, useEffect } from 'react';
import { instance } from './MyAxios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Profile() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      instance
        .get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setFirst(response.data.firstName);
          setLast(response.data.lastName);
          setEmail(response.data.email);
          setPhone(response.data.phone); // Fetch phone if it exists
          setMessage(response.data.message);
          setIsEditing(true);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { first, last, email, password, phone, message };

    if (isEditing) {
      // Update user information
      instance
        .put('/users_update/{id}', payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(() => alert('Account updated successfully'))
        .catch((error) => console.error('Error updating account:', error));
    }
  };

  return (
    <>
      <Container>
        <h2 className="mt-4">Profile</h2>
        <h4>{isEditing ? 'Modify Account' : 'Register'}</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={last}
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
              required={!isEditing}
            />
          </Form.Group>

          {!isEditing && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message (to apply to company)</Form.Label>
            <Form.Control
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="btn btn-primary">
            {isEditing ? 'Update' : '/users_update/{id}'}
          </Button>
        </Form>
          {/* Log Out Button */}
          <button className="btn btn-danger" onClick={handleLogout}>
              {language === 'EN' ? 'Log Out' : 'Déconnexion'}
          </button>
      </Container>
    </>
  );
}

export default Profile;
