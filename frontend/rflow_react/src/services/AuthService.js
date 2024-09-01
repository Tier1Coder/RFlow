import axios from 'axios';

const login = async () => {
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/`, {
            username,
            password,
        });
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

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

export { login, refreshToken };
