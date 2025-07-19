import api from './api';
export const getTransac = async () => {
    const response = await api.get('/penjualan');
    return response.data;
};
