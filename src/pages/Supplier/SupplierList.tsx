import { Link } from 'react-router-dom'
import {useState, useEffect } from 'react'
import { getSuppliers } from '../../services/SupplierServices';

const SupplierList = () => {
    interface Supplier {
        id: number;
        name:string;
        phone:number;
        address:string;
    }

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true)
          try { 
            const[sup] = await Promise.all([getSuppliers()])
            setSuppliers(sup)
          } catch(err){
            console.log(err)
          } finally {
            setLoading(false)
          }
        }
        fetchData();
    }, []);

    const filteredSuppliers = suppliers.filter((SupplierList) => 
    SupplierList.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Memuat data Supplier...</p>
      </div>
    </div>
  );
}


    return (
   <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
  {/* Header + Tombol */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
      🧾 Daftar Supplier
    </h2>
    <Link
      to="/addsupplier"
      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition w-full sm:w-auto text-center"
    >
      + Tambah Supplier
    </Link>
  </div>

  {/* Pencarian */}
  <div className="mb-6">
    <input
      type="text"
      placeholder="🔍 Cari supplier..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full sm:w-1/3 px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
    />
  </div>

  {/* Tabel Supplier */}
  <div className="overflow-x-auto bg-white shadow-xl rounded-2xl ring-1 ring-gray-200">
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-50 text-gray-800 uppercase text-left font-semibold text-sm">
        <tr>
          <th className="px-6 py-4">ID</th>
          <th className="px-6 py-4">Nama Supplier</th>
          <th className="px-6 py-4">Nomor HP</th>
          <th className="px-6 py-4">Alamat</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {filteredSuppliers.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-8 text-gray-400">
              Tidak ada supplier ditemukan.
            </td>
          </tr>
        ) : (
          filteredSuppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="hover:bg-gray-50 transition duration-150"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {supplier.id}
              </td>
              <td className="px-6 py-4">{supplier.name}</td>
              <td className="px-6 py-4">{supplier.phone}</td>
              <td className="px-6 py-4">{supplier.address}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>


  )
}

export default SupplierList