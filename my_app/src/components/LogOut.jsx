// Handle Logout function
const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token on logout
    setIsAdmin(false); // Reset admin state
    navigate('/'); // Redirect to home page
  };  