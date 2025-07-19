import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "../../services/ProductServices";
const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        category_id: "",
        price: "",
        description: "",
    });
    // const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cats] = await Promise.all([getCategories()]);
                setCategories(cats);
            }
            catch (error) {
                console.error("Gagal load data", error);
            }
        };
        fetchData();
    }, []);
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name.trim() || !product.category_id.trim() || !product.price.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Form belum lengkap',
                text: 'Harap isi semua field sebelum menyimpan.',
            });
            return; // stop eksekusi submit kalau validasi gagal
        }
        try {
            await createProduct(product);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Produk berhasil ditambahkan',
                timer: 2000,
                showConfirmButton: false,
            });
            setProduct({
                name: "",
                category_id: "",
                price: "",
                description: "",
            });
        }
        catch (error) {
            console.error("Gagal Menambahkan Produk", error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat menyimpan produk',
            });
        }
    };
    return (_jsxs("div", { className: "max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Tambah Produk" }), _jsx(Link, { to: "/product" // Ganti dengan route tujuanmu
                        , className: "text-sm text-green-600 hover:underline hover:text-green-700", children: "\u2190 Kembali ke Daftar" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Nama Produk" }), _jsx("input", { type: "text", name: "name", value: product.name, onChange: handleChange, placeholder: "Masukkan nama produk", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Kategori" }), _jsxs("select", { name: "category_id", value: product.category_id, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition", children: [_jsx("option", { value: "", disabled: true, children: "-- Pilih Kategori --" }), categories.map(cat => (_jsx("option", { value: Number(cat.id), children: cat.name }, Number(cat.id))))] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: _jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Harga (Rp)" }), _jsx("input", { type: "number", name: "price", value: product.price, onChange: handleChange, placeholder: "0", min: "0", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" })] }) }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Deskripsi" }), _jsx("textarea", { name: "description", value: product.description, onChange: handleChange, rows: 4, placeholder: "Deskripsikan produk", className: "w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" })] }), _jsx("div", { className: "text-right", children: _jsx("button", { type: "submit", className: "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition", children: "Simpan" }) })] })] }));
};
export default AddProduct;
