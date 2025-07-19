import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { getCategories } from "../../services/ProductServices";
import { createCategory } from "../../services/CategoriesServices";

function category() {

  interface Category {
    id: number;
    name:string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState({ name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(category)

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori berhasil ditambahkan",
        timer: 2000,
        showConfirmButton: false,
      });

      // Update daftar kategori lokal (opsional)
      // setFilteredCategories([...filteredCategories, res.data]);

      // Reset form dan tutup modal
      setCategory({ name: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan kategori:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan kategori",
      });
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try{
        const [cat] = await Promise.all([getCategories()])
        setCategories(cat)
      } catch(err){
        console.error(err)
      } finally{
        setLoading(false)
      }
    }
    fetchData()
  }, []);

  const filteredCategories = categories.filter((category) => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Memuat data kategory...</p>
      </div>
    </div>
  );
}

  return (
<div className="animate-fade-in">
  <div className="p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto">
    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
        📁 Daftar Kategori
      </h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition w-full sm:w-auto"
      >
        + Tambah Kategori
      </button>
    </div>

    {/* Search Input */}
    <div className="mb-6">
      <input
        type="text"
        placeholder="🔍 Cari kategori..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-1/3 px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
      />
    </div>

    {/* Tabel */}
    <div className="overflow-x-auto bg-white shadow-xl rounded-2xl ring-1 ring-gray-200">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-800 uppercase text-left font-semibold text-sm">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Nama</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredCategories.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-8 text-gray-400">
                Tidak ada kategori ditemukan.
              </td>
            </tr>
          ) : (
            filteredCategories.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {cat.id}
                </td>
                <td className="px-6 py-4">{cat.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>

  {/* Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-gray-800">
            ✏️ Tambah Kategori
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            placeholder="Masukkan nama kategori"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>


  )
}

export default category