import React, { useEffect, useState } from 'react';
import { deletePurchases, getPurchases, Product, Purchases } from '../../services/PurchasesService';
import { Link } from 'react-router-dom';
import { getProduct } from '../../services/ProductServices';
import Swal from 'sweetalert2';

export default function PembelianList() {
  const [Pembelian, setPembelian] = useState<Purchases[]>([]);
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const purc = await getPurchases();
      const prod = await getProduct();
      console.log('Data dari getPurchases():', purc);
      setPembelian(purc);
      setProduct(prod);
    } catch (err) {
      console.error('Error fetching purchases:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPurchases = Pembelian.filter(
    (pembelian) =>
      pembelian.supplier && pembelian.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProductName = (product_id: number): string => {
    const product = products.find((p) => p.id === product_id);
    return product ? product.name : 'Produk tidak diketahui';
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Yakin hapus?',
      text: 'Data pembelian yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePurchases(id);
          Swal.fire('Terhapus!', 'Data pembelian telah dihapus.', 'success');
          // Refresh data
          fetchPurchases(); // asumsi kamu punya fungsi ini
        } catch (error) {
          Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus', 'error');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Memuat data Pembelian...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="animate-fade-in">
      <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">🛒 Daftar Pembelian</h2>
          <Link
            to="/PembelianFrom"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all"
          >
            + Tambah Pembelian
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Cari nama supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          />
        </div>

        {/* Tabel (desktop) */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white ring-1 ring-gray-200">
          <table className="min-w-[700px] w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-800 text-left text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Nama Supplier</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Nama Produk</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Harga Beli</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    Tidak ada data pembelian ditemukan.
                  </td>
                </tr>
              ) : (
                filteredPurchases.flatMap((pembelian) =>
                  pembelian.detail.map((detail) => (
                    <tr key={detail.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {pembelian.supplier ? pembelian.supplier.name : 'Supplier tidak diketahui'}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {new Date(pembelian.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {getProductName(detail.product_id)}
                      </td>
                      <td className="px-6 py-4">{detail.quantity}</td>
                      <td className="px-6 py-4">Rp {detail.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-green-700 font-semibold">
                        Rp {(detail.quantity * detail.price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <Link
                            to={`/Pembelianedit/${pembelian.id}`}
                            className="text-blue-600 hover:underline font-semibold"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(pembelian.id)}
                            className="text-red-600 hover:underline font-semibold"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card */}
        <div className="block md:hidden space-y-4 mt-4">
          {filteredPurchases.length === 0 ? (
            <p className="text-center text-gray-400 py-6">Tidak ada data pembelian tersedia.</p>
          ) : (
            filteredPurchases.map((pembelian) => (
              <div
                key={pembelian.id}
                className="bg-white shadow-md rounded-2xl p-5 space-y-3 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {pembelian.supplier?.name ?? 'Supplier tidak diketahui'}
                </h3>
                <p className="text-gray-500 text-sm">
                  Tanggal:{' '}
                  {new Date(pembelian.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                {pembelian.detail.map((detail) => (
                  <div key={detail.id} className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium">Produk:</span>{' '}
                      {getProductName(detail.product_id)}
                    </p>
                    <p>
                      <span className="font-medium">Quantity:</span> {detail.quantity}
                    </p>
                    <p>
                      <span className="font-medium">Harga Beli:</span> Rp{' '}
                      {detail.price.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Subtotal:</span> Rp{' '}
                      {(detail.quantity * detail.price).toLocaleString()}
                    </p>
                    <hr className="my-2 border-gray-200" />
                  </div>
                ))}

                <p className="text-green-700 font-semibold">
                  Total: Rp {pembelian.total.toLocaleString()}
                </p>

                <div className="flex gap-6 pt-3 border-t border-gray-100">
                  <Link
                    to={`/Pembelianedit/${pembelian.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pembelian.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
