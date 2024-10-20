import React, { useState, useEffect } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { instance } from './myaxios';
import Wizard from './wizard.jsx';

const Modify = (darkMode) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]); // General data for selected table
  const [table, setTable] = useState(''); // Track current table
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);  // Track data being edited
  const [fields, setFields] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // Pagination limit
  const navigate = useNavigate(); //after logout

  const [alertMessage, setAlertMessage] = useState(''); // To hold the alert message
  const [alertVariant, setAlertVariant] = useState('success'); // Alert type (success, danger, etc.)
  const [showAlert, setShowAlert] = useState(false); 


  // Tables buttons
  const tables = [
    { name: 'Users', value: 'users' },
    { name: 'Advertisements', value: 'advertisements' },
    { name: 'Applications', value: 'applications' },
    { name: 'Companies', value: 'companies' },
    { name: 'Unregistered Users', value: 'unregistered_users' }
  ];

  // Fetch authentication status and load initial data when page or table changes
  useEffect(() => {
    // Check if the user is authenticated and has the correct role
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('user_role');

    if (!token) {
      setErrorMessage('You must be logged in to access this page.');
      setAuthenticated(false);
      return;
    }

    if (userRole !== 'admin') {
      setErrorMessage('Access denied: Admins only.');
      setAuthenticated(false);
      return;
    }

    setAuthenticated(true);
    if (table)fetchData(table);

  }, [table, page]);

  const fetchData = (table) => {
    instance.get(`/${table}_list?page=${page}&limit=${itemsPerPage}`)
      .then(response => setData(response.data))
      .catch(err => console.error(err));
  };

  const handleTableSelect = (selectedTable) => {
    setTable(selectedTable);
    setPage(1); // Reset to first page on table change
    setFields(getFieldsForTable(selectedTable)); // Set fields for the form
    fetchData(selectedTable); // Fetch data for the new table
  };

  const handleCreate = () => {
    setEditData(null); // Clear edit data for creating new record
    setShowForm(true); // Show the form modal for creating
  };

  const handleUpdate = (id) => {
    const record = data.find(item => item.id === id);
    setEditData(record); // Load data to the form for editing
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      instance.delete(`/${table}_delete/${id}`)
        .then(() => {
          setAlertMessage('Record deleted successfully!');
          setAlertVariant('success');
          setShowAlert(true);
          fetchData(table);
        })
        .catch(err =>{
          setAlertMessage('Error deleting record.');
          setAlertVariant('danger');
          setShowAlert(true);
        console.error(err);
        });  
    }
  };
  
  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('user_id')
    navigate('/'); // Redirect to login page
  };

  const getFieldsForTable = (table) => {
    switch (table) {
      case 'users':
        return ['first_name', 'last_name', 'phone', 'email', 'role', 'company_id'];
      case 'advertisements':
        return ['job_title', 'location', 'salary', 'contract_type', 'full_description', 'company_id', 'user_id'];
      case 'applications':
        return ['message', 'user_id', 'advertisement_id'];
      case 'companies':
        return ['name', 'email', 'address', 'website'];
      case 'unregistered_users':
        return ['first_name', 'last_name', 'phone', 'email'];
      default:
        return [];
    }
  };

    // Fetch data by ID (for updating records)
  const fetchDataById = (id) => {
    let endpoint = '';

    switch (table) {
      case 'users':
        endpoint = `/users_show/${id}`;
        break;
      case 'advertisements':
        endpoint = `/advertisements_show/${id}`;
        break;
      case 'applications':
        endpoint = `/applications_show/${id}`;
        break;
      case 'companies':
        endpoint = `/companies_show/${id}`;
        break;
      case 'unregistered_users':
        endpoint = `/unregistered_users_show/${id}`;
        break;
      default:
        throw new Error('Invalid table name');
    }

    return instance.get(endpoint)
      .then(response => response.data)
      .catch(err => {
        console.error("Error fetching data by ID:", err);
        throw err;
      });
  };

  // Submit form data for create or update
  const handleSubmit = (formData) => {
    let endpoint = '';
    let method;

    // Set the correct API route and method based on the table and whether we are creating or updating
    if (editData) {
      // Update existing record
      switch (table) {
        case 'users':
          endpoint = `/users_update/${editData.id}`;
          method = instance.put;
          break;
        case 'advertisements':
          endpoint = `/advertisements_update/${editData.id}`;
          method = instance.put;
          break;
        case 'applications':
          endpoint = `/applications_update/${editData.id}`;
          method = instance.put;
          break;
        case 'companies':
          endpoint = `/companies_update/${editData.id}`;
          method = instance.put;
          break;
        default:
          throw new Error('Invalid table name for update');
      }
    } else {
      // Create new record
      switch (table) {
        case 'users':
          endpoint = `/users_create`; // Assuming this is the correct endpoint; if not, update it
          method = instance.post;
          break;
        case 'advertisements':
          endpoint = `/advertisements_create`;
          method = instance.post;
          break;
        case 'applications':
          endpoint = `/applications_create`;
          method = instance.post;
          break;
        case 'companies':
          endpoint = `/companies_create`;
          method = instance.post;
          break;
        default:
          throw new Error('Invalid table name for create');
      }
    }

    method(endpoint, formData)
      .then(() => {
        setAlertMessage(editData ? 'Record updated successfully!' : 'Record created successfully!');
        setAlertVariant('success');
        setShowAlert(true);
        fetchData(table); // Refresh the table data after submission
      })
      .catch(err => {
        setAlertMessage('Error submitting form. Please check console for details.');
        setAlertVariant('danger');
        setShowAlert(true);
        console.error("Error submitting form:", err);
      });

    setShowForm(false); // Close the form modal after submission
  };

  const handlePagination = (direction) => {
  setPage((prevPage) => prevPage + direction);
  };
  if (!authenticated) {
    return <div>{errorMessage}</div>;
  }
    // Paginate the data
    const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Calculate total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Container>
      {/* Display the alert */}
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <div className="col-md-2 login-container mb-3">
        <Link to="/" className="login-link">
          <button className="btn-spotify-style" onClick={handleLogout}>Logout</button>
        </Link>
        <Link to="/" className="login-link"> 
          <button className="btn-spotify-style"> Home </button> 
        </Link> 
        <Link to="/recruiter" className="login-link"> 
          <button className="btn-spotify-style"> Recruiter </button> 
        </Link> 
        <Link to="/profile"className="login-link">
          <button className="btn-spotify-style"> Profile </button> 
        </Link>
      </div>
      <h2 style={{ padding: "2rem 0", textAlign: "center", textTransform: "uppercase", letterSpacing: "5px" }}>Admin Dashboard</h2>
      <div className="table-buttons" style={{ display: 'flex', justifyContent: 'space-evenly' }}> 
        {tables.map(t => (
          <Button
            key={t.value}
            onClick={() => handleTableSelect(t.value)}
            className={table === t.value ? 'btn-spotify-style' : 'btn-spotify-style'}
          >
            {t.name}
          </Button>
        ))}
      </div>

      {table && (
        <>
          <h2 style={{ borderTop: "2px solid lightgray", margin: "4rem 0 1rem 0 " }}>
            {table.charAt(0).toUpperCase() + table.slice(1)}
          </h2>
          <Button className="btn btn-warning mb-3" onClick={handleCreate}>
            Create New {table.slice(0, -1)} {/* Singular table name */}
          </Button>
          <table className="table">
            <thead>
              <tr>
                {fields.map((field, i) => (
                  <th key={i}>{field}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record) => (
                <tr key={record.id}>
                  {fields.map((field, i) => (
                    <td key={i}>{record[field]}</td>
                  ))}
                  <td>
                    <Button className="btn-spotify-style"  onClick={() => handleUpdate(record.id)}>Update</Button>
                    <Button className="btn-spotify-style"  onClick={() => handleDelete(record.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

            {/* Pagination Controls */}
          <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button
              onClick={() => handlePagination(-1)}
              disabled={page <= 1}
              style={{ backgroundColor: 'green', color: 'black', marginRight: '1rem' }}
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePagination(1)}
              disabled={page >= totalPages} // Disable next button if on the last page
              style={{ backgroundColor: 'green', color: 'black' }}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* Form Modal */}
      <Wizard
        show={showForm}
        handleClose={() => setShowForm(false)}
        handleSubmit={handleSubmit}
        initialData={editData}
        fields={fields}
        fetchDataById={fetchDataById}
      />
    </Container>
  );
};

export default Modify;
