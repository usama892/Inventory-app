import axios from 'axios';

export const registerUser = (data) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', data);
        alert('Registration successful');
    } catch (error) {
        console.error('Registration failed', error);
    }
};

export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', data);
        console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);

        if (response.data.user.role === 'customer') {
            window.location.href = '/customer-dashboard';
        } else {
            window.location.href = '/seller-dashboard';
        }
    } catch (error) {
        console.error('Login failed', error);
    }
};
