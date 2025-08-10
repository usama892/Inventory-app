import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CustomerDashboard from './components/CustomerDashboard';
import SellerDashboard from './components/SellerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
    const role = localStorage.getItem('role');

    return (
        <>
         <Navbar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/customer-dashboard" element={
                    <ProtectedRoute>
                        {role === 'customer' ? <User /> : <Navigate to="/login" />}
                    </ProtectedRoute>
                } />
                <Route path="/seller-dashboard" element={
                    <ProtectedRoute>
                        {role === 'seller' ? <Admin /> : <Navigate to="/login" />}
                    </ProtectedRoute>
                } />
            </Routes>
            </>
    );
};

export default App;
