import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Optional for Modal

const Wizard = ({ show, handleClose, handleSubmit, initialData, fields }) => {
  const [formData, setFormData] = useState(initialData || {});

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
