import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPurchasesById,
  getProducts,
  getSuplliers,
  updatePurchases,
  Item,
  Supplier,
  Product,
  Purchases,
} from '../../services/PurchasesService';
import Swal from 'sweetalert2';

const PembelianEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier_id, setSupplierId] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supplierData, productData, purchaseData] = await Promise.all([
          getSuplliers(),
          getProducts(),
          getPurchasesById(Number(id)),
        ]);
        setSuppliers(supplierData);
        setProducts(productData);

        setSupplierId(purchaseData.supplier_id);
        const formattedItems = purchaseData.detail.map((d) => ({
          product_id: d.product_id,
          quantity: d.quantity,
          price: d.price,
        }));
        setItems(formattedItems);
      } catch (error) {
        console.error('Gagal ambil data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] =
      field === 'product_id' || field === 'quantity' || field === 'price' ? Number(value) : value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { product_id: 0, quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePurchases(Number(id), supplier_id, items);
      setLoading(false);
      Swal.fire({
        title: 'Berhasil',
        text: 'Data pembelian berhasil diperbarui!',
        icon: 'success',
        confirmButtonText: 'Oke',
      }).then(() => navigate('/PembelianList'));
    } catch (error) {
      setLoading(false);
      Swal.fire('Gagal', 'Terjadi kesalahan saat update data', 'error');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Pembelian</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Supplier</label>
          <select
            value={supplier_id}
            onChange={(e) => setSupplierId(Number(e.target.value))}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Pilih Supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Items</label>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2 items-center">
              <select
                value={item.product_id}
                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                className="border rounded p-2"
                required
              >
                <option value="">Pilih Produk</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="border rounded p-2"
                placeholder="Jumlah"
                required
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                className="border rounded p-2"
                placeholder="Harga"
                required
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 text-sm col-span-3 text-right"
              >
                Hapus
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm mt-2"
          >
            + Tambah Item
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
};

export default PembelianEdit;
