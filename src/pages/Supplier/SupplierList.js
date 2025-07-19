import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSuppliers } from '../../services/SupplierServices';
const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [sup] = await Promise.all([getSuppliers()]);
                setSuppliers(sup);
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
    const filteredSuppliers = suppliers.filter((SupplierList) => SupplierList.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-[60vh]", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-gray-600 font-medium", children: "Memuat data Supplier..." })] }) }));
    }
    return (_jsxs("div", { className: "p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 tracking-tight", children: "\uD83E\uDDFE Daftar Supplier" }), _jsx(Link, { to: "/addsupplier", className: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition w-full sm:w-auto text-center", children: "+ Tambah Supplier" })] }), _jsx("div", { className: "mb-6", children: _jsx("input", { type: "text", placeholder: "\uD83D\uDD0D Cari supplier...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full sm:w-1/3 px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" }) }), _jsx("div", { className: "overflow-x-auto bg-white shadow-xl rounded-2xl ring-1 ring-gray-200", children: _jsxs("table", { className: "min-w-full text-sm text-gray-700", children: [_jsx("thead", { className: "bg-gray-50 text-gray-800 uppercase text-left font-semibold text-sm", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "ID" }), _jsx("th", { className: "px-6 py-4", children: "Nama Supplier" }), _jsx("th", { className: "px-6 py-4", children: "Nomor HP" }), _jsx("th", { className: "px-6 py-4", children: "Alamat" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100", children: filteredSuppliers.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "text-center py-8 text-gray-400", children: "Tidak ada supplier ditemukan." }) })) : (filteredSuppliers.map((supplier) => (_jsxs("tr", { className: "hover:bg-gray-50 transition duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: supplier.id }), _jsx("td", { className: "px-6 py-4", children: supplier.name }), _jsx("td", { className: "px-6 py-4", children: supplier.phone }), _jsx("td", { className: "px-6 py-4", children: supplier.address })] }, supplier.id)))) })] }) })] }));
};
export default SupplierList;
