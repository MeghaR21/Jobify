import React, { useState, useEffect } from 'react';
import RecordTable from './RecordTable';
import RecordForm from './RecordForm';
import axios from 'axios';

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch records from the database
  useEffect(() => {
    fetchRecords(page);
  }, [page]);

  // Fetch records from API
  const fetchRecords = (page) => {
    axios
      .get(`${process.env.REACT_APP_API_RECORDS_INDEX}?page=${page}`)
      .then((res) => {
        setRecords(res.data.records);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error('Error fetching records:', err));
  };

  // Handle delete record
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_RECORDS_DELETE}/${id}`)
      .then(() => {
        fetchRecords(page);
      })
      .catch((err) => console.error('Error deleting record:', err));
  };

  // Handle form submission for creating/updating a record
  const handleFormSubmit = (record) => {
    if (selectedRecord) {
      // Update record
      axios
        .put(`${process.env.REACT_APP_API_RECORDS_UPDATE}/${record.id}`, record)
        .then(() => {
          setSelectedRecord(null);
          fetchRecords(page);
        })
        .catch((err) => console.error('Error updating record:', err));
    } else {
      // Create new record
      axios
        .post(process.env.REACT_APP_API_RECORDS_CREATE, record)
        .then(() => {
          fetchRecords(page);
        })
        .catch((err) => console.error('Error creating record:', err));
    }
  };


  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <RecordForm onSubmit={handleFormSubmit} selectedRecord={selectedRecord} />
      <RecordTable
        records={records}
        onDelete={handleDelete}
        onEdit={handleEdit}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default AdminDashboard;
