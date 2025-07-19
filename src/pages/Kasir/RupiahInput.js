import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const formatRupiah = (value) => `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
const RupiahInput = ({ label = 'Jumlah Bayar', placeholder = 'Rp 0', value = 0, onValueChange, }) => {
    const [displayValue, setDisplayValue] = useState(formatRupiah(value));
    const handleChange = (e) => {
        const raw = e.target.value.replace(/[^\d]/g, ''); // hapus semua non-digit
        const numeric = parseInt(raw || '0', 10);
        setDisplayValue(formatRupiah(numeric));
        onValueChange(numeric); // kirim ke parent
    };
    return (_jsxs("div", { children: [_jsx("label", { htmlFor: "rupiah-input", className: "block mb-2 font-semibold text-gray-800", children: label }), _jsx("input", { id: "rupiah-input", type: "text", value: displayValue, onChange: handleChange, className: "w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500", placeholder: placeholder })] }));
};
export default RupiahInput;
