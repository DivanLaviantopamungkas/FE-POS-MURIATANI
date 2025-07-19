import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteProduct, getProduct } from '../../services/ProductServices';
import Swal from 'sweetalert2';
function productlist() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredProducts = products.filter((products) => products.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const fetchData = async () => {
        setLoading(true);
        try {
            const prod = await getProduct();
            setProducts(prod);
        }
        catch (err) {
            console.error('Gagal memuat data', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Yakin mau hapus?',
            text: 'Data yang dihapus tidak bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'hapus!',
            cancelButtonText: 'Batal',
        });
        if (result.isConfirmed) {
            try {
                await deleteProduct(id);
                Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
                // refresh data setelah berhasil dihapus
                fetchData();
            }
            catch (err) {
                Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
            }
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-[60vh]", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-gray-600 font-medium", children: "Memuat data produk..." })] }) }));
    }
    return (_jsx("div", { className: "animate-fade-in", children: _jsxs("div", { className: "p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 tracking-tight", children: "\uD83D\uDECD\uFE0F Daftar Produk" }), _jsx(Link, { to: "/addproduct", className: "inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all", children: "+ Tambah Produk" })] }), _jsx("div", { className: "mb-6", children: _jsx("input", { type: "text", placeholder: "\uD83D\uDD0D Cari produk...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full sm:w-1/3 px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" }) }), _jsx("div", { className: "hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white ring-1 ring-gray-200", children: _jsxs("table", { className: "min-w-[700px] w-full text-sm text-gray-700", children: [_jsx("thead", { className: "bg-gray-100 text-gray-800 text-left text-sm uppercase", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "Nama" }), _jsx("th", { className: "px-6 py-4", children: "Kategori" }), _jsx("th", { className: "px-6 py-4", children: "Harga" }), _jsx("th", { className: "px-6 py-4", children: "Stock" }), _jsx("th", { className: "px-6 py-4", children: "Aksi" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100", children: filteredProducts.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center py-8 text-gray-400", children: "Tidak ada produk yang ditemukan." }) })) : (filteredProducts.map((product) => (_jsxs("tr", { className: "hover:bg-gray-50 transition duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: product.name }), _jsx("td", { className: "px-6 py-4", children: product.category.name }), _jsxs("td", { className: "px-6 py-4 text-green-700 font-semibold", children: ["Rp ", product.price.toLocaleString()] }), _jsx("td", { className: "px-6 py-4", children: product.stock }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex gap-3", children: [product.id && (_jsx(Link, { to: `/editproduct/${product.id}`, className: "text-blue-600 hover:underline font-semibold", children: "Edit" })), _jsx("button", { onClick: () => handleDelete(product.id), className: "text-red-600 hover:underline font-semibold", children: "Hapus" })] }) })] }, product.id)))) })] }) }), _jsx("div", { className: "block md:hidden space-y-4 mt-4", children: filteredProducts.length === 0 ? (_jsx("p", { className: "text-center text-gray-400 py-6", children: "Tidak ada produk yang tersedia." })) : (filteredProducts.map((product) => (_jsxs("div", { className: "bg-white shadow-md rounded-2xl p-5 space-y-2 border border-gray-100", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: product.name }), _jsxs("p", { className: "text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Kategori:" }), " ", product.category.name] }), _jsxs("p", { className: "text-green-700 font-semibold", children: ["Rp ", product.price.toLocaleString()] }), _jsxs("p", { className: "text-gray-700", children: [_jsx("span", { className: "font-medium", children: "Stok:" }), " ", product.stock] }), _jsxs("div", { className: "flex gap-6 pt-3 border-t border-gray-100", children: [_jsx(Link, { to: `/editproduct/${product.id}`, className: "text-blue-600 hover:underline font-medium", children: "Edit" }), _jsx("button", { onClick: () => alert('Hapus belum diimplementasikan'), className: "text-red-600 hover:underline font-medium", children: "Hapus" })] })] }, product.id)))) })] }) }));
}
export default productlist;
