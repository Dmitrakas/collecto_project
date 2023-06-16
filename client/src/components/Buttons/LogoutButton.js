import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/authAPI';
import Button from 'react-bootstrap/Button';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
