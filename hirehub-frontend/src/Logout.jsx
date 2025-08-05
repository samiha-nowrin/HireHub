import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page after logout
    navigate('/login');
  }, [navigate]);

  return null; // No UI needed
}

export default Logout;
