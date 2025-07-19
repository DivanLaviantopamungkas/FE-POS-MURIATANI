import React, { useEffect, useState, useRef } from 'react';
import { getProduct } from '../../services/ProductServices';
import {
  addToCart,
  checkout,
  clearCart,
  getCart,
  removeCart,
  updateCart,
} from '../../services/CashierService';
import { useReactToPrint } from 'react-to-print';
import RupiahInput from './RupiahInput';

import ReceiptPrint from './ReceipPrint';

export default function KasirApp() {
  interface Product {
    id: number;
    name: string;
    price: number;
  }

  interface CartItem {
    product_id: number;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Ambil cart dari localStorage saat pertama kali load
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const products = await getProduct();
      setProducts(products);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  // Simpan cart ke localStorage setiap ada perubahan cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        if (response.data.cart) {
          setCart(response.data.cart);
        }
      } catch (error) {
        console.error('Gagal fetch cart dari backend', error);
      }
    };

    fetchCart();
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: number) => {
    setLoadingCart(true);
    try {
      await addToCart(productId); // API call ke backend

      // update cart lokal
      setCart((prevCart) => {
        const index = prevCart.findIndex((item) => item.product_id === productId);
        if (index !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[index].quantity += 1;
          updatedCart[index].subtotal = updatedCart[index].price * updatedCart[index].quantity;
          return updatedCart;
        } else {
          const product = products.find((p) => p.id === productId);
          if (!product) return prevCart;
          return [
            ...prevCart,
            {
              product_id: product.id,
              name: product.name,
              quantity: 1,
              price: product.price,
              subtotal: product.price,
            },
          ];
        }
      });
    } catch (error) {
      console.error('Gagal tambah ke keranjang:', error);
    } finally {
      setTimeout(() => {
        setLoadingCart(false);
      }, 500); // tambahkan delay agar transisi lebih mulus
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const updateCartSession = async (newCart: CartItem[]) => {
    try {
      await updateCart(newCart); // kirim seluruh cart ke backend
    } catch (error) {
      console.error('Gagal update cart di session backend', error);
    }
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;

    setCart((prev) => {
      const newCart = prev.map((item) =>
        item.product_id === productId
          ? { ...item, quantity, subtotal: item.price * quantity }
          : item
      );
      updateCartSession(newCart);
      return newCart;
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.product_id !== productId);
      updateCartSession(newCart);
      return newCart;
    });
  };

  const handleCheckout = async () => {
    if (!paymentMethod) return; // aman

    setLoading(true);
    try {
      // Contoh data dummy untuk customer_id dan paid_amount
      const data = {
        customer_id: null,
        paid_amount: total, // asumsi bayar pas total
        payment_method: paymentMethod,
      };

      const res = await checkout(data);
      console.log('Response checkout:', res.data);

      if (res.data.message === 'Transaksi Berhasil') {
        setPaymentSuccess(true);
        setStep(3);
      } else {
        setPaymentSuccess(false);
        setStep(3);
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setPaymentSuccess(false);
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const handleFinish = () => {
    // Reset semua state setelah checkout selesai
    setCart([]);
    setPaidAmount(0);
    setPaymentMethod('');
    setStep(1);
    setPaymentSuccess(false);

    // Kosongkan juga localStorage agar cart bersih
    localStorage.removeItem('cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-indigo-800 tracking-tight">
        🛒 Aplikasi Kasir <span className="text-green-600">Muria Tani</span>
      </h1>

      {step === 1 && (
        <div className="flex flex-col lg:flex-row gap-8 transition-all duration-500 ease-in-out">
          {/* Produk Section */}
          <div className="flex-1 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
              <span className="text-indigo-500 text-3xl">🛍️</span> Pilih Produk
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
              {loading
                ? // Skeleton / spinner
                  [...Array(8)].map((_, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gray-100 border border-gray-200 rounded-2xl animate-pulse"
                    >
                      <div className="h-28 bg-gray-200 rounded-xl mb-4" />
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  ))
                : products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleAddToCart(product.id)}
                      className="cursor-pointer group p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:ring-2 hover:ring-indigo-400 transition-all duration-300"
                    >
                      <div className="h-28 w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm mb-4">
                        Gambar
                      </div>
                      <div className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Rp {product.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Keranjang Section */}
          <div className="w-full lg:w-[420px] bg-white rounded-3xl shadow-lg p-8 border border-gray-100 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
              <span className="text-indigo-500 text-3xl">🧾</span> Keranjang
            </h2>

            {/* Loading Cart */}
            {loadingCart ? (
              <div className="flex justify-center items-center h-32 text-indigo-600">
                <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Menambahkan ke keranjang...
              </div>
            ) : cart.length === 0 ? (
              <div className="text-gray-400 text-center mt-32 italic">
                Keranjang masih kosong...
              </div>
            ) : (
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[360px] pr-1 custom-scrollbar">
                {cart.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Rp {item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item.product_id)}
                        className="text-red-500 hover:text-red-600 text-xl leading-none ml-1"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total & Checkout */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <div className="flex justify-between text-lg font-semibold text-gray-700 mb-4">
                <span>Total</span>
                <span className="text-indigo-700">Rp {total.toLocaleString()}</span>
              </div>
              <button
                disabled={cart.length === 0 || loadingCart}
                onClick={() => setStep(2)}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  cart.length === 0 || loadingCart
                    ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
                }`}
              >
                Lanjut ke Pembayaran →
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-lg border border-gray-100 space-y-10">
          <h2 className="text-3xl font-bold text-gray-900">Pembayaran</h2>

          {/* Ringkasan Keranjang */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 max-h-72 overflow-y-auto space-y-4">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="flex justify-between items-center border-b pb-2 last:border-none"
              >
                <div className="text-gray-700">
                  <div className="font-medium">
                    {item.name} x {item.quantity}
                  </div>
                  <div className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString()} / item
                  </div>
                </div>
                <div className="font-semibold text-gray-900">
                  Rp {item.subtotal.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="flex justify-between pt-4 font-bold text-xl text-indigo-700 border-t border-gray-200">
              <span>Total</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Metode Pembayaran</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Midtrans', 'Transfer Bank', 'Cash', 'E-Wallet'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`rounded-xl border p-4 text-center transition-all duration-200 font-medium shadow-sm
              ${
                paymentMethod === method
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-[1.03]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500 hover:shadow'
              }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Input Jumlah Bayar */}
          <div className="p-6">
            <RupiahInput
              value={paidAmount}
              onValueChange={(val) => setPaidAmount(val)}
              placeholder="Contoh: Rp 10.000"
            />
          </div>

          {/* Kembalian */}
          {paidAmount > total && (
            <p className="mt-2 text-green-600 font-semibold">
              Kembalian: Rp {(paidAmount - total).toLocaleString('id-ID')}
            </p>
          )}

          {/* Tombol Navigasi */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              ← Kembali
            </button>

            <button
              onClick={handleCheckout}
              disabled={!paymentMethod || paidAmount < total || loading}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2
    ${
      paymentMethod && paidAmount >= total && !loading
        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  <span>Memproses...</span>
                </>
              ) : (
                'Bayar Sekarang'
              )}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-0 font-mono text-gray-900">
            {/* Cetak hanya isi nota */}
            <div ref={contentRef}>
              <ReceiptPrint
                cart={cart}
                total={total}
                paidAmount={paidAmount}
                paymentMethod={paymentMethod}
              />
            </div>

            {/* Tombol tidak ikut dicetak */}
            <div className="mt-4 space-y-2 p-6">
              <button
                onClick={handlePrint}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold"
              >
                Cetak
              </button>
              <button
                onClick={handleFinish}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
