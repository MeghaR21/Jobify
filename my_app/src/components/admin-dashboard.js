import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import { instance } from './myaxios'; // Axios instance for API requests

const Modify = () => {
  const [activeTable, setActiveTable] = useState('users'); // To track which table is active (users, companies, etc.)
  const [records, setRecords] = useState([]); // Data to display in the table
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [showModal, setShowModal] = useState(false); // To show or hide modal
  const [modalType, setModalType] = useState(''); // Create or Update modal
  const [formData, setFormData] = useState({}); // Form data for Create/Update

  const recordsPerPage = 5; // Number of records per page

  // Fetch records based on the active table
  useEffect(() => {
    fetchRecords();
  }, [activeTable, currentPage]);

  // Function to fetch records for the active table
  const fetchRecords = () => {
    const url = `${activeTable}_list`; // dynamic URL based on activeTable
    instance.get(`/${url}?page=${currentPage}&limit=${recordsPerPage}`)
      .then(response => {
        setRecords(response.data.records);
        setTotalPages(Math.ceil(response.data.total / recordsPerPage));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  // Handle Create/Update/Delete
  const handleCreateUpdate = () => {
    const url = modalType === 'create' ? `/${activeTable}_create` : `/${activeTable}_update/${formData.id}`;
    const method = modalType === 'create' ? 'post' : 'put';
    instance[method](url, formData)
      .then(() => {
        setShowModal(false);
        fetchRecords(); // Refresh data after create/update
      })
      .catch(error => console.error('Error during create/update:', error));
  };

  const handleDelete = (id) => {
    instance.delete(`/${activeTable}_delete/${id}`)
      .then(() => fetchRecords()) // Refresh data after delete
      .catch(error => console.error('Error deleting record:', error));
  };

  // Function to change the active table
  const handleChangeTable = (tableName) => {
    setActiveTable(tableName);
    setCurrentPage(1); // Reset to first page when changing tables
  };

  // Pagination handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Render table rows
  const renderTableRows = () => {
    return records.map((record, index) => (
      <tr key={index}>
        {Object.keys(record).map((key, idx) => (
          <td key={idx}>{record[key]}</td>
        ))}
        <td>
          <Button variant="warning" onClick={() => handleEdit(record)}>Update</Button>{' '}
          <Button variant="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
        </td>
      </tr>
    ));
  };

  // Handle Edit (fill formData and open modal)
  const handleEdit = (record) => {
    setFormData(record);
    setModalType('update');
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      
      {/* Table selector */}
      <div className="btn-group mb-4">
        <Button onClick={() => handleChangeTable('users')}>Users</Button>
        <Button onClick={() => handleChangeTable('companies')}>Companies</Button>
        <Button onClick={() => handleChangeTable('advertisements')}>Advertisements</Button>
        <Button onClick={() => handleChangeTable('applications')}>Applications</Button>
      </div>

      {/* Data Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            {records.length > 0 && Object.keys(records[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        {[...Array(totalPages).keys()].map(num => (
          <Pagination.Item key={num + 1} active={num + 1 === currentPage} onClick={() => handlePageChange(num + 1)}>
            {num + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>

      {/* Create Button */}
      <Button variant="warning" onClick={() => { setModalType('create'); setShowModal(true); }}>
        Create New {activeTable.charAt(0).toUpperCase() + activeTable.slice(1)}
      </Button>

      {/* Modal for Create/Update */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'create' ? 'Create' : 'Update'} {activeTable.charAt(0).toUpperCase() + activeTable.slice(1)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(records[0] || {}).map((key, index) => (
              <Form.Group key={index}>
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData[key] || ''}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleCreateUpdate}>
            {modalType === 'create' ? 'Create' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modify;

