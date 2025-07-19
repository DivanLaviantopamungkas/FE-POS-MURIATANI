import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Category/AddEditCategory.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
export default function AddEditCategory() {
    const [category, setName] = useState({
        name: "",
    });
    //   const navigate = useNavigate();
    const handleChange = (e) => {
        setName({ ...category, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/category', category);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Kategori berhasil ditambahkan',
                timer: 2000,
                showConfirmButton: false,
            });
            setName({ name: '' });
        }
        catch (error) {
            console.error('Gagal menyimpan kategori:', error);
            // Error Alert
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat menyimpan kategori',
            });
        }
    };
    return (_jsxs("div", { className: "max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Tambah / Edit Kategori" }), _jsx(Link, { to: "/category" // Ganti sesuai dengan rute daftar kategori kamu
                        , className: "text-sm text-green-600 hover:underline hover:text-green-700", children: "\u2190 Kembali" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Nama Kategori" }), _jsx("input", { type: "text", name: "name", value: category.name, onChange: handleChange, placeholder: "Masukkan Kategori", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition", required: true })] }), _jsx("div", { className: "text-right", children: _jsx("button", { type: "submit", className: "bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded", children: "Simpan" }) })] })] }));
}
