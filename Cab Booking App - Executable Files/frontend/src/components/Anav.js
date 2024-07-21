import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Anav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/';
    };

    const handleB1 = () => {
        navigate('/admin/all-bookings');
    };

    const handleB2 = () => {
        navigate('/admin/all-users');
    };

    const handleB3 = () => {
        navigate('/admin/all-cabs');
    };

    const handleB4 = () => {
        navigate('/admin/add-cab');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(0, 123, 255)', borderBottom: '1px solid #ddd' }}>
            <div className="container-fluid">
                <span className="navbar-brand" style={{ color: 'rgb(0,123,255)', fontWeight: 'bold', backgroundColor: 'white', borderRadius: '25%', border: '2px solid black' }}>. Admin Panel .</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={handleB1} style={{ color: '#ffffff', marginRight: '10px' }}>All Bookings</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={handleB2} style={{ color: '#ffffff', marginRight: '10px' }}>All Users</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={handleB3} style={{ color: '#ffffff', marginRight: '10px' }}>All Cabs</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={handleB4} style={{ color: '#ffffff', marginRight: '10px' }}>Add Cab</button>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link btn" onClick={handleLogout} style={{ color: '#ffffff', marginRight: '10px' }}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
