import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { instance } from './myaxios'; // Import the axios instance with token

const Wizard = ({ show, handleClose, handleSubmit, initialData, fields, resource }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data if there's an ID in the initial data
  useEffect(() => {
    if (initialData?.id && resource) {
      setLoading(true);
      fetchDataById(initialData.id, resource)
        .then((data) => {
          setFormData(data);
        })
        .catch((err) => {
          setError('Error fetching data');
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [initialData, resource]);

  // Function to fetch data by ID for different resources
  const fetchDataById = async (id, resource) => {
    try {
      const response = await instance.get(`/${resource}_show/${id}`); // API route for fetching by ID
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Call the parent function to handle form submission
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Update Record' : 'Create New Record'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Form onSubmit={onSubmit}>
            {fields.map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={formData[field] || ''}  // Set value dynamically
                  onChange={handleChange}        // Handle change for each field
                />
              </Form.Group>
            ))}
            <Button variant="warning" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Wizard;
