import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getTransac } from '../../services/TransactionService';
function Penjualan() {
    const [sale, setSale] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const tranc = await getTransac();
                setSale(tranc);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const filteredSales = sale.filter((sales) => sales.sales_detail.some((detail) => detail.product.name.toLowerCase().includes(searchTerm.toLowerCase())));
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-[60vh]", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-gray-600 font-medium", children: "Memuat data Penjualan..." })] }) }));
    }
    return (_jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Daftar Pembelian" }), _jsx("input", { type: "text", placeholder: "Cari produk dalam pembelian...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "mb-6 px-4 py-2 border rounded-md w-full max-w-md" }), filteredSales.length === 0 ? (_jsx("p", { className: "text-center text-gray-400", children: "Tidak ada pembelian yang ditemukan." })) : (filteredSales.map((sale) => (_jsxs("div", { className: "border rounded-lg p-4 shadow-sm bg-white mb-4", children: [_jsxs("p", { className: "text-gray-600 text-sm mb-1", children: ["Tanggal: ", new Date(sale.created_at).toLocaleDateString()] }), _jsxs("p", { className: "font-semibold mb-3", children: ["Total Bayar: Rp ", sale.paid_amount.toLocaleString()] }), _jsxs("p", { className: "mb-2", children: ["Metode Pembayaran: ", sale.payment_method] }), _jsx("div", { className: "divide-y divide-gray-200", children: sale.sales_detail.map((detail) => (_jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { children: detail.product.name }), _jsxs("span", { children: [detail.quantity, " x Rp ", detail.price.toLocaleString(), " = Rp", ' ', detail.subtotal.toLocaleString()] })] }, detail.id))) })] }, sale.id))))] }));
}
export default Penjualan;
