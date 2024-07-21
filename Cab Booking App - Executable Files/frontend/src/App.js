import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Prompt from './pages/Prompt';
import Signup from './pages/User/Signup';
import Login from './pages/User/Login';
import LandingPage from './pages/User/LandingPage';
import RideDetails from './pages/User/RideDetails';
import MyAccount from './pages/User/MyAccount';
import Mybookings from './pages/User/Mybookings';
import Alogin from './pages/Admin/Alogin';
import AlandingPage from './pages/Admin/AlandingPage';
import Aalluserdetails from './pages/Admin/Aalluserdetails';
import Aallcabs from './pages/Admin/Aallcabs';
import Aallbookings from './pages/Admin/Aallbookings';
import Aaddcab from './pages/Admin/Aaddcab';
import ProtectedRoute from './components/ProtectedRoute'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Prompt />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/ride-details/:id" element={<RideDetails />} />
                <Route path="/MyAccount/:id" element={<MyAccount />} />
                <Route path="/Mybookings/:id" element={<Mybookings />} />

                <Route path="/admin/login" element={<Alogin />} />
                <Route path="/admin/landing" element={<ProtectedRoute element={<AlandingPage />} />} />
                <Route path="/admin/all-users" element={<ProtectedRoute element={<Aalluserdetails />} />} />
                <Route path="/admin/all-cabs" element={<ProtectedRoute element={<Aallcabs />} />} />
                <Route path="/admin/all-bookings" element={<ProtectedRoute element={<Aallbookings />} />} />
                <Route path="/admin/add-cab" element={<ProtectedRoute element={<Aaddcab />} />} />
            </Routes>
        </Router>
    );
}

export default App;
