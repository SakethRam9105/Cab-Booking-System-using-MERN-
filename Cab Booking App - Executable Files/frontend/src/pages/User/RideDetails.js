import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RideDetails = () => {
  const [selectedPickupState, setSelectedPickupState] = useState('');
  const [selectedPickupCity, setSelectedPickupCity] = useState('');
  const [selectedPickupPincode, setSelectedPickupPincode] = useState('');
  const [selectedDropState, setSelectedDropState] = useState('');
  const [selectedDropCity, setSelectedDropCity] = useState('');
  const [selectedDropPincode, setSelectedDropPincode] = useState('');
  const [pickupdate, setPickupDate] = useState('');
  const [pickuptime, setPickupTime] = useState('');
  const [dropdate, setDropDate] = useState('');
  const [droptime, setDropTime] = useState('');
  const [excludedCities, setExcludedCities] = useState([]);
  const [fare, setFare] = useState(null);
  const [car, setCar] = useState(null);

  let { id } = useParams();
  const navigate = useNavigate();

  
  const handleStateChange = (selectedState, locationType) => {
    if (locationType === 'Pickup') {
      setSelectedPickupState(selectedState);
      setSelectedPickupCity('');
      setSelectedPickupPincode('');
      setExcludedCities([]);
    } else if (locationType === 'Drop') {
      setSelectedDropState(selectedState);
      setSelectedDropCity('');
      setSelectedDropPincode('');
    }
  };

  const handleCityChange = (selectedCity, locationType) => {
    const selectedState = locationType === 'Pickup' ? selectedPickupState : selectedDropState;
    const cityData = cities[selectedState] || [];
    const selectedPincode = cityData.find((city) => city.name === selectedCity)?.pincode || '';

    if (locationType === 'Pickup') {
      setSelectedPickupCity(selectedCity);
      setSelectedPickupPincode(selectedPincode);
    } else if (locationType === 'Drop') {
      setSelectedDropCity(selectedCity);
      setSelectedDropPincode(selectedPincode);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/cab/${id}`)
      .then((resp) => {
        console.log('API response:', resp.data); // Log the response data
        if (resp.data) {
          setCar(resp.data);
        } else {
          alert('No car data found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
        alert('Error fetching car data. Please try again later.');
      });
  }, [id]);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!car) {
      alert('Car data is not available. Please try again later.');
      return;
    }

    const userName = JSON.parse(localStorage.getItem('user')).name;
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const data = {
      selectedPickupState,
      selectedPickupCity,
      selectedPickupPincode,
      selectedDropState,
      selectedDropCity,
      selectedDropPincode,
      pickupdate,
      pickuptime,
      dropdate,
      droptime,
      fare,
      userName,
      userId,
      drivername: car.drivername,
      carname: car.carname,
      cartype: car.cartype,
      carno: car.carno,
      price: car.price,
    };

    axios
      .post('http://localhost:8000/rides', data)
      .then((response) => {
        alert("Cab booked successfully:");
        console.log('Ride booked successfully:', response.data);
        navigate('/landing')
      })
      .catch((error) => {
        console.error('Error booking ride:', error);
      });
  };

  const states = [
    'Delhi',
    'Maharashtra',
    'Tamil Nadu',
    'Karnataka',
    'Uttar Pradesh',
    'West Bengal',
    'Gujarat',
    'Rajasthan',
    'Punjab',
    'Haryana',
    'Andhra Pradesh',
    'Telangana',
  ];
  
  const cities = {
    Delhi: [
      { name: 'New Delhi', pincode: '110001' },
      { name: 'Gurgaon', pincode: '122001' },
      { name: 'Noida', pincode: '201301' },
    ],
    Maharashtra: [
      { name: 'Mumbai', pincode: '400001' },
      { name: 'Pune', pincode: '411001' },
      { name: 'Nagpur', pincode: '440001' },
    ],
    'Tamil Nadu': [
      { name: 'Chennai', pincode: '600001' },
      { name: 'Coimbatore', pincode: '641001' },
      { name: 'Madurai', pincode: '625001' },
    ],
    Karnataka: [
      { name: 'Bangalore', pincode: '560001' },
      { name: 'Mysore', pincode: '570001' },
      { name: 'Hubli', pincode: '580001' },
    ],
    'Uttar Pradesh': [
      { name: 'Lucknow', pincode: '226001' },
      { name: 'Kanpur', pincode: '208001' },
      { name: 'Agra', pincode: '282001' },
    ],
    'West Bengal': [
      { name: 'Kolkata', pincode: '700001' },
      { name: 'Howrah', pincode: '711101' },
      { name: 'Durgapur', pincode: '713201' },
    ],
    Gujarat: [
      { name: 'Ahmedabad', pincode: '380001' },
      { name: 'Surat', pincode: '395001' },
      { name: 'Vadodara', pincode: '390001' },
    ],
    Rajasthan: [
      { name: 'Jaipur', pincode: '302001' },
      { name: 'Udaipur', pincode: '313001' },
      { name: 'Jodhpur', pincode: '342001' },
    ],
    Punjab: [
      { name: 'Chandigarh', pincode: '160001' },
      { name: 'Amritsar', pincode: '143001' },
      { name: 'Jalandhar', pincode: '144001' },
    ],
    Haryana: [
      { name: 'Gurgaon', pincode: '122018' },
      { name: 'Faridabad', pincode: '121001' },
      { name: 'Ambala', pincode: '134003' },
    ],
    'Andhra Pradesh': [
      { name: 'Kurnool', pincode: '518001' },
      { name: 'Visakhapatnam', pincode: '530001' },
      { name: 'Vijayawada', pincode: '520001' },
    ],
    Telangana: [
      { name: 'Hyderabad', pincode: '500001' },
      { name: 'Warangal', pincode: '506001' },
      { name: 'Karimnagar', pincode: '505001' },
    ],
  };
  
  const pricingRules = {
    'Noida-Pune': 2000,
    'Pune-Noida': 2000,
    'Delhi-Mumbai': 2500,
    'Mumbai-Delhi': 2500,
    'New Delhi-Noida': 400,
    'Noida-New Delhi': 400,
    'New Delhi-Mumbai': 2200,
    'Mumbai-New Delhi': 2200,
    'Chennai-Bangalore': 3400,
    'Bangalore-Chennai': 3400,
    'Kurnool-Visakhapatnam': 1500,
    'Visakhapatnam-Kurnool': 1500,
    'Kurnool-Vijayawada': 1800,
    'Vijayawada-Kurnool': 1800,
    'Hyderabad-Warangal': 1200,
    'Warangal-Hyderabad': 1200,
    'Hyderabad-Karimnagar': 1400,
    'Karimnagar-Hyderabad': 1400,
    'Visakhapatnam-Bangalore': 2500,
    'Bangalore-Visakhapatnam': 2500,
    'Vijayawada-Chennai': 2900,
    'Chennai-Vijayawada': 2900,
    'Warangal-Karimnagar': 1000,
    'Karimnagar-Warangal': 1000,
    'Hyderabad-Vijayawada': 1600,
    'Vijayawada-Hyderabad': 1600,
    'Kurnool-Hyderabad': 2000,
    'Hyderabad-Kurnool': 2000,
    'Visakhapatnam-Kakinada': 1200,
    'Kakinada-Visakhapatnam': 1200,
  };
  
  
  const calculateFare = () => {
    if (!selectedPickupCity || !selectedDropCity) {
      alert('Please select both pickup and drop locations.');
      return;
    }

    const routeKey = `${selectedPickupCity}-${selectedDropCity}`;
    const calculatedFare = pricingRules[routeKey];

    if (calculatedFare !== undefined) {
      setFare(calculatedFare);
    } else {
      setFare(null);
      alert('Pricing information not available for this route.');
    }
  };

  const handleCityExclusion = (selectedCity, locationType) => {
    if (locationType === 'Pickup') {
      setExcludedCities([selectedCity]);
    } else if (locationType === 'Drop') {
      setExcludedCities([selectedCity]);
    }
  };
  
  const handleGoBack = () => {
    navigate('/landing');
  }

  return (
    <div style={{ backgroundColor: 'rgb(0, 123, 255)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0' }}>
      <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px', width: '80%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <button className="btn btn-primary" onClick={handleGoBack}>Go Back</button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Book a Ride</h2>
        <form onSubmit={handlesubmit}>
          <h2>PickUp</h2>
          <div id='pic'>
            <div style={{ marginBottom: '15px' }}>
              <select
                value={selectedPickupState}
                onChange={(e) => handleStateChange(e.target.value, 'Pickup')}
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <select
                value={selectedPickupCity}
                onChange={(e) => handleCityChange(e.target.value, 'Pickup')}
                onClick={() => handleCityExclusion(selectedDropCity, 'Pickup')}
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">Select a city</option>
                {selectedPickupState && cities[selectedPickupState] ? (
                  cities[selectedPickupState].map((city) => (
                    <option
                      key={city.name}
                      value={city.name}
                      disabled={excludedCities.includes(city.name)}
                    >
                      {city.name}
                    </option>
                  ))
                ) : null}
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input type="text" value={selectedPickupPincode} readOnly style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="date"
                value={pickupdate}
                onChange={(e) => setPickupDate(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="time"
                value={pickuptime}
                onChange={(e) => setPickupTime(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          </div>
          <h2>Drop</h2>
          <div id='drop'>
            <div style={{ marginBottom: '15px' }}>
              <select
                value={selectedDropState}
                onChange={(e) => handleStateChange(e.target.value, 'Drop')}
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <select
                value={selectedDropCity}
                onChange={(e) => handleCityChange(e.target.value, 'Drop')}
                onClick={() => handleCityExclusion(selectedPickupCity, 'Drop')}
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">Select a city</option>
                {selectedDropState && cities[selectedDropState] ? (
                  cities[selectedDropState].map((city) => (
                    <option
                      key={city.name}
                      value={city.name}
                      disabled={excludedCities.includes(city.name)}
                    >
                      {city.name}
                    </option>
                  ))
                ) : null}
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input type="text" value={selectedDropPincode} readOnly style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="date"
                value={dropdate}
                onChange={(e) => setDropDate(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="time"
                value={droptime}
                onChange={(e) => setDropTime(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <Button onClick={calculateFare} style={{ marginBottom: '15px' }}>Calculate Fare</Button>
            <div>
              <p>Fare: {fare !== null ? `₹${fare}` : 'N/A'}</p>
            </div>
          </div>
          <Button type="submit" style={{ marginTop: '20px' }}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default RideDetails;
