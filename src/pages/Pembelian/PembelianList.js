import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { deletePurchases, getPurchases } from '../../services/PurchasesService';
import { Link } from 'react-router-dom';
import { getProduct } from '../../services/ProductServices';
import Swal from 'sweetalert2';
export default function PembelianList() {
    const [Pembelian, setPembelian] = useState([]);
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetchPurchases();
    }, []);
    const fetchPurchases = async () => {
        setLoading(true);
        try {
            const purc = await getPurchases();
            const prod = await getProduct();
            console.log('Data dari getPurchases():', purc);
            setPembelian(purc);
            setProduct(prod);
        }
        catch (err) {
            console.error('Error fetching purchases:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const filteredPurchases = Pembelian.filter((pembelian) => pembelian.supplier && pembelian.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const getProductName = (product_id) => {
        const product = products.find((p) => p.id === product_id);
        return product ? product.name : 'Produk tidak diketahui';
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Yakin hapus?',
            text: 'Data pembelian yang dihapus tidak bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deletePurchases(id);
                    Swal.fire('Terhapus!', 'Data pembelian telah dihapus.', 'success');
                    // Refresh data
                    fetchPurchases(); // asumsi kamu punya fungsi ini
                }
                catch (error) {
                    Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus', 'error');
                }
            }
        });
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-[60vh]", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-gray-600 font-medium", children: "Memuat data Pembelian..." })] }) }));
    }
    return (_jsx("div", { className: "animate-fade-in", children: _jsxs("div", { className: "p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 tracking-tight", children: "\uD83D\uDED2 Daftar Pembelian" }), _jsx(Link, { to: "/PembelianFrom", className: "inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all", children: "+ Tambah Pembelian" })] }), _jsx("div", { className: "mb-6", children: _jsx("input", { type: "text", placeholder: "\uD83D\uDD0D Cari nama supplier...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full sm:w-1/3 px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" }) }), _jsx("div", { className: "hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white ring-1 ring-gray-200", children: _jsxs("table", { className: "min-w-[700px] w-full text-sm text-gray-700", children: [_jsx("thead", { className: "bg-gray-100 text-gray-800 text-left text-sm uppercase", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "Nama Supplier" }), _jsx("th", { className: "px-6 py-4", children: "Tanggal" }), _jsx("th", { className: "px-6 py-4", children: "Nama Produk" }), _jsx("th", { className: "px-6 py-4", children: "Quantity" }), _jsx("th", { className: "px-6 py-4", children: "Harga Beli" }), _jsx("th", { className: "px-6 py-4", children: "Total" }), _jsx("th", { className: "px-6 py-4", children: "Aksi" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100", children: filteredPurchases.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center py-8 text-gray-400", children: "Tidak ada data pembelian ditemukan." }) })) : (filteredPurchases.flatMap((pembelian) => pembelian.detail.map((detail) => (_jsxs("tr", { className: "hover:bg-gray-50 transition duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: pembelian.supplier ? pembelian.supplier.name : 'Supplier tidak diketahui' }), _jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: new Date(pembelian.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            }) }), _jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: getProductName(detail.product_id) }), _jsx("td", { className: "px-6 py-4", children: detail.quantity }), _jsxs("td", { className: "px-6 py-4", children: ["Rp ", detail.price.toLocaleString()] }), _jsxs("td", { className: "px-6 py-4 text-green-700 font-semibold", children: ["Rp ", (detail.quantity * detail.price).toLocaleString()] }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex gap-3", children: [_jsx(Link, { to: `/Pembelianedit/${pembelian.id}`, className: "text-blue-600 hover:underline font-semibold", children: "Edit" }), _jsx("button", { onClick: () => handleDelete(pembelian.id), className: "text-red-600 hover:underline font-semibold", children: "Hapus" })] }) })] }, detail.id))))) })] }) }), _jsx("div", { className: "block md:hidden space-y-4 mt-4", children: filteredPurchases.length === 0 ? (_jsx("p", { className: "text-center text-gray-400 py-6", children: "Tidak ada data pembelian tersedia." })) : (filteredPurchases.map((pembelian) => (_jsxs("div", { className: "bg-white shadow-md rounded-2xl p-5 space-y-3 border border-gray-100", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: pembelian.supplier?.name ?? 'Supplier tidak diketahui' }), _jsxs("p", { className: "text-gray-500 text-sm", children: ["Tanggal:", ' ', new Date(pembelian.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })] }), pembelian.detail.map((detail) => (_jsxs("div", { className: "text-sm text-gray-700 space-y-1", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Produk:" }), ' ', getProductName(detail.product_id)] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Quantity:" }), " ", detail.quantity] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Harga Beli:" }), " Rp", ' ', detail.price.toLocaleString()] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Subtotal:" }), " Rp", ' ', (detail.quantity * detail.price).toLocaleString()] }), _jsx("hr", { className: "my-2 border-gray-200" })] }, detail.id))), _jsxs("p", { className: "text-green-700 font-semibold", children: ["Total: Rp ", pembelian.total.toLocaleString()] }), _jsxs("div", { className: "flex gap-6 pt-3 border-t border-gray-100", children: [_jsx(Link, { to: `/Pembelianedit/${pembelian.id}`, className: "text-blue-600 hover:underline font-medium", children: "Edit" }), _jsx("button", { onClick: () => handleDelete(pembelian.id), className: "text-red-600 hover:underline font-medium", children: "Hapus" })] })] }, pembelian.id)))) })] }) }));
}
