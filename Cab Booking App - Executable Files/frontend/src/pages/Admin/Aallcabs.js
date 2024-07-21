import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import AcarCard from '../../components/AcarCard';
import { useNavigate } from 'react-router-dom';

function Aallcabs() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [searchCarName, setSearchCarName] = useState('');
    const [searchCarType, setSearchCarType] = useState('');
    const [searchPrice, setSearchPrice] = useState('');
    const [sortPriceAscending, setSortPriceAscending] = useState(true);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/deleteCar/${id}`);
            setCars(cars.filter(car => car._id !== id));
            alert('Car deleted successfully');
        } catch (error) {
            alert('error deleting')
            console.error('Error deleting car:', error);
        }
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
        <div style={{ backgroundColor: 'rgb(0,123,255)'}}>
            <div className="container car-list" style={{ backgroundColor: '#f8f9fa' }}>
                <h1 className="text-center mt-4 mb-4">All Cabs</h1>
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
                <div className="container">
                    <div className="row">
                        {filteredCars.map((car) => (
                            <div className="col-md-4 mb-4" key={car._id}>
                                <AcarCard car={car} handleDelete={handleDelete} />
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => navigate(-1)} style={{ display: 'block', margin: '20px auto', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px' }}>Go Back</button>
            </div>
        </div>
    );
}

export default Aallcabs;
