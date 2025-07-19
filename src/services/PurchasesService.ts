import api from './api';

export interface Supplier {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
}

export interface Item {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Purchases {
  id: number;
  supplier_id: number;
  total: number;
  created_at: string;
  supplier: {
    id: number;
    name: string;
  };
  detail: PurchaseDetails[];
}

export interface PurchaseDetails {
  id: number;
  product_id: number;
  product: {
    id: number;
    name: string;
  };
  quantity: number;
  price: number;
  subtotal: number;
}

export const getSuplliers = async (): Promise<Supplier[]> => {
  const response = await api.get('supplier');
  return response.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('products');
  return response.data;
};

export const getPurchases = async (): Promise<Purchases[]> => {
  const response = await api.get('purchases');
  return response.data;
};

export const simpanPembelian = async (supplier_id: number, items: Item[]): Promise<void> => {
  await api.post('purchases', { supplier_id, items });
};

export const getPurchasesById = async (id: number): Promise<Purchases> => {
  const response = await api.get(`purchases/${id}`);
  return response.data;
};

export const updatePurchases = async (
  id: number,
  supplier_id: number,
  items: Item[]
): Promise<void> => {
  const response = await api.put(`purchases/${id}`, { supplier_id, items });
  return response.data;
};

export const deletePurchases = async (id: number): Promise<void> => {
  await api.delete(`purchases/${id}`);
};
