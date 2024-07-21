import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Alogin() {
    const [AdminID, setAdminID] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/adminlogin", { AdminID, password })
            .then(result => {
                if (result.data.Status === "Success") {
                    localStorage.setItem('adminToken', 'yourTokenHere');
                    navigate('/admin/landing');
                } else {
                    alert('Try again');
                }
            })
            .catch((err) => {
                console.error(err);
                alert('An error occurred');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgb(0, 123, 255)', minHeight: '100vh' }}>
            <div className="position-absolute top-0 start-0 p-3">
                <button className="btn btn-light" onClick={() => navigate('/')}>
                    <i className="bi bi-arrow-left"></i> Go Back
                </button>
            </div>
            <div className="bg-white p-3 rounded w-75 mx-auto" style={{ maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            <strong>AdminID</strong>
                        </label>
                        <input type="email" placeholder="Enter AdminID" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e) => { setAdminID(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="Enter password" autoComplete="off" name="password" className="form-control rounded-0" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-3" style={{ backgroundColor: 'rgb(0, 123, 255)' }}>Login</button>
                </form>
                
                <p>
               ( Note :   
                    AdminID is set to 'admin123@gmail.com'
                    and password is set to '123'.
                    These are set when the connection with database is established in the backend.)
                </p>
            </div>
            
        </div>
    );
}
