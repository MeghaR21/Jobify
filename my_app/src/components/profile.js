import React, { useState, useEffect } from 'react';
import { instance } from './myaxios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Profile({ language }) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(''); // Add userId state
  const navigate = useNavigate(); //after logout

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      instance
        .get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data;
          setFirst(userData.firstName);
          setLast(userData.lastName);
          setEmail(userData.email);
          setPhone(userData.phone); 
          setMessage(userData.message);
          setUserId(userData.id); // Save the userId for future use
          setIsEditing(true);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && userId) {
      // Update user information
      const payload = {
        first_name: first,
        last_name: last,
        phone: phone,
        email: email,
        password: password || undefined, // Include password only if it's being changed
        password_confirmation: passwordConfirm || undefined, // Include password confirmation if password is being changed
      };

      instance
        .put(`/users_update/${userId}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(() => alert('Account updated successfully'))
        .catch((error) => console.error('Error updating account:', error));
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    navigate('/'); // Redirect to login page
  };

  return (
    <>
      <Container>
        {/* Logout Button */}
        <Button className="mt-3 btn btn-warning" onClick={handleLogout}>
          Logout
        </Button>
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

          <Button type="submit" className="btn btn-warning">
            {isEditing ? 'Update' : 'Register'}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Profile;
