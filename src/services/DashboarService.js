import api from './api';
const DashboardService = {
    async getSummary() {
        const response = await api.get('/dashboard-summary');
        return response.data;
    },
    async getRecentTransactions() {
        const response = await api.get('/tranksaksi-terbaru');
        return response.data;
    },
    async getMonthlySales() {
        const response = await api.get('/penjualan-perbulan');
        return response.data;
    },
};
export default DashboardService;
