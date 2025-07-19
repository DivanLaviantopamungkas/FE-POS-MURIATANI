import React, { useState } from 'react';

interface RupiahInputProps {
  label?: string;
  placeholder?: string;
  value?: number;
  onValueChange: (value: number) => void;
}

const formatRupiah = (value: number) => `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;

const RupiahInput: React.FC<RupiahInputProps> = ({
  label = 'Jumlah Bayar',
  placeholder = 'Rp 0',
  value = 0,
  onValueChange,
}) => {
  const [displayValue, setDisplayValue] = useState(formatRupiah(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, ''); // hapus semua non-digit
    const numeric = parseInt(raw || '0', 10);

    setDisplayValue(formatRupiah(numeric));
    onValueChange(numeric); // kirim ke parent
  };

  return (
    <div>
      <label htmlFor="rupiah-input" className="block mb-2 font-semibold text-gray-800">
        {label}
      </label>
      <input
        id="rupiah-input"
        type="text"
        value={displayValue}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default RupiahInput;
