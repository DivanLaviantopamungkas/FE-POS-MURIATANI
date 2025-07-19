import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCustomers } from "../../services/CustomersList"

const CustomersList = () => {
  
    interface CustomersList {
        id:string;
        name: string;
        phone:string;
        address: string;
    }
    
    const [customers, setCustomers] = useState<CustomersList[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [cus] = await Promise.all([getCustomers()])
                setCustomers(cus)
            } catch(err){
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredcustomer = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
     )

    if(loading){
        return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600 font-medium">Memuat data Customer...</p>
            </div>
        </div>
        )
    }
    return (
     <div className="p-4 sm:p-6 lg:p-8">
  {/* Header + Tombol */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Daftar customer</h2>
  </div>

  {/* Pencarian */}
  <div className="mb-6">
    <input
      type="text"
      placeholder="Cari supplier..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
    />
  </div>

  {/* Tabel */}
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          <th className="px-6 py-3 text-left">ID</th>
          <th className="px-6 py-3 text-left">Nama customer</th>
          <th className="px-6 py-3 text-left">Nomer Hp</th>
          <th className="px-6 py-3 text-left">Alamat</th>
        </tr>
      </thead>
      <tbody>
        {filteredcustomer.map((customers) => (
          <tr key={customers.id} className="border-t hover:bg-gray-50">
            <td className="px-6 py-3">{customers.id}</td>
            <td className="px-6 py-3">{customers.name}</td>
            <td className="px-6 py-3">{customers.phone}</td>
            <td className="px-6 py-3">{customers.address}</td>
          </tr>
        ))}
        {filteredcustomer.length === 0 && (
          <tr>
            <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
              Tidak ada customer ditemukan.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
  )
}

export default CustomersList