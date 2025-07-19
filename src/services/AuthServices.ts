import api from './api';
import CartApi from './CartApi';
import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface user {
  id: number;
  name: string;
  email: string;
  role: 'manager' | 'kasir';
}

interface LoginResponse {
  user: user;
}

export const getCsrfCookie = () => api.get('/sanctum/csrf-cookie');

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
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
