import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Logout = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token on logout
    setIsAdmin(false); // Reset admin state
    setIsRecruiter(false); // Reset recruiter state
    setIsCandidate(false); // Reset candidate state
    navigate('/'); // Redirect to home page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;