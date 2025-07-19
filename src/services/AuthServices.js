import api from './api';
export const getCsrfCookie = () => api.get('/sanctum/csrf-cookie');
export const login = async (payload) => {
    await getCsrfCookie(); // penting
    const response = await api.post('/login', payload);
    const user = response.data.user;
    // Simpan user jika perlu (opsional)
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
};
export const getUser = async () => {
    const response = await api.get('/user');
    return response.data;
};
export const logout = async () => {
    await api.post('/logout');
};
