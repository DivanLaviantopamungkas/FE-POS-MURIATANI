import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { createSupplier } from '../../services/SupplierServices'

const AddSupplier = () => {
    
    const [supplier, setSupplier] = useState({
         name: "",
         phone: "",
         address: ""
    });

    const handleChange =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setSupplier({...supplier, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!supplier.name.trim() || !supplier.phone.trim() || !supplier.address.trim()) {
            Swal.fire({
            icon: 'warning',
            title: 'Form belum lengkap',
            text: 'Harap isi semua field sebelum menyimpan.',
            });
            return; // stop eksekusi submit kalau validasi gagal
        }
        try{
            await createSupplier(supplier)

             Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Suplier berhasil ditambahkan',
            timer: 2000,
            showConfirmButton: false,
            });

            setSupplier({ name: '', phone: '', address: '' });
        } catch (error) {
             console.error('Gagal menyimpan Suplier:', error);

            // Error Alert
            Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat menyimpan Suplier',
            });
        }
    }
    

    return (
   <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Tambah Supplier</h2>
      <Link
        to="/supplier" // Ganti dengan route tujuanmu
        className="text-sm text-green-600 hover:underline hover:text-green-700"
      >
        ← Kembali ke Daftar
      </Link>
    </div>
  <form onSubmit={handleSubmit} className="space-y-4">
    
    {/* Nama Supplier */}
    <div>
      <label className="block mb-2 font-medium text-gray-700">Nama Supplier</label>
      <input
        type="text"
        name="name"
        value={supplier.name}
        onChange={handleChange}
        placeholder="Masukkan nama supplier"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />
    </div>

    {/* Nomor Telepon */}
    <div>
      <label className="block mb-2 font-medium text-gray-700">Nomor Telepon</label>
      <input
        type="text"
        name="phone"
        value={supplier.phone}
        onChange={handleChange}
        placeholder="Masukkan nomor telepon"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />
    </div>

    {/* Alamat */}
    <div>
      <label className="block mb-2 font-medium text-gray-700">Alamat</label>
      <textarea
        name="address"
        value={supplier.address}
        onChange={handleChange}
        placeholder="Masukkan alamat"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        rows={3}
      />
    </div>

    {/* Tombol Simpan */}
    <div className="text-right">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Simpan
      </button>
    </div>
  </form>
</div>

  )
}

export default AddSupplier