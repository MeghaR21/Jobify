import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LogoutButton = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token on logout
    setIsAdmin(false); // Reset admin state
    
    navigate('/'); // Redirect to home page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;