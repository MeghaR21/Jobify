import React, { useState, useEffect } from 'react';
import { instance } from './myaxios';
import { Form, Button, Container, Alert, Table, Pagination } from 'react-bootstrap';

function Modify() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const recordsPerPage = 10; // Number of records per page

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = (page) => {
    instance
      .get(`/users_list?page=${page}&limit=${recordsPerPage}`)
      .then((response) => {
        setUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.total / recordsPerPage));
      })
      .catch((error) => console.error('Error fetching users:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { first, last, email, password, phone, message };

    if (isEditing) {
      // Update user information
      instance
        .put(`/users_update/{id}/${selectedUserId}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(() => {
          alert('Account updated successfully');
          fetchUsers(currentPage); // Refresh the user list after update
          clearForm();
        })
        .catch((error) => console.error('Error updating account:', error));
    } else {
      // Register new user
      instance
        .post('/register', { ...payload, password_confirmation: passwordConfirm })
        .then(() => {
          alert('Account created successfully');
          fetchUsers(currentPage); // Refresh the user list after adding a new user
          clearForm();
        })
        .catch((error) => console.error('Error creating account:', error));
    }
  };

  const handleEdit = (user) => {
    setFirst(user.firstName);
    setLast(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setMessage(user.message);
    setIsEditing(true);
    setSelectedUserId(user.id); // Set the selected user ID for update
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      instance
        .delete(`/users_delete/{id}/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(() => {
          alert('User deleted successfully');
          fetchUsers(currentPage); // Refresh the user list after deletion
        })
        .catch((error) => console.error('Error deleting user:', error));
    }
  };

  const clearForm = () => {
    setFirst('');
    setLast('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setPhone('');
    setMessage('');
    setIsEditing(false);
    setSelectedUserId(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container>
        <h2 className="mt-4">Profile Management</h2>
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
            {isEditing ? 'Update' : 'Register'}
          </Button>
          {isEditing && (
            <Button variant="secondary" className="ms-3" onClick={clearForm}>
              Cancel
            </Button>
          )}
        </Form>

        {/* List of Users with Edit/Delete */}
        <h4 className="mt-5">User List</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(user)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </>
  );
}

export default Modify;
