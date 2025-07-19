import api from './api';
export const getCategories = async () => {
    const response = await api.get('/category');
    return response.data;
};
export const getProduct = async () => {
    const response = await api.get('/products');
    return response.data;
};
export const createProduct = async (data) => {
    const response = await api.post('/products', data);
    return response.data;
};
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};
// Update product
export const updateProduct = async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
};
export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
    catch (err) {
        throw err;
    }
};
