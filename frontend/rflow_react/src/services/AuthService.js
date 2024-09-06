import axios from 'axios';

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

export { refreshToken };
