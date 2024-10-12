import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const RecordForm = ({ onSubmit, selectedRecord }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedRecord) {
      setName(selectedRecord.name);
    }
  }, [selectedRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the record data
    const recordData = {
      name,
      id: selectedRecord ? selectedRecord.id : undefined,
    };

    // Call the appropriate API function to create or update the record
    if (selectedRecord) {
      updateRecord(recordData); // Update existing record
    } else {
      createRecord(recordData); // Create new record
    }

    // Clear the form field after submission
    setName('');
  };

  // Function to create a new record
  const createRecord = (recordData) => {
    axios.post(process.env.REACT_APP_API_RECORDS_CREATE, recordData)
      .then(response => {
        console.log('Record created:', response.data);
        if (onSubmit) onSubmit(response.data); // Call onSubmit callback if provided
      })
      .catch(error => {
        console.error('Error creating record:', error);
      });
  };

  // Function to update an existing record
  const updateRecord = (recordData) => {
    axios.put(`${process.env.REACT_APP_API_RECORDS_UPDATE}/${recordData.id}`, recordData)
      .then(response => {
        console.log('Record updated:', response.data);
        if (onSubmit) onSubmit(response.data); // Call onSubmit callback if provided
      })
      .catch(error => {
        console.error('Error updating record:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter record name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {selectedRecord ? 'Update' : 'Create'} Record
      </Button>
    </Form>
  );
};

export default RecordForm;
