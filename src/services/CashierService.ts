import api from './api';

interface CartItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export const initCsrf = async () => {
  await api.get('/sanctum/csrf-cookie');
};

export const getCart = () => api.get('/cart');

export const addToCart = async (productId: number) => {
  await initCsrf(); // pastikan dapat token dulu
  return api.post('/cart/add', { product_id: productId });
};

export const updateCart = async (cart: CartItem[]) => {
  await initCsrf();
  return api.post('/cart/update', { cart });
};

export const removeCart = (productId: number) => {
  return api.post('/cart/remove', { product_id: productId });
};

export const clearCart = () => {
  return api.post('/cart/clear');
};

export const checkout = (data: {
  customer_id: number | null;
  paid_amount: number;
  payment_method: string;
}) => api.post('/checkout', data);
