import { BarChart3, ShoppingCart, Package, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardService, { SummaryData, TransactionData } from '../../services/DashboarService';

export default function Home() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const [summaryData, transactionData] = await Promise.all([
          DashboardService.getSummary(),
          DashboardService.getRecentTransactions(),
        ]);
        setSummary(summaryData);
        setTransactions(transactionData);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Kartu Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          icon={<ShoppingCart className="text-blue-600" />}
          title="Total Penjualan"
          value={summary ? `Rp ${summary.totalPenjualan.toLocaleString()}` : 'Loading...'}
        />
        <SummaryCard
          icon={<BarChart3 className="text-green-600" />}
          title="Transaksi Hari Ini"
          value={summary ? `${summary.totalPenjualanHariIni} Transaksi` : 'Loading...'}
        />
        <SummaryCard
          icon={<Package className="text-yellow-600" />}
          title="Stok Produk"
          value={summary ? `${summary.totalProduk} Produk` : 'Loading...'}
        />
        <SummaryCard
          icon={<AlertTriangle className="text-red-600" />}
          title="Stok Hampir Habis"
          value={summary ? `${summary.stock} Produk` : 'Loading...'}
        />
      </div>

      {/* Grafik Penjualan Placeholder */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Grafik Penjualan Bulanan</h3>
        <div className="h-40 flex items-center justify-center text-gray-400 italic">
          (Chart placeholder - nanti bisa pakai Recharts / Chart.js)
        </div>
      </div>

      {/* Tabel Transaksi Terbaru */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaksi Terbaru</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-600 text-sm sticky top-0">
              <tr>
                <th className="px-4 py-3 border">No</th>
                <th className="px-4 py-3 border">ID Transaksi</th>
                <th className="px-4 py-3 border">Tanggal</th>
                <th className="px-4 py-3 border">Kasir</th>
                <th className="px-4 py-3 border">Pelanggan</th>
                <th className="px-4 py-3 border">Metode</th>
                <th className="px-4 py-3 border">Total</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {transactions.length > 0 ? (
                transactions.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border">{item.id}</td>
                    <td className="px-4 py-2 border">{item.tanggal}</td>
                    <td className="px-4 py-2 border">{item.kasir}</td>
                    <td className="px-4 py-2 border">{item.pelanggan}</td>
                    <td className="px-4 py-2 border">{item.metode}</td>
                    <td className="px-4 py-2 border text-right">
                      Rp {item.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Lunas'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      <button className="text-blue-600 hover:underline text-sm">Detail</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-3 text-center text-gray-400" colSpan={9}>
                    Tidak ada data transaksi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
