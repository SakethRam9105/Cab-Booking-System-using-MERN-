import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AllBookings() {
    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/getrides');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleEdit = (booking) => {
        setEditing(booking._id);
        setFormData({ ...booking });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/rides/${editing}`, formData);
            setBookings(bookings.map(b => b._id === editing ? response.data : b));
            setEditing(null);
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const deleteBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/deleteride/${id}`);
            setBookings(bookings.filter(booking => booking._id !== id));
            alert('Booking deleted successfully');
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div style={{ backgroundColor: 'rgb(0, 123, 255)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'rgb(0,123,255)' }}>All Bookings</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'rgb(0,123,255)', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Pickup State</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Pickup City</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Drop State</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Drop City</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Pickup Date</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Pickup Time</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Drop Date</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Drop Time</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Driver Name</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Fare</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Car Name</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Car Type</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Car Number</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Price</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>User Name</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Booked Date</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="selectedPickupState" value={formData.selectedPickupState} onChange={handleChange} />
                                    ) : (
                                        booking.selectedPickupState
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="selectedPickupCity" value={formData.selectedPickupCity} onChange={handleChange} />
                                    ) : (
                                        booking.selectedPickupCity
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="selectedDropState" value={formData.selectedDropState} onChange={handleChange} />
                                    ) : (
                                        booking.selectedDropState
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="selectedDropCity" value={formData.selectedDropCity} onChange={handleChange} />
                                    ) : (
                                        booking.selectedDropCity
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="pickupdate" value={formData.pickupdate} onChange={handleChange} />
                                    ) : (
                                        booking.pickupdate
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="pickuptime" value={formData.pickuptime} onChange={handleChange} />
                                    ) : (
                                        booking.pickuptime
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="dropdate" value={formData.dropdate} onChange={handleChange} />
                                    ) : (
                                        booking.dropdate
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="droptime" value={formData.droptime} onChange={handleChange} />
                                    ) : (
                                        booking.droptime
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="drivername" value={formData.drivername} onChange={handleChange} />
                                    ) : (
                                        booking.drivername
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="fare" value={formData.fare} onChange={handleChange} />
                                    ) : (
                                        booking.fare
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="carname" value={formData.carname} onChange={handleChange} />
                                    ) : (
                                        booking.carname
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="cartype" value={formData.cartype} onChange={handleChange} />
                                    ) : (
                                        booking.cartype
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="carno" value={formData.carno                                    } onChange={handleChange} />
                                    ) : (
                                        booking.carno
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="price" value={formData.price} onChange={handleChange} />
                                    ) : (
                                        booking.price
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
                                    ) : (
                                        booking.userName
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    {editing === booking._id ? (
                                        <input type="text" name="bookeddate" value={formData.bookeddate} onChange={handleChange} />
                                    ) : (
                                        booking.bookeddate
                                    )}
                                </td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                                    {editing === booking._id ? (
                                        <>
                                            <button onClick={saveChanges} style={{ marginRight: '10px' }}>Save</button>
                                            <button onClick={() => setEditing(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(booking)} style={{ marginRight: '10px' }}>Edit</button>
                                            <button onClick={() => deleteBooking(booking._id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={() => navigate(-1)} style={{ display: 'block', margin: '20px auto', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px' }}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

