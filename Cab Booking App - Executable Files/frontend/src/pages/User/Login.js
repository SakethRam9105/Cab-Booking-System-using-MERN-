import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css'; // Import the CSS file

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/login", { email: email, password: password })
      .then(result => {
        console.log(result);
        const { Status, user } = result.data;
        if (Status === "Success") {
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/landing');
        }
        else{
          alert('try again')
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSignup = (e) => {
    navigate('/signup');
  };

  return (
    <div className="auth-container">
      <div className="position-absolute top-0 start-0 p-3">
                <button className="btn btn-light" onClick={() => navigate('/')}>
                    <i className="bi bi-arrow-left"></i> Go Back
                </button>
            </div>
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label auth-form-label">
              Email
            </label>
            <input type="email" placeholder="Enter your email" autoComplete="off" name="email" className="form-control auth-form-control" onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label auth-form-label">
              Password
            </label>
            <input type="password" placeholder="Set password" autoComplete="off" name="password" className="form-control auth-form-control" onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <button type="submit" className="btn auth-button-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3 mb-0">Don't have an Account?</p>
        <button className="btn btn-outline-primary auth-button-outline w-100" onClick={handleSignup}>Signup today!</button>
      </div>
    </div>
  );
}
