import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { getCategories } from "../../services/ProductServices";
import { createCategory } from "../../services/CategoriesServices";
function category() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState({ name: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory(category);
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Kategori berhasil ditambahkan",
                timer: 2000,
                showConfirmButton: false,
            });
            // Update daftar kategori lokal (opsional)
            // setFilteredCategories([...filteredCategories, res.data]);
            // Reset form dan tutup modal
            setCategory({ name: "" });
            setIsModalOpen(false);
        }
        catch (error) {
            console.error("Gagal menyimpan kategori:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Terjadi kesalahan saat menyimpan kategori",
            });
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [cat] = await Promise.all([getCategories()]);
                setCategories(cat);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-[60vh]", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-gray-600 font-medium", children: "Memuat data kategory..." })] }) }));
    }
    return (_jsxs("div", { className: "animate-fade-in", children: [_jsxs("div", { className: "p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 tracking-tight", children: "\uD83D\uDCC1 Daftar Kategori" }), _jsx("button", { onClick: () => setIsModalOpen(true), className: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition w-full sm:w-auto", children: "+ Tambah Kategori" })] }), _jsx("div", { className: "mb-6", children: _jsx("input", { type: "text", placeholder: "\uD83D\uDD0D Cari kategori...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full sm:w-1/3 px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" }) }), _jsx("div", { className: "overflow-x-auto bg-white shadow-xl rounded-2xl ring-1 ring-gray-200", children: _jsxs("table", { className: "min-w-full text-sm text-gray-700", children: [_jsx("thead", { className: "bg-gray-50 text-gray-800 uppercase text-left font-semibold text-sm", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "ID" }), _jsx("th", { className: "px-6 py-4", children: "Nama" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100", children: filteredCategories.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 2, className: "text-center py-8 text-gray-400", children: "Tidak ada kategori ditemukan." }) })) : (filteredCategories.map((cat) => (_jsxs("tr", { className: "hover:bg-gray-50 transition duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: cat.id }), _jsx("td", { className: "px-6 py-4", children: cat.name })] }, cat.id)))) })] }) })] }), isModalOpen && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4", children: _jsxs("div", { className: "bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-100", children: [_jsxs("div", { className: "flex justify-between items-center mb-5", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "\u270F\uFE0F Tambah Kategori" }), _jsx("button", { onClick: () => setIsModalOpen(false), className: "text-gray-500 hover:text-gray-700 text-2xl font-bold", children: "\u00D7" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "text", name: "name", value: category.name, onChange: handleChange, placeholder: "Masukkan nama kategori", className: "w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm", required: true }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { type: "button", onClick: () => setIsModalOpen(false), className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition", children: "Batal" }), _jsx("button", { type: "submit", className: "px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition", children: "Simpan" })] })] })] }) }))] }));
}
export default category;
