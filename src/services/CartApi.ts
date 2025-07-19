import axios from 'axios';
import Cookies from 'js-cookie';

const cartApi = axios.create({
  baseURL: 'http://localhost:8000', // TANPA /api
  withCredentials: true, // Penting untuk session
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // optional tapi membantu Laravel mengenali request AJAX
  },
});

cartApi.interceptors.request.use((config) => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

export default cartApi;
