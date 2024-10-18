import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import { instance } from './myaxios'; 
import Wizard from './wizard.js'; 

const Modify = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);  // Track data being edited
  const [formTable, setFormTable] = useState(null);
  const [fields, setFields] = useState([]); // Which table we're editing
  const [page, setPage] = useState(1); // For pagination
  const itemsPerPage = 5;

  // Check if user is authenticated and fetch data
  useEffect(() => {
    instance.get('/user')
      .then(response => {
        setAuthenticated(true);
        fetchData(); // Fetch data only if authenticated
      })
      .catch(() => {
        setAuthenticated(false);
        setErrorMessage('Failed to authenticate. Please log in.');
      });
  }, [page]);

  // // Handle Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem('token'); // Clear the token on logout
  //   setIsAdmin(false); // Reset admin state
  //   navigate('/'); // Redirect to login page
  // };

  const fetchData = () => {
    instance.get(`/users_list?page=${page}&limit=${itemsPerPage}`)
      .then(response => setUsers(response.data))
      .catch(err => console.error(err));

    instance.get(`/advertisements_list?page=${page}&limit=${itemsPerPage}`)
      .then(response => setAdvertisements(response.data))
      .catch(err => console.error(err));

    instance.get(`/applications_list?page=${page}&limit=${itemsPerPage}`)
      .then(response => setApplications(response.data))
      .catch(err => console.error(err));

    instance.get(`/companies_list?page=${page}&limit=${itemsPerPage}`)
      .then(response => setCompanies(response.data))
      .catch(err => console.error(err));
  };

  const handleCreate = (table) => {
    setEditData(null);  // No initial data (new record)
    setFormTable(table);
    setFields(getFieldsForTable(table)); 
    setShowForm(true);  // Show the form modal
  };

  const handleUpdate = (table, id) => {
    const record = getRecordById(table, id);
    setEditData(record);  // Set data to be edited
    setFormTable(table);
    setFields(getFieldsForTable(table)); 
    setShowForm(true);  // Show the form modal
  };

  const handleDelete = (table, id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      instance.delete(`/${table}_delete/${id}`)
        .then(() => {
          alert('Record deleted');
          fetchData(); // Refresh data after deletion
        })
        .catch(err => console.error(err));
    }
  };

  const getFieldsForTable = (table) => {
    switch (table) {
      case 'users':
        return ['id', 'first_name', 'last_name', 'phone', 'email', 'role', 'company_id', 'created_at', 'updated_at'];
      case 'advertisements':
        return ['id', 'title', 'description', 'company_id', 'created_at', 'updated_at'];
      case 'applications':
        return ['id', 'message', 'user_id', 'advertisement_id', 'created_at', 'updated_at'];
      case 'companies':
        return ['id', 'name', 'email', 'address', 'website', 'created_at', 'updated_at'];
      default:
        return [];
    }
  };
  
  const getRecordById = (table, id) => {
    // Function to get the correct record by ID
    switch (table) {
      case 'users':
        return users.find(u => u.id === id);
      case 'advertisements':
        return advertisements.find(ad => ad.id === id);
      case 'applications':
        return applications.find(app => app.id === id);
      case 'companies':
        return companies.find(c => c.id === id);
      default:
        return null;
    }
  };

  const handleSubmit = (formData) => {
    const endpoint = formTable === 'users' ? '/users_create' : `/${formTable}_create`;
    if (editData) {
      instance.put(`/${formTable}_update/${editData.id}`, formData)
        .then(() => {
          alert('Record updated successfully!');
          fetchData();
        })
        .catch(err => console.error(err));
    } else {
      instance.post(endpoint, formData)
        .then(() => {
          alert('Record created successfully!');
          fetchData();
        })
        .catch(err => console.error(err));
    }
  };

  if (!authenticated) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      {/* <button onClick={handleLogout}>{language === 'EN' ? 'Logout' : 'Déconnexion'} </button> */}
      <h1>Admin Dashboard</h1>

      {/* USERS TABLE */}
      <Table
        title="Users"
        data={users}
        handleCreate={() => handleCreate('users')}
        handleUpdate={(id) => handleUpdate('users', id)}
        handleDelete={(id) => handleDelete('users', id)}
      />

      {/* ADVERTISEMENTS TABLE */}
      <Table
        title="Advertisements"
        data={advertisements}
        handleCreate={() => handleCreate('advertisements')}
        handleUpdate={(id) => handleUpdate('advertisements', id)}
        handleDelete={(id) => handleDelete('advertisements', id)}
      />

      {/* APPLICATIONS TABLE */}
      <Table
        title="Applications"
        data={applications}
        handleCreate={() => handleCreate('applications')}
        handleUpdate={(id) => handleUpdate('applications', id)}
        handleDelete={(id) => handleDelete('applications', id)}
      />

      {/* COMPANIES TABLE */}
      <Table
        title="Companies"
        data={companies}
        handleCreate={() => handleCreate('companies')}
        handleUpdate={(id) => handleUpdate('companies', id)}
        handleDelete={(id) => handleDelete('companies', id)}
      />

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      {/* Form Modal */}
      <Wizard
        show={showForm}
        handleClose={() => setShowForm(false)}
        handleSubmit={handleSubmit}
        initialData={editData}
        fields={fields}
      />
    </div>
  );
};

// Reusable Table Component
const Table = ({ title, data, handleCreate, handleUpdate, handleDelete }) => (
  <div>
    <h2>{title}</h2>
    <button onClick={handleCreate} className="btn btn-warning">Create New</button>
    <table className="table">
      <thead>
        <tr>
          {data.length > 0 && Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record) => (
          <tr key={record.id}>
            {Object.values(record).map((value, i) => (
              <td key={i}>
                {/* If value is an object, stringify it or display specific properties */}
                {typeof value === 'object' && value !== null
                  ? JSON.stringify(value) // Handle object (you can customize this to display specific properties)
                  : value}
              </td>
            ))}
            <td>
              <button className="btn btn-warning" onClick={() => handleUpdate(record.id)}>Update</button>
              <button className="btn btn-warning" onClick={() => handleDelete(record.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Modify;
