import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Pagination } from 'react-bootstrap';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({ name: '', email: '' });

  const recordsPerPage = 5; // Pagination - records per page

  // Fetch records with pagination
  const fetchRecords = async (page) => {
    try {
      const response = await axios.get(`/api/records?page=${page}&limit=${recordsPerPage}`);
      setRecords(response.data.records);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // Call fetchRecords when component loads or page changes
  useEffect(() => {
    fetchRecords(currentPage);
  }, [currentPage]);

  // Handle page change for pagination
  const handlePageChange = (page) => setCurrentPage(page);

  // Handle record creation
  const handleCreateRecord = async () => {
    try {
      await axios.post('/api/records', newRecord);
      fetchRecords(currentPage); // Refresh records after adding
      setNewRecord({ name: '', email: '' });
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  // Handle record update
  const handleUpdateRecord = async (id) => {
    try {
      await axios.put(`/api/records/${id}`, editingRecord);
      fetchRecords(currentPage); // Refresh records after update
      setEditingRecord(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Handle record deletion
  const handleDeleteRecord = async (id) => {
    try {
      await axios.delete(`/api/records/${id}`);
      fetchRecords(currentPage); // Refresh records after delete
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Create New Record */}
      <Form className="my-4">
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={newRecord.name}
            onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={newRecord.email}
            onChange={(e) => setNewRecord({ ...newRecord, email: e.target.value })}
          />
        </Form.Group>
        <Button className="mt-3" onClick={handleCreateRecord}>Create Record</Button>
      </Form>

      {/* List Records with Pagination */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>
                <Button variant="warning" onClick={() => { setEditingRecord(record); setShowModal(true); }}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteRecord(record.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <Pagination>
        {[...Array(totalPages).keys()].map(page => (
          <Pagination.Item key={page} active={page + 1 === currentPage} onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Edit Record Modal */}
      {editingRecord && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEditName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editingRecord.name}
                  onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formEditEmail" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editingRecord.email}
                  onChange={(e) => setEditingRecord({ ...editingRecord, email: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="primary" onClick={() => handleUpdateRecord(editingRecord.id)}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
