import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { getCustomers } from "../../services/CustomersList";
const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [cus] = await Promise.all([getCustomers()]);
                setCustomers(cus);
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
    const filteredcustomer = customers.filter((customer) => customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-[60vh]", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-gray-600 font-medium", children: "Memuat data Customer..." })] }) }));
    }
    return (_jsxs("div", { className: "p-4 sm:p-6 lg:p-8", children: [_jsx("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6", children: _jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Daftar customer" }) }), _jsx("div", { className: "mb-6", children: _jsx("input", { type: "text", placeholder: "Cari supplier...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" }) }), _jsx("div", { className: "overflow-x-auto bg-white rounded-lg shadow", children: _jsxs("table", { className: "min-w-full text-sm", children: [_jsx("thead", { className: "bg-gray-100 text-gray-700 font-semibold", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left", children: "ID" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Nama customer" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Nomer Hp" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Alamat" })] }) }), _jsxs("tbody", { children: [filteredcustomer.map((customers) => (_jsxs("tr", { className: "border-t hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-3", children: customers.id }), _jsx("td", { className: "px-6 py-3", children: customers.name }), _jsx("td", { className: "px-6 py-3", children: customers.phone }), _jsx("td", { className: "px-6 py-3", children: customers.address })] }, customers.id))), filteredcustomer.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "px-6 py-4 text-center text-gray-500", children: "Tidak ada customer ditemukan." }) }))] })] }) })] }));
};
export default CustomersList;
