import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart3, ShoppingCart, Package, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardService from '../../services/DashboarService';
export default function Home() {
    const [summary, setSummary] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            try {
                const [summaryData, transactionData] = await Promise.all([
                    DashboardService.getSummary(),
                    DashboardService.getRecentTransactions(),
                ]);
                setSummary(summaryData);
                setTransactions(transactionData);
            }
            catch (err) {
                console.error('Error loading dashboard:', err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-800", children: "Dashboard" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(SummaryCard, { icon: _jsx(ShoppingCart, { className: "text-blue-600" }), title: "Total Penjualan", value: summary ? `Rp ${summary.totalPenjualan.toLocaleString()}` : 'Loading...' }), _jsx(SummaryCard, { icon: _jsx(BarChart3, { className: "text-green-600" }), title: "Transaksi Hari Ini", value: summary ? `${summary.totalPenjualanHariIni} Transaksi` : 'Loading...' }), _jsx(SummaryCard, { icon: _jsx(Package, { className: "text-yellow-600" }), title: "Stok Produk", value: summary ? `${summary.totalProduk} Produk` : 'Loading...' }), _jsx(SummaryCard, { icon: _jsx(AlertTriangle, { className: "text-red-600" }), title: "Stok Hampir Habis", value: summary ? `${summary.stock} Produk` : 'Loading...' })] }), _jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-md", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Grafik Penjualan Bulanan" }), _jsx("div", { className: "h-40 flex items-center justify-center text-gray-400 italic", children: "(Chart placeholder - nanti bisa pakai Recharts / Chart.js)" })] }), _jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-md", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Transaksi Terbaru" }), _jsx("div", { className: "overflow-x-auto rounded-xl border", children: _jsxs("table", { className: "min-w-full text-sm text-left whitespace-nowrap", children: [_jsx("thead", { className: "bg-gray-100 text-gray-600 text-sm sticky top-0", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 border", children: "No" }), _jsx("th", { className: "px-4 py-3 border", children: "ID Transaksi" }), _jsx("th", { className: "px-4 py-3 border", children: "Tanggal" }), _jsx("th", { className: "px-4 py-3 border", children: "Kasir" }), _jsx("th", { className: "px-4 py-3 border", children: "Pelanggan" }), _jsx("th", { className: "px-4 py-3 border", children: "Metode" }), _jsx("th", { className: "px-4 py-3 border", children: "Total" }), _jsx("th", { className: "px-4 py-3 border", children: "Status" }), _jsx("th", { className: "px-4 py-3 border", children: "Aksi" })] }) }), _jsx("tbody", { className: "text-gray-700", children: transactions.length > 0 ? (transactions.map((item, index) => (_jsxs("tr", { className: "hover:bg-gray-50 transition", children: [_jsx("td", { className: "px-4 py-2 border text-center", children: index + 1 }), _jsx("td", { className: "px-4 py-2 border", children: item.id }), _jsx("td", { className: "px-4 py-2 border", children: item.tanggal }), _jsx("td", { className: "px-4 py-2 border", children: item.kasir }), _jsx("td", { className: "px-4 py-2 border", children: item.pelanggan }), _jsx("td", { className: "px-4 py-2 border", children: item.metode }), _jsxs("td", { className: "px-4 py-2 border text-right", children: ["Rp ", item.total.toLocaleString()] }), _jsx("td", { className: "px-4 py-2 border", children: _jsx("span", { className: `inline-block px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Lunas'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'}`, children: item.status }) }), _jsx("td", { className: "px-4 py-2 border", children: _jsx("button", { className: "text-blue-600 hover:underline text-sm", children: "Detail" }) })] }, item.id)))) : (_jsx("tr", { children: _jsx("td", { className: "px-4 py-3 text-center text-gray-400", colSpan: 9, children: "Tidak ada data transaksi" }) })) })] }) })] })] }));
}
function SummaryCard({ icon, title, value, }) {
    return (_jsxs("div", { className: "flex items-center gap-4 bg-white rounded-xl shadow p-4", children: [_jsx("div", { className: "bg-gray-100 p-3 rounded-full", children: icon }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: title }), _jsx("h3", { className: "text-lg font-bold text-gray-800", children: value })] })] }));
}
