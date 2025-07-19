import React, { useEffect, useState } from 'react';
import {
  getSuplliers,
  Item,
  Product,
  simpanPembelian,
  Supplier,
} from '../../services/PurchasesService';
import { getProduct } from '../../services/ProductServices';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function PembelianForm() {
  const MySwal = withReactContent(Swal);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [supplierId, setSupplierId] = useState<number | ''>('');
  const [items, setItems] = useState<Item[]>([{ product_id: 0, quantity: 0, price: 0 }]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      setSuppliers(await getSuplliers());
      setProducts(await getProduct());
    })();
  }, []);

  const handleItemChange = (index: number, field: keyof Item, value: any) => {
    const newItems = [...items];
    newItems[index][field] =
      field === 'product_id' || field === 'price' || field === 'quantity' ? Number(value) : value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { product_id: 0, quantity: 0, price: 0 }]);
  };

  const removeItem = (index: number) => {
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
    } catch (err: any) {
      await MySwal.fire({
        title: 'Gagal!',
        text: err.response?.data?.message || 'Terjadi kesalahan.',
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
      });
    } finally {
      setLoading(false);
    }
  };

  const getSubTotal = (item: Item) => item.quantity * item.price;
  const getTotal = () => items.reduce((sum, item) => sum + getSubTotal(item), 0);

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12 max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          🛒 Form Pembelian
        </h2>
      </div>

      {/* Supplier */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Pilih Supplier</label>
        <select
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={supplierId}
          onChange={(e) => setSupplierId(Number(e.target.value))}
        >
          <option value="">-- Pilih Supplier --</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Items */}
      <div className="space-y-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-5 shadow-sm hover:shadow-md transition-all"
          >
            {/* Produk */}
            <div className="md:col-span-5">
              <select
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={item.product_id}
                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
              >
                <option value="">-- Pilih Produk --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Qty */}
            <div className="md:col-span-2">
              <input
                type="number"
                min={1}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              />
            </div>

            {/* Harga */}
            <div className="md:col-span-2">
              <input
                type="number"
                min={0}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Harga"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              />
            </div>

            {/* Subtotal + Hapus */}
            <div className="md:col-span-3 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 text-sm">
              <span className="text-gray-800 font-semibold">
                Rp {getSubTotal(item).toLocaleString()}
              </span>
              {items.length > 1 && (
                <button onClick={() => removeItem(index)} className="text-red-500 hover:underline">
                  Hapus
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tambah Item */}
      <div className="text-center">
        <button onClick={addItem} className="text-blue-600 font-semibold text-sm hover:underline">
          + Tambah Produk
        </button>
      </div>

      {/* Total */}
      <div className="flex justify-end border-t pt-6">
        <div className="text-right text-xl font-bold text-gray-900">
          Total: Rp {getTotal().toLocaleString()}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:from-green-600 hover:to-green-700 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Menyimpan...
            </>
          ) : (
            <>💾 Simpan Pembelian</>
          )}
        </button>
      </div>
    </div>
  );
}
