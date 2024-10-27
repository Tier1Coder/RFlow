import axios from 'axios';

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

export { refreshToken };