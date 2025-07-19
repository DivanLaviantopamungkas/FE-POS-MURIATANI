import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { createSupplier } from '../../services/SupplierServices';
const AddSupplier = () => {
    const [supplier, setSupplier] = useState({
        name: "",
        phone: "",
        address: ""
    });
    const handleChange = (e) => {
        setSupplier({ ...supplier, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!supplier.name.trim() || !supplier.phone.trim() || !supplier.address.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Form belum lengkap',
                text: 'Harap isi semua field sebelum menyimpan.',
            });
            return; // stop eksekusi submit kalau validasi gagal
        }
        try {
            await createSupplier(supplier);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Suplier berhasil ditambahkan',
                timer: 2000,
                showConfirmButton: false,
            });
            setSupplier({ name: '', phone: '', address: '' });
        }
        catch (error) {
            console.error('Gagal menyimpan Suplier:', error);
            // Error Alert
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat menyimpan Suplier',
            });
        }
    };
    return (_jsxs("div", { className: "max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Tambah Supplier" }), _jsx(Link, { to: "/supplier" // Ganti dengan route tujuanmu
                        , className: "text-sm text-green-600 hover:underline hover:text-green-700", children: "\u2190 Kembali ke Daftar" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Nama Supplier" }), _jsx("input", { type: "text", name: "name", value: supplier.name, onChange: handleChange, placeholder: "Masukkan nama supplier", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Nomor Telepon" }), _jsx("input", { type: "text", name: "phone", value: supplier.phone, onChange: handleChange, placeholder: "Masukkan nomor telepon", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2 font-medium text-gray-700", children: "Alamat" }), _jsx("textarea", { name: "address", value: supplier.address, onChange: handleChange, placeholder: "Masukkan alamat", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition", rows: 3 })] }), _jsx("div", { className: "text-right", children: _jsx("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded", children: "Simpan" }) })] })] }));
};
export default AddSupplier;
