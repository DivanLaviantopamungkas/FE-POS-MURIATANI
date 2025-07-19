import React, { useEffect, useState } from 'react';
import { getTransac, Sales } from '../../services/TransactionService';

function Penjualan() {
  const [sale, setSale] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tranc = await getTransac();
        setSale(tranc);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const filteredSales = sale.filter((sales) =>
    sales.sales_detail.some((detail) =>
      detail.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Memuat data Penjualan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Daftar Pembelian</h1>

      <input
        type="text"
        placeholder="Cari produk dalam pembelian..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 border rounded-md w-full max-w-md"
      />

      {filteredSales.length === 0 ? (
        <p className="text-center text-gray-400">Tidak ada pembelian yang ditemukan.</p>
      ) : (
        filteredSales.map((sale) => (
          <div key={sale.id} className="border rounded-lg p-4 shadow-sm bg-white mb-4">
            <p className="text-gray-600 text-sm mb-1">
              Tanggal: {new Date(sale.created_at).toLocaleDateString()}
            </p>
            <p className="font-semibold mb-3">
              Total Bayar: Rp {sale.paid_amount.toLocaleString()}
            </p>
            <p className="mb-2">Metode Pembayaran: {sale.payment_method}</p>
            <div className="divide-y divide-gray-200">
              {sale.sales_detail.map((detail) => (
                <div key={detail.id} className="flex justify-between py-2">
                  <span>{detail.product.name}</span>
                  <span>
                    {detail.quantity} x Rp {detail.price.toLocaleString()} = Rp{' '}
                    {detail.subtotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Penjualan;
