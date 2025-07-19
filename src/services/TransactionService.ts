import api from './api';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface SaleDetail {
  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  product: Product;
}

export interface Sales {
  id: number;
  user_id: number;
  customer_id: number | null;
  total: number;
  paid_amount: number;
  change_amount: number;
  payment_method: string;
  created_at: string;
  updated_at: string;
  sales_detail: SaleDetail[];
}

export const getTransac = async (): Promise<Sales[]> => {
  const response = await api.get('/penjualan');
  return response.data;
};
