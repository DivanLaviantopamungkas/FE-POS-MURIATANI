import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { getProduct } from '../../services/ProductServices';
import { addToCart, checkout, getCart, updateCart, } from '../../services/CashierService';
import { useReactToPrint } from 'react-to-print';
import RupiahInput from './RupiahInput';
import ReceiptPrint from './ReceipPrint';
export default function KasirApp() {
    const contentRef = useRef(null);
    const handlePrint = useReactToPrint({ contentRef });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);
    const [step, setStep] = useState(1);
    const [cart, setCart] = useState(() => {
        // Ambil cart dari localStorage saat pertama kali load
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paidAmount, setPaidAmount] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const products = await getProduct();
            setProducts(products);
        }
        catch (error) {
            console.error('Failed to fetch products', error);
        }
        finally {
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
            }
            catch (error) {
                console.error('Gagal fetch cart dari backend', error);
            }
        };
        fetchCart();
        fetchProducts();
    }, []);
    const handleAddToCart = async (productId) => {
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
                }
                else {
                    const product = products.find((p) => p.id === productId);
                    if (!product)
                        return prevCart;
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
        }
        catch (error) {
            console.error('Gagal tambah ke keranjang:', error);
        }
        finally {
            setTimeout(() => {
                setLoadingCart(false);
            }, 500); // tambahkan delay agar transisi lebih mulus
        }
    };
    const handleClearCart = () => {
        setCart([]);
    };
    const updateCartSession = async (newCart) => {
        try {
            await updateCart(newCart); // kirim seluruh cart ke backend
        }
        catch (error) {
            console.error('Gagal update cart di session backend', error);
        }
    };
    const handleUpdateQuantity = (productId, quantity) => {
        if (quantity < 1)
            return;
        setCart((prev) => {
            const newCart = prev.map((item) => item.product_id === productId
                ? { ...item, quantity, subtotal: item.price * quantity }
                : item);
            updateCartSession(newCart);
            return newCart;
        });
    };
    const handleRemoveFromCart = (productId) => {
        setCart((prev) => {
            const newCart = prev.filter((item) => item.product_id !== productId);
            updateCartSession(newCart);
            return newCart;
        });
    };
    const handleCheckout = async () => {
        if (!paymentMethod)
            return; // aman
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
            }
            else {
                setPaymentSuccess(false);
                setStep(3);
            }
        }
        catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            }
            else if (error.request) {
                console.error('No response received:', error.request);
            }
            else {
                console.error('Error message:', error.message);
            }
            setPaymentSuccess(false);
            setStep(3);
        }
        finally {
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
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 p-6 flex flex-col max-w-7xl mx-auto", children: [_jsxs("h1", { className: "text-4xl font-bold mb-10 text-center text-indigo-800 tracking-tight", children: ["\uD83D\uDED2 Aplikasi Kasir ", _jsx("span", { className: "text-green-600", children: "Muria Tani" })] }), step === 1 && (_jsxs("div", { className: "flex flex-col lg:flex-row gap-8 transition-all duration-500 ease-in-out", children: [_jsxs("div", { className: "flex-1 bg-white rounded-3xl shadow-lg p-8 border border-gray-100", children: [_jsxs("h2", { className: "text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3", children: [_jsx("span", { className: "text-indigo-500 text-3xl", children: "\uD83D\uDECD\uFE0F" }), " Pilih Produk"] }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar", children: loading
                                    ? // Skeleton / spinner
                                        [...Array(8)].map((_, index) => (_jsxs("div", { className: "p-5 bg-gray-100 border border-gray-200 rounded-2xl animate-pulse", children: [_jsx("div", { className: "h-28 bg-gray-200 rounded-xl mb-4" }), _jsx("div", { className: "h-4 bg-gray-300 rounded w-3/4 mb-2" }), _jsx("div", { className: "h-3 bg-gray-200 rounded w-1/2" })] }, index)))
                                    : products.map((product) => (_jsxs("div", { onClick: () => handleAddToCart(product.id), className: "cursor-pointer group p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:ring-2 hover:ring-indigo-400 transition-all duration-300", children: [_jsx("div", { className: "h-28 w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm mb-4", children: "Gambar" }), _jsx("div", { className: "text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition", children: product.name }), _jsxs("div", { className: "text-sm text-gray-500 mt-1", children: ["Rp ", product.price.toLocaleString()] })] }, product.id))) })] }), _jsxs("div", { className: "w-full lg:w-[420px] bg-white rounded-3xl shadow-lg p-8 border border-gray-100 flex flex-col", children: [_jsxs("h2", { className: "text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3", children: [_jsx("span", { className: "text-indigo-500 text-3xl", children: "\uD83E\uDDFE" }), " Keranjang"] }), loadingCart ? (_jsxs("div", { className: "flex justify-center items-center h-32 text-indigo-600", children: [_jsxs("svg", { className: "animate-spin h-6 w-6 mr-2", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v8z" })] }), "Menambahkan ke keranjang..."] })) : cart.length === 0 ? (_jsx("div", { className: "text-gray-400 text-center mt-32 italic", children: "Keranjang masih kosong..." })) : (_jsx("div", { className: "flex flex-col gap-4 overflow-y-auto max-h-[360px] pr-1 custom-scrollbar", children: cart.map((item) => (_jsxs("div", { className: "flex justify-between items-center bg-gray-50 rounded-xl p-4 border border-gray-200", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold text-gray-900", children: item.name }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Rp ", item.price.toLocaleString(), " \u00D7 ", item.quantity] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => handleUpdateQuantity(item.product_id, item.quantity - 1), className: "w-8 h-8 rounded-full border border-gray-300 text-indigo-600 hover:bg-indigo-50 transition", children: "\u2212" }), _jsx("span", { className: "w-6 text-center font-bold text-gray-700", children: item.quantity }), _jsx("button", { onClick: () => handleUpdateQuantity(item.product_id, item.quantity + 1), className: "w-8 h-8 rounded-full border border-gray-300 text-indigo-600 hover:bg-indigo-50 transition", children: "+" }), _jsx("button", { onClick: () => handleRemoveFromCart(item.product_id), className: "text-red-500 hover:text-red-600 text-xl leading-none ml-1", children: "\u00D7" })] })] }, item.product_id))) })), _jsxs("div", { className: "mt-auto pt-6 border-t border-gray-200", children: [_jsxs("div", { className: "flex justify-between text-lg font-semibold text-gray-700 mb-4", children: [_jsx("span", { children: "Total" }), _jsxs("span", { className: "text-indigo-700", children: ["Rp ", total.toLocaleString()] })] }), _jsx("button", { disabled: cart.length === 0 || loadingCart, onClick: () => setStep(2), className: `w-full py-3 rounded-xl font-semibold transition-all duration-300 ${cart.length === 0 || loadingCart
                                            ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'}`, children: "Lanjut ke Pembayaran \u2192" })] })] })] })), step === 2 && (_jsxs("div", { className: "max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-lg border border-gray-100 space-y-10", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900", children: "Pembayaran" }), _jsxs("div", { className: "bg-gray-50 rounded-xl p-6 border border-gray-200 max-h-72 overflow-y-auto space-y-4", children: [cart.map((item) => (_jsxs("div", { className: "flex justify-between items-center border-b pb-2 last:border-none", children: [_jsxs("div", { className: "text-gray-700", children: [_jsxs("div", { className: "font-medium", children: [item.name, " x ", item.quantity] }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Rp ", item.price.toLocaleString(), " / item"] })] }), _jsxs("div", { className: "font-semibold text-gray-900", children: ["Rp ", item.subtotal.toLocaleString()] })] }, item.product_id))), _jsxs("div", { className: "flex justify-between pt-4 font-bold text-xl text-indigo-700 border-t border-gray-200", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["Rp ", total.toLocaleString()] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-4 text-gray-800", children: "Metode Pembayaran" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: ['Midtrans', 'Transfer Bank', 'Cash', 'E-Wallet'].map((method) => (_jsx("button", { onClick: () => setPaymentMethod(method), className: `rounded-xl border p-4 text-center transition-all duration-200 font-medium shadow-sm
              ${paymentMethod === method
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-[1.03]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500 hover:shadow'}`, children: method }, method))) })] }), _jsx("div", { className: "p-6", children: _jsx(RupiahInput, { value: paidAmount, onValueChange: (val) => setPaidAmount(val), placeholder: "Contoh: Rp 10.000" }) }), paidAmount > total && (_jsxs("p", { className: "mt-2 text-green-600 font-semibold", children: ["Kembalian: Rp ", (paidAmount - total).toLocaleString('id-ID')] })), _jsxs("div", { className: "flex justify-between", children: [_jsx("button", { onClick: () => setStep(1), className: "px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition", children: "\u2190 Kembali" }), _jsx("button", { onClick: handleCheckout, disabled: !paymentMethod || paidAmount < total || loading, className: `px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2
    ${paymentMethod && paidAmount >= total && !loading
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`, children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin h-5 w-5 text-white", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" })] }), _jsx("span", { children: "Memproses..." })] })) : ('Bayar Sekarang') })] })] })), step === 3 && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-0 font-mono text-gray-900", children: [_jsx("div", { ref: contentRef, children: _jsx(ReceiptPrint, { cart: cart, total: total, paidAmount: paidAmount, paymentMethod: paymentMethod }) }), _jsxs("div", { className: "mt-4 space-y-2 p-6", children: [_jsx("button", { onClick: handlePrint, className: "w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold", children: "Cetak" }), _jsx("button", { onClick: handleFinish, className: "w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold", children: "Selesai" })] })] }) }))] }));
}
