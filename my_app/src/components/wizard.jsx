import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const Wizard = ({ show, handleClose, handleSubmit, initialData, fields, fetchDataById }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    if (initialData?.id) {
      fetchDataById(initialData.id).then((data) => {
        setFormData(data);
      }).catch((error) => {
        console.error("Error fetching data:", error);
        setAlert({ show: true, message: 'Error fetching data.', variant: 'danger' });
      });
    } else {
      setFormData(initialData || {}); // Reset form data if no initial data
    }
  }, [initialData, fetchDataById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      handleSubmit(formData); // Call the parent function to handle form submission
      setAlert({ show: true, message: 'Form submitted successfully!', variant: 'success' });
    } catch (error) {
      console.error('Submission error:', error);
      setAlert({ show: true, message: 'Error submitting the form.', variant: 'danger' });
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Update Record' : 'Create New Record'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default Wizard;

