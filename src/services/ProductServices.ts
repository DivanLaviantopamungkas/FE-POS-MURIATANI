import api from './api';

interface ProductPayload {
  name: string;
  category_id: string;
  price: string;
  description: string;
}

export interface category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  description: string;
  stock: number;
  category: category;
}

//edit
export interface Products {
  id: null;
  name: string;
  category_id: number;
  price: number;
  description?: string;
}

export interface ProductPayloads {
  name: string;
  category_id: number;
  price: number;
  description?: string;
}

export const getCategories = async (): Promise<{ id: number; name: string }[]> => {
  const response = await api.get('/category');
  return response.data;
};

export const getProduct = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (data: ProductPayload) => {
  const response = await api.post('/products', data);
  return response.data;
};

export const getProductById = async (id: number): Promise<Products> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Update product
export const updateProduct = async (id: number, data: ProductPayloads) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
