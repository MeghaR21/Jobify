import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const RecordTable = ({ onDelete, onEdit, page, totalPages, setPage }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true); // Set loading state
        const response = await axios.get(process.env.REACT_APP_API_RECORDS_INDEX, {
          params: { page }, // Send the current page as a parameter
        });
        setRecords(response.data.records); // Assuming the response has a records property
        setTotalPages(response.data.totalPages); // Assuming the response has a totalPages property
      } catch (error) {
        setError('Error fetching records');
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchRecords(); // Fetch records on component mount and when page changes
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p className="text-danger">{error}</p>; // Show error if any

  return (
    <div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>
                <Button variant="warning" onClick={() => onEdit(record)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => onDelete(record.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button disabled={page === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button disabled={page === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default RecordTable;