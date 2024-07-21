import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Anav from '../../components/Anav';

function AlandingPage() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios.get(`http://localhost:8000/getAllUsers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users: ', error);
      });

    // Fetch booking data
    axios.get(`http://localhost:8000/getrides`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings: ', error);
      });

    // Fetch cars data
    axios.get(`http://localhost:8000/cabs`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings: ', error);
      });
  }, []);

  // Calculate the number of users, cars, and bookings
  const totalUsers = users.length;
  const totalCars = cars.length;
  const totalBookings = bookings.length;

  // Define data for the bar chart
  const data = [
    { name: 'Users', value: totalUsers, fill: '#2B124C' },
    { name: 'Cabs', value: totalCars, fill: 'blue' },
    { name: 'Bookings', value: totalBookings, fill: 'cyan' },
  ];

  return (
    <div style={{backgroundColor:'#f5f9ff'}}>
      <Anav />
      <h3 className="text-center" style={{ color: 'rgb(0,123,255)' }}>Dashboard</h3>
      <Card body style={{ background: '##f7fbff', width: '80%', marginLeft: '10%', marginTop: '20px', height: '580px' }}>
        <div className="d-flex justify-content-around align-items-center p-4">
          <Link to="/admin/all-users" style={{ textDecoration: 'none' }}>
            <div
              style={{
                width: '200px',
                height: '150px',
                backgroundColor: 'rgb(0,123,255)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              USERS <br /> <br />{totalUsers}
            </div>
          </Link>
          <Link to="/admin/all-cabs" style={{ textDecoration: 'none' }}>
            <div
              style={{
                width: '200px',
                height: '150px',
                backgroundColor: 'rgb(0,123,255)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              CABS <br /> <br /> {totalCars}
            </div>
          </Link>
          <Link to="/admin/all-bookings" style={{ textDecoration: 'none' }}>
            <div
              style={{
                width: '200px',
                height: '150px',
                backgroundColor: 'rgb(0,123,255)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              BOOKINGS <br /> <br /> {totalBookings}
            </div>
          </Link>
        </div>
        <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
          <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </div>
      </Card>
    </div>
  );
}

export default AlandingPage;
