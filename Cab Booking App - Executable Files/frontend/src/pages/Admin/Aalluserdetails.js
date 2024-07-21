import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Aalluserdetails() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/getAllUsers')
            .then((resp) => {
                setUsers(resp.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                alert('Error fetching users. Please try again later.');
            });
    }, []);

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:8000/deleteUser/${userId}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== userId));
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                alert('Error deleting user. Please try again later.');
            });
    };

    return (
        <div style={{ backgroundColor: 'rgb(0, 123, 255)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All Users</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>User ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user._id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={() => handleDelete(user._id)}>❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => navigate(-1)} style={{ display: 'block', margin: '20px auto', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px' }}>Go Back</button>
            </div>
        </div>
    );
}
