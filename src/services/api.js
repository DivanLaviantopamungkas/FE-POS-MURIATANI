import axios from 'axios';
import Cookies from 'js-cookie';
const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
});
api.interceptors.request.use((config) => {
    const token = Cookies.get('XSRF-TOKEN');
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
});
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        // Cek apakah token ada
        if (error.response?.status === 401) {
            alert('Sesi kamu telah berakhir, silakan login kembali.');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});
export default api;
