import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "../../services/ProductServices";

const AddProduct: React.FC = () => {

  const [categories, setCategories] = useState<{id:Number, name:string}[]>([]);

  const [product, setProduct] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
  });

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats] = await Promise.all([getCategories()]);
        setCategories(cats);
      } catch (error) {
        console.error("Gagal load data", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProduct({...product, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!product.name.trim() || !product.category_id.trim() ||  !product.price.trim()) {
          Swal.fire({
            icon: 'warning',
            title: 'Form belum lengkap',
            text: 'Harap isi semua field sebelum menyimpan.',
          });
        return; // stop eksekusi submit kalau validasi gagal
    }
    try {
      await createProduct(product)
      
       Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Produk berhasil ditambahkan',
        timer: 2000,
        showConfirmButton: false,
      });
      setProduct({
      name: "",
      category_id: "",
      price: "",
      description: "",
      });
    } catch(error) {
      console.error("Gagal Menambahkan Produk",error);
      Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: 'Terjadi kesalahan saat menyimpan produk',
    });
    }
  
  }

  return (
     <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Tambah Produk</h2>
      <Link
        to="/product" // Ganti dengan route tujuanmu
        className="text-sm text-green-600 hover:underline hover:text-green-700"
      >
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
            {categories.map(cat => (
                <option key={Number(cat.id)} value={Number(cat.id)} >{cat.name}</option>
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
};

export default AddProduct;
