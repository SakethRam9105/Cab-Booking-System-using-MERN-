import React from 'react';
import { useNavigate } from 'react-router-dom';

function Prompt() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    // Redirect to user login page
    navigate('/login'); 
  };

  const handleAdminClick = () => {
    // Redirect to admin login page
    navigate('/admin/login');
  };

  return (
    <div style={{ backgroundColor: 'rgb(0,123,255)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,1)' }}>
        <h2 className="mb-4">Welcome to the Taxi Booking System</h2>
        <p className="mb-4">Please select your role:</p>
        <div className="buttons-container">
          <div className="mb-3">
            <button className="btn btn-primary btn-lg mr-2" onClick={handleUserClick}>I'm a User</button>
            <p> </p>
            <button className="btn btn-primary btn-lg" onClick={handleAdminClick}>I'm an Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
