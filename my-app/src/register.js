import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${process.env.REACT_APP_API_USER}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone); // Fetch phone if it exists
        setMessage(response.data.message);
        setIsEditing(true);
      })
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email, password, phone, message };

    if (isEditing) {
      // Update user information
      axios.put(`${process.env.REACT_APP_API_USER_UPDATE}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(() => alert('Account updated successfully'))
      .catch(error => console.error('Error updating account:', error));
    } else {
      // Register new user
      axios.post(`${process.env.REACT_APP_API_REGISTER}`, { ...payload, password_confirmation: passwordConfirm })
      .then(() => alert('Account created successfully'))
      .catch(error => console.error('Error creating account:', error));
    }
  };
  return (
    <div className="container">
      <h2>{isEditing ? 'Modify Account' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" className="form-control" value={first} onChange={(e) => setfirst(e.target.value)} />
        </div>
        <div>
         <label>First Name</label>
         <input type="text" className="form-control" value={last} onChange={(e) => setlast(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {!isEditing && (
          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" className="form-control" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          </div>
        )}
        <div>
            <label>Message (to apply to compagny)</label>
            <input type="message" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Register'}</button>
      </form>
    </div>
  );
}

export default Register;
