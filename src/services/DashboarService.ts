import api from './api';

export interface SummaryData {
  totalPenjualan: string;
  totalPenjualanHariIni: number;
  totalProduk: number;
  stock: number;
}

export interface TransactionData {
  id: number;
  tanggal: string;
  kasir: string;
  pelanggan: string;
  metode: string;
  total: number;
  status: string;
}

export interface MonthlySalesData {
  month: number;
  total: number;
}

const DashboardService = {
  async getSummary(): Promise<SummaryData> {
    const response = await api.get('/dashboard-summary');
    return response.data;
  },

  async getRecentTransactions(): Promise<TransactionData[]> {
    const response = await api.get('/tranksaksi-terbaru');
    return response.data;
  },

  async getMonthlySales(): Promise<MonthlySalesData[]> {
    const response = await api.get('/penjualan-perbulan');
    return response.data;
  },
};

export default DashboardService;
