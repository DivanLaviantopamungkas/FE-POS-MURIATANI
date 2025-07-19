import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductById,
  updateProduct,
  ProductPayloads,
} from '../../services/ProductServices';
import { useParams } from 'react-router';

function editproduct() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [product, setProduct] = useState({
    id: null,
    name: '',
    category_id: '',
    price: '',
    description: '',
  });

  const { id } = useParams();

  if (!id || isNaN(Number(id))) {
    return <div>Invalid product id: {id}</div>;
  }

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      console.error('Invalid product id:', id);
      return;
    }
    const fetchData = async () => {
      try {
        const [cats, existingProduct] = await Promise.all([
          getCategories(),
          id ? getProductById(Number(id)) : Promise.resolve(null),
        ]);

        setCategories(cats);

        if (existingProduct) {
          setProduct({
            id: existingProduct.id,
            name: existingProduct.name,
            category_id: String(existingProduct.category_id),
            price: String(existingProduct.price),
            description: existingProduct.description || '',
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  console.log('product state:', product);
  console.log('categories:', categories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name.trim() || !product.category_id.trim() || !product.price.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Form belum lengkap',
        text: 'Harap isi semua field sebelum menyimpan.',
      });
      return;
    }

    try {
      const payload: ProductPayloads = {
        name: product.name,
        category_id: Number(product.category_id),
        price: Number(product.price),
        description: product.description,
      };

      if (!product.id) {
        throw new Error('ID produk tidak tersedia');
      }

      await updateProduct(product.id, payload);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Produk berhasil diperbarui',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Gagal Menyimpan Produk', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat menyimpan produk',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tambah Produk</h2>
        <Link to="/product" className="text-sm text-green-600 hover:underline hover:text-green-700">
          ← Kembali ke Daftar
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Nama Produk</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Masukkan nama produk"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Kategori</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          >
            <option value="" disabled>
              -- Pilih Kategori --
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Harga (Rp)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Deskripsi</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={4}
            placeholder="Deskripsikan produk"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

export default editproduct;
