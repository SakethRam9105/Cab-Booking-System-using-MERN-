import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Aaddcab() {
    const [formData, setFormData] = useState({
        drivername: '',
        carname: '',
        cartype: '',
        carno: '',
        price: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'carImage') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('drivername', formData.drivername);
            formDataToSend.append('carname', formData.carname);
            formDataToSend.append('cartype', formData.cartype);
            formDataToSend.append('carno', formData.carno);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('carImage', formData.carImage);

            await axios.post('http://localhost:8000/cabs', formDataToSend);
            alert('Car added successfully');
            navigate('/admin/all-cabs');
        } catch (error) {
            console.error('Error adding car: ', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-90" style={{ backgroundColor: 'rgb(0,123,255)' }}>
            <div className="position-absolute top-0 start-0 p-3">
        <button className="btn btn-light" onClick={() => navigate('/admin/landing')}>
          <i className="bi bi-arrow-left"></i> Go Back
        </button>
      </div>
            <div className="bg-white p-4 rounded shadow" style={{ width: '400px' }}>
                <h2 className="text-center">Add Cab</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Driver Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="drivername"
                            placeholder='Driver Name'
                            value={formData.drivername}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Car Model:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="carname"
                            placeholder='Car Model'
                            value={formData.carname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Car Type:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cartype"
                            placeholder='Car Type'
                            value={formData.cartype}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Car Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="carno"
                            placeholder='Car No'
                            value={formData.carno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="price"
                            placeholder='Price'
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Upload Car Image:</label>
                        <input
                            type="file"
                            className="form-control"
                            name="carImage"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
