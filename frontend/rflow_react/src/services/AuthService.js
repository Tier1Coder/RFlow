import axios from 'axios';
import axiosInstance from './axiosInstance';

/**
 * Refreshes the access token using the refresh token stored in localStorage.
 * 
 * @returns {Promise<string>} The new access token.
 * @throws Will throw an error if the token refresh fails.
 */
const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/refresh/`, {
            refresh,
        });
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        return access;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

/**
 * Handles user login.
 * 
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @returns {Promise<string>} The access token.
 * @throws Will throw an error if the login fails.
 */
const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/api/token/', {
            username,
            password,
        });
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        return access;
    } catch (error) {
        console.error('Login failed', error);
        throw new Error('Login failed. Please check your credentials.');
    }
};

export { refreshToken, login };
