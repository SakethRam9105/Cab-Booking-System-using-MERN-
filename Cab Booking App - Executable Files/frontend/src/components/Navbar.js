import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(0, 123, 255)', borderBottom: '1px solid #ddd' }}>
      <div className="container-fluid">
        <span className="navbar-brand" style={{ color: 'rgb(0,123,255)', fontWeight: 'bold', backgroundColor: 'white', borderRadius: '25%', border: '2px solid black' }}>. e-Cab .</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#home-section" style={{ color: '#ffffff', marginRight: '10px' }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#ride-section" style={{ color: '#ffffff', marginRight: '10px' }}>Ride</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about-section" style={{ color: '#ffffff', marginRight: '10px' }}>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#donate-section" style={{ color: '#ffffff', marginRight: '10px' }}>Donate</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services-section" style={{ color: '#ffffff', marginRight: '10px' }}>Services</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#ffffff', marginRight: '10px' }}>
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to={`/myaccount/${user.id}`} style={{ color: '#333', marginRight: '10px' }}>My Account</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={`/mybookings/${user.id}`} style={{ color: '#333', marginRight: '10px' }}>My Bookings</Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout} style={{ color: '#333', marginRight: '10px' }}>Logout</button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{ color: '#ffffff', marginRight: '10px' }}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
