import React, { useState, useEffect } from 'react';
import { instance } from './myaxios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Profile({ language }) {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('user_id')); // Add userId state
  const navigate = useNavigate(); //after logout

  useEffect(() => {
    if (userId) {
      instance
        .get(`/users_show/${userId}`)  // Adjust API route to get user by ID
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

   
    
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      password: password || undefined, // Include password only if it's being changed
    };

    instance
    .put(`/users_update/${userId}`, payload)
    .then(response => 
      {alert('Application submitted successfully!');
    })
    .catch((error) => console.error('Error updating account:', error));
    
  };
  
  //Delete account for user registered

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      instance
        .delete(`/users_delete/${userId}`)
        .then(() => {
          localStorage.removeItem('user_id'); // Remove user_id from local storage
          localStorage.removeItem('token');   // Remove token from local storage
          alert('Account deleted successfully');
          navigate('/'); // Redirect to home page
        })
        .catch((error) => console.error('Error deleting account:', error));
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
        <h4> Modify Account</h4>
        {error && <Alert variant="danger">{error}</Alert>}
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

          <Button type="submit" className="btn btn-warning me-3">
            Update
          </Button>
          <Button type="button" className="btn btn-warning me-3" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Profile;