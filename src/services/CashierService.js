import api from './api';
export const initCsrf = async () => {
    await api.get('/sanctum/csrf-cookie');
};
export const getCart = () => api.get('/cart');
export const addToCart = async (productId) => {
    await initCsrf(); // pastikan dapat token dulu
    return api.post('/cart/add', { product_id: productId });
};
export const updateCart = async (cart) => {
    await initCsrf();
    return api.post('/cart/update', { cart });
};
export const removeCart = (productId) => {
    return api.post('/cart/remove', { product_id: productId });
};
export const clearCart = () => {
    return api.post('/cart/clear');
};
export const checkout = (data) => api.post('/checkout', data);
