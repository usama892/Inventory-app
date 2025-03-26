import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');  // Redirect to login page
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <h3>My E-commerce App</h3>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
