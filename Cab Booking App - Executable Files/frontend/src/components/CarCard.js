import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => (
  <div className="card car-card" key={car._id} id='pop' style={{ width: '18rem', backgroundColor: '#343a40', color: '#ffffff', border: 'none' }}>
    <img 
      src={`http://localhost:8000/${car?.carImage}`} 
      className="card-img-top" 
      alt={`${car.carname} Image`} 
      style={{ height: '150px', objectFit: 'cover' }} 
    />
    <div className="card-body">
      <p className="card-text">Driver Name: {car.drivername}</p>
      <p className="card-text">Car Model: {car.carname}</p>
      <p className="card-text">Car Type: {car.cartype}</p>
      <p className="card-text">Car No: {car.carno}</p>
      <p className="card-text">Price: {car.price}/Km</p>
      <div className='text-right'>
        <Link to={`/ride-details/${car._id}`} className="btn" style={{ backgroundColor: "rgb(0,123,255)", color: "white", border: "none" }}>
          Book
        </Link>
      </div>
    </div>
  </div>
);

export default CarCard;
