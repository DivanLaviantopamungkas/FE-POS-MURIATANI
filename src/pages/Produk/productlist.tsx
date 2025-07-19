import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteProduct, getProduct } from '../../services/ProductServices';
import { Product } from '../../services/ProductServices';
import Swal from 'sweetalert2';

function productlist() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((products) =>
    products.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const prod = await getProduct();
      setProducts(prod);
    } catch (err) {
      console.error('Gagal memuat data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Yakin mau hapus?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
        // refresh data setelah berhasil dihapus
        fetchData();
      } catch (err) {
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Memuat data produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">🛍️ Daftar Produk</h2>
          <Link
            to="/addproduct"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all"
          >
            + Tambah Produk
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Cari produk..."
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
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    Tidak ada produk yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4">{product.category.name}</td>
                    <td className="px-6 py-4 text-green-700 font-semibold">
                      Rp {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        {product.id && (
                          <Link
                            to={`/editproduct/${product.id}`}
                            className="text-blue-600 hover:underline font-semibold"
                          >
                            Edit
                          </Link>
                        )}

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:underline font-semibold"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card */}
        <div className="block md:hidden space-y-4 mt-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-400 py-6">Tidak ada produk yang tersedia.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-2xl p-5 space-y-2 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600">
                  <span className="font-medium">Kategori:</span> {product.category.name}
                </p>
                <p className="text-green-700 font-semibold">Rp {product.price.toLocaleString()}</p>
                <p className="text-gray-700">
                  <span className="font-medium">Stok:</span> {product.stock}
                </p>
                <div className="flex gap-6 pt-3 border-t border-gray-100">
                  <Link
                    to={`/editproduct/${product.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => alert('Hapus belum diimplementasikan')}
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

export default productlist;
