import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getSuplliers, simpanPembelian, } from '../../services/PurchasesService';
import { getProduct } from '../../services/ProductServices';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
export default function PembelianForm() {
    const MySwal = withReactContent(Swal);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [supplierId, setSupplierId] = useState('');
    const [items, setItems] = useState([{ product_id: 0, quantity: 0, price: 0 }]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        (async () => {
            setSuppliers(await getSuplliers());
            setProducts(await getProduct());
        })();
    }, []);
    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] =
            field === 'product_id' || field === 'price' || field === 'quantity' ? Number(value) : value;
        setItems(newItems);
    };
    const addItem = () => {
        setItems([...items, { product_id: 0, quantity: 0, price: 0 }]);
    };
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };
    const handleSubmit = async () => {
        setLoading(true);
        try {
            await simpanPembelian(Number(supplierId), items);
            await MySwal.fire({
                title: 'Sukses!',
                text: 'Pembelian berhasil disimpan.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            setSupplierId('');
            setItems([{ product_id: 0, quantity: 0, price: 0 }]);
        }
        catch (err) {
            await MySwal.fire({
                title: 'Gagal!',
                text: err.response?.data?.message || 'Terjadi kesalahan.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const getSubTotal = (item) => item.quantity * item.price;
    const getTotal = () => items.reduce((sum, item) => sum + getSubTotal(item), 0);
    return (_jsxs("div", { className: "px-4 py-8 sm:px-8 lg:px-12 max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200 space-y-8", children: [_jsx("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: _jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2", children: "\uD83D\uDED2 Form Pembelian" }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-600 mb-1", children: "Pilih Supplier" }), _jsxs("select", { className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500", value: supplierId, onChange: (e) => setSupplierId(Number(e.target.value)), children: [_jsx("option", { value: "", children: "-- Pilih Supplier --" }), suppliers.map((s) => (_jsx("option", { value: s.id, children: s.name }, s.id)))] })] }), _jsx("div", { className: "space-y-5", children: items.map((item, index) => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-5 shadow-sm hover:shadow-md transition-all", children: [_jsx("div", { className: "md:col-span-5", children: _jsxs("select", { className: "w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm", value: item.product_id, onChange: (e) => handleItemChange(index, 'product_id', e.target.value), children: [_jsx("option", { value: "", children: "-- Pilih Produk --" }), products.map((p) => (_jsx("option", { value: p.id, children: p.name }, p.id)))] }) }), _jsx("div", { className: "md:col-span-2", children: _jsx("input", { type: "number", min: 1, className: "w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm", placeholder: "Qty", value: item.quantity, onChange: (e) => handleItemChange(index, 'quantity', e.target.value) }) }), _jsx("div", { className: "md:col-span-2", children: _jsx("input", { type: "number", min: 0, className: "w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm", placeholder: "Harga", value: item.price, onChange: (e) => handleItemChange(index, 'price', e.target.value) }) }), _jsxs("div", { className: "md:col-span-3 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 text-sm", children: [_jsxs("span", { className: "text-gray-800 font-semibold", children: ["Rp ", getSubTotal(item).toLocaleString()] }), items.length > 1 && (_jsx("button", { onClick: () => removeItem(index), className: "text-red-500 hover:underline", children: "Hapus" }))] })] }, index))) }), _jsx("div", { className: "text-center", children: _jsx("button", { onClick: addItem, className: "text-blue-600 font-semibold text-sm hover:underline", children: "+ Tambah Produk" }) }), _jsx("div", { className: "flex justify-end border-t pt-6", children: _jsxs("div", { className: "text-right text-xl font-bold text-gray-900", children: ["Total: Rp ", getTotal().toLocaleString()] }) }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: handleSubmit, disabled: loading, className: "inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:from-green-600 hover:to-green-700 transition disabled:opacity-50", children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin h-5 w-5 text-white", viewBox: "0 0 24 24", fill: "none", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v8H4z" })] }), "Menyimpan..."] })) : (_jsx(_Fragment, { children: "\uD83D\uDCBE Simpan Pembelian" })) }) })] }));
}
