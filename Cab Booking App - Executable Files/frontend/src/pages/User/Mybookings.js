import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Mybookings() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        selectedPickupState: '',
        selectedPickupCity: '',
        selectedDropState: '',
        selectedDropCity: '',
        pickupdate: '',
        pickuptime: '',
        dropdate: '',
        droptime: '',
        drivername: '',
        fare: '',
        carname: '',
        cartype: '',
        carno: '',
        price: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/getrides/${id}`)
            .then((resp) => {
                if(resp.data.message==="No bookings found for this user."){
                    alert('No bookings.')
                }
                else{
                    setBookings(resp.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
                alert('Error fetching bookings. Please try again later.');
            });
    }, [id]);

    const handleEdit = (booking) => {
        setEditing(booking._id);
        setFormData({ ...booking });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveChanges = () => {
        axios.put(`http://localhost:8000/rides/${editing}`, formData)
            .then((resp) => {
                setBookings(bookings.map(b => b._id === editing ? resp.data : b));
                setEditing(null);
            })
            .catch((error) => {
                console.error('Error updating booking:', error);
                alert('Error updating booking. Please try again later.');
            });
    };

    const handleDelete = (bookingId) => {
        axios.delete(`http://localhost:8000/deleteride/${bookingId}`)
            .then(() => {
                setBookings(bookings.filter(b => b._id !== bookingId));
            })
            .catch((error) => {
                console.error('Error deleting booking:', error);
                alert('Error deleting booking. Please try again later.');
            });
    };

    return (
        <div style={{ backgroundColor: 'rgb(0, 123, 255)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Bookings</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Pickup State</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Pickup City</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Drop State</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Drop City</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Pickup Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Pickup Time</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Drop Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Drop Time</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Driver Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fare</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Car Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Car Type</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Car No</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="selectedPickupState" value={formData.selectedPickupState} onChange={handleChange} />
                                    ) : (
                                        booking.selectedPickupState
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="selectedPickupCity" value={formData.selectedPickupCity} onChange={handleChange} />
                                    ) : (
                                        booking.selectedPickupCity
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="selectedDropState" value={formData.selectedDropState} onChange={handleChange} />
                                    ) : (
                                        booking.selectedDropState
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="selectedDropCity" value={formData.selectedDropCity} onChange={handleChange} />
                                    ) : (
                                        booking.selectedDropCity
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="pickupdate" value={formData.pickupdate} onChange={handleChange} />
                                    ) : (
                                        booking.pickupdate
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="pickuptime" value={formData.pickuptime} onChange={handleChange} />
                                    ) : (
                                        booking.pickuptime
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="dropdate" value={formData.dropdate} onChange={handleChange} />
                                    ) : (
                                        booking.dropdate
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="droptime" value={formData.droptime} onChange={handleChange} />
                                    ) : (
                                        booking.droptime
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="drivername" value={formData.drivername} onChange={handleChange} />
                                    ) : (
                                        booking.drivername
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="fare" value={formData.fare} onChange={handleChange} />
                                    ) : (
                                        booking.fare
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="carname" value={formData.carname} onChange={handleChange} />
                                    ) : (
                                        booking.carname
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="cartype" value={formData.cartype} onChange={handleChange} />
                                    ) : (
                                        booking.cartype
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="carno" value={formData.carno} onChange={handleChange} />
                                    ) : (
                                        booking.carno
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="price" value={formData.price} onChange={handleChange} />
                                    ) : (
                                        booking.price
                                    )}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                                    {editing === booking._id ? (
                                        <button onClick={saveChanges}>Save</button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(booking)}>✏️</button>
                                            <button onClick={() => handleDelete(booking._id)}>❌</button>
                                        </>
                                    )}
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
