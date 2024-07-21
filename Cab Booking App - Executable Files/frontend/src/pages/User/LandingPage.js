import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import SearchBar from '../../components/SearchBar';
import CarCard from '../../components/CarCard';
import Home from '../../components/Home'
import About from '../../components/About'
import Donate from '../../components/Donate';
import Footer from '../../components/Footer';

const LandingPage = () => {
  const [cars, setCars] = useState([]);
  const [searchCarName, setSearchCarName] = useState('');
  const [searchCarType, setSearchCarType] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [sortPriceAscending, setSortPriceAscending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:8000/cabs');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars: ', error);
      }
    }
    fetchCars();
  }, []);

  const handleSortPrice = () => {
    setSortPriceAscending(!sortPriceAscending);
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (sortPriceAscending) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const filteredCars = sortedCars.filter((car) => {
    const carNameMatches = car.carname.toLowerCase().includes(searchCarName.toLowerCase());
    const carTypeMatches = car.cartype.toLowerCase().includes(searchCarType.toLowerCase());
    const priceMatches = car.price.toString().includes(searchPrice);

    return carNameMatches && carTypeMatches && priceMatches;
  });

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar style={{ position: 'sticky', top: '0', zIndex: '100', backgroundColor: '#ffffff' }} />
      <div id="home-section">
        <Home/>
      </div>
      <div id="ride-section" className="container-fluid car-list" style={{ padding: '20px' }}>
        <h1 className="text-center mt-4 mb-4">Available Cabs</h1>
        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <SearchBar
              searchCarName={searchCarName}
              setSearchCarName={setSearchCarName}
              searchCarType={searchCarType}
              setSearchCarType={setSearchCarType}
              sortPriceAscending={sortPriceAscending}
              handleSortPrice={handleSortPrice}
            />
          </div>
        </div>
        <div className="row">
          {filteredCars.map((car) => (
            <div className="col-lg-4 col-md-6 mb-4" key={car._id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
      <div id="about-section">
        <About></About>
      </div>
      <div id="donate-section">
          <Donate></Donate>
      </div>
      <div id="services-section">
        <Footer></Footer>
        </div>
    </div>
  );
}

export default LandingPage;
