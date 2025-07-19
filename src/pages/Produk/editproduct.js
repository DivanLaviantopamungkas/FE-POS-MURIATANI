import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { getCategories, getProductById, updateProduct, } from '../../services/ProductServices';
import { useParams } from 'react-router';
function editproduct() {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        id: null,
        name: '',
        category_id: '',
        price: '',
        description: '',
    });
    const { id } = useParams();
    if (!id || isNaN(Number(id))) {
        return _jsxs("div", { children: ["Invalid product id: ", id] });
    }
    useEffect(() => {
        if (!id || isNaN(Number(id))) {
            console.error('Invalid product id:', id);
            return;
        }
        const fetchData = async () => {
            try {
                const [cats, existingProduct] = await Promise.all([
                    getCategories(),
                    id ? getProductById(Number(id)) : Promise.resolve(null),
                ]);
                setCategories(cats);
                if (existingProduct) {
                    setProduct({
                        id: existingProduct.id,
                        name: existingProduct.name,
                        category_id: String(existingProduct.category_id),
                        price: String(existingProduct.price),
                        description: existingProduct.description || '',
                    });
                }
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);
    console.log('product state:', product);
    console.log('categories:', categories);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name.trim() || !product.category_id.trim() || !product.price.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Form belum lengkap',
                text: 'Harap isi semua field sebelum menyimpan.',
            });
            return;
        }
        try {
            const payload = {
                name: product.name,
                category_id: Number(product.category_id),
                price: Number(product.price),
                description: product.description,
            };
            if (!product.id) {
                throw new Error('ID produk tidak tersedia');
            }
            await updateProduct(product.id, payload);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Produk berhasil diperbarui',
                timer: 2000,
                showConfirmButton: false,
            });
        }
        catch (error) {
            console.error('Gagal Menyimpan Produk', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat menyimpan produk',
            });
        }
    };
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };
    return (_jsxs("div", { className: "max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Tambah Produk" }), _jsx(Link, { to: "/product", className: "text-sm text-green-600 hover:underline hover:text-green-700", children: "\u2190 Kembali ke Daftar" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Nama Produk" }), _jsx("input", { type: "text", name: "name", value: product.name, onChange: handleChange, placeholder: "Masukkan nama produk", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Kategori" }), _jsxs("select", { name: "category_id", value: product.category_id, onChange: handleChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition", children: [_jsx("option", { value: "", disabled: true, children: "-- Pilih Kategori --" }), categories.map((cat) => (_jsx("option", { value: cat.id, children: cat.name }, cat.id)))] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: _jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Harga (Rp)" }), _jsx("input", { type: "number", name: "price", value: product.price, onChange: handleChange, placeholder: "0", min: "0", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" })] }) }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Deskripsi" }), _jsx("textarea", { name: "description", value: product.description, onChange: handleChange, rows: 4, placeholder: "Deskripsikan produk", className: "w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition" })] }), _jsx("div", { className: "text-right", children: _jsx("button", { type: "submit", className: "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition", children: "Simpan" }) })] })] }));
}
export default editproduct;
