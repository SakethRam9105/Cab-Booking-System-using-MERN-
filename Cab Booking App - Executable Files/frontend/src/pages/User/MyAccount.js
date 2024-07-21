import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function MyAccount() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editingName, setEditingName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/getUser/${id}`)
            .then((resp) => {
                console.log('API response:', resp.data);
                if (resp.data) {
                    setUser(resp.data);
                    setName(resp.data.name);
                    setEmail(resp.data.email);
                    setPassword(resp.data.password); // Assuming you have a secure way to handle passwords
                } else {
                    alert('No User data found.');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                alert('Error fetching user data. Please try again later.');
            });
    }, [id]);

    const handleNameEdit = () => {
        setEditingName(true);
    };

    const handleEmailEdit = () => {
        setEditingEmail(true);
    };

    const handlePasswordEdit = () => {
        setEditingPassword(true);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const saveName = () => {
        axios.put(`http://localhost:8000/userEdit/${id}`, { name })
            .then((resp) => {
                console.log('Name updated successfully:', resp.data);
                setEditingName(false); // Exit editing mode
                // Update localStorage
                updateLocalStorage('name', name);
            })
            .catch((error) => {
                console.error('Error updating name:', error);
                alert('Error updating name. Please try again later.');
            });
    };

    const saveEmail = () => {
        axios.put(`http://localhost:8000/userEdit/${id}`, { email })
            .then((resp) => {
                console.log('Email updated successfully:', resp.data);
                setEditingEmail(false); // Exit editing mode
                // Update localStorage
                updateLocalStorage('email', email);
            })
            .catch((error) => {
                console.error('Error updating email:', error);
                alert('Error updating email. Please try again later.');
            });
    };

    const savePassword = () => {
        axios.put(`http://localhost:8000/userEdit/${id}`, { password })
            .then((resp) => {
                console.log('Password updated successfully:', resp.data);
                setEditingPassword(false); // Exit editing mode
                // No localStorage update for password for security reasons
            })
            .catch((error) => {
                console.error('Error updating password:', error);
                alert('Error updating password. Please try again later.');
            });
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            axios.delete(`http://localhost:8000/deleteUser/${id}`)
                .then((resp) => {
                    console.log('Account deleted successfully:', resp.data);
                    // Clear localStorage
                    localStorage.clear();
                    // Navigate to homepage
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error deleting account:', error);
                    alert('Error deleting account. Please try again later.');
                });
        }
    };

    const updateLocalStorage = (key, value) => {
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        userData[key] = value;
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <div style={{ backgroundColor: 'rgb(0, 123, 255)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px', width: '600px', textAlign: 'center' }}>
                {user ? (
                    <div>
                        <section style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '10px', borderRadius: '5px', fontSize: '1.2rem' }}>
                            <h2><i className="bi bi-person-circle" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i> Name :- </h2>
                            {editingName ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="text" value={name} onChange={handleNameChange} />
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff', marginLeft: '10px' }} onClick={saveName}><i className="bi bi-check-circle"></i></button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p>&nbsp;&nbsp;&nbsp;{name}</p>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff', marginLeft: '10px' }} onClick={handleNameEdit}><i className="bi bi-pencil-square"></i></button>
                                </div>
                            )}
                        </section>
                        <section style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '10px', borderRadius: '5px', fontSize: '1.2rem' }}>
                            <h2><i className="bi bi-envelope" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i> Email :- </h2>
                            {editingEmail ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="email" value={email} onChange={handleEmailChange} />
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff', marginLeft: '10px' }} onClick={saveEmail}><i className="bi bi-check-circle"></i></button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                
                                    <p>&nbsp;&nbsp;&nbsp;{email}</p>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff', marginLeft: '10px' }} onClick={handleEmailEdit}><i className="bi bi-pencil-square"></i></button>
                                </div>
                            )}
                        </section>
                        <section style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '10px', borderRadius: '5px', fontSize: '1.2rem' }}>
                            <h2><i className="bi bi-lock" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i> Password :- </h2>
                            {editingPassword ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="password" value={password} onChange={handlePasswordChange} />
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff', marginLeft: '10px' }} onClick={savePassword}><i className="bi bi-check-circle"></i></button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p>&nbsp;&nbsp;&nbsp;********</p>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff', marginLeft: '10px' }} onClick={handlePasswordEdit}><i className="bi bi-pencil-square"></i></button>
                                </div>
                            )}
                        </section>
                        <section style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff', marginRight: '10px' }} onClick={() => navigate('/landing')}>Go Back</button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#007bff' }} onClick={handleDeleteAccount}>Delete My Account</button>
                        </section>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
