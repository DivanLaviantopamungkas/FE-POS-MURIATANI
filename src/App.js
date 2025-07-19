import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';
import Blank from './pages/Blank';
import AppLayout from './layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import Home from './pages/Dashboard/Home';
import Product from './pages/Produk/productlist';
import AddProduct from './pages/Produk/AddProduct';
import EditProduct from './pages/Produk/editproduct';
import Category from './pages/Kategory/category';
import AddEditCategory from './pages/Kategory/AddCategory';
import Supplier from './pages/Supplier/SupplierList';
import AddSupplier from './pages/Supplier/AddSupplier';
import PrivateRoute from './components/auth/PrivateRoute';
import Customers from './pages/Pelanggan/CustomersList';
import PurchaseList from './pages/Pembelian/PembelianList';
import Purchase from './pages/Pembelian/PembelianForm';
import PurchaseEdit from './pages/Pembelian/PembelianEdit';
import Penjualan from './pages/Penjualan/Penjualan';
import Kasir from './pages/Kasir/KasirApp';
export default function App() {
    return (_jsx(_Fragment, { children: _jsxs(Router, { children: [_jsx(ScrollToTop, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "/unauthorized", element: _jsx(Blank, {}) }), _jsx(Route, { element: _jsx(AppLayout, {}), children: _jsxs(Route, { element: _jsx(PrivateRoute, { role: "manager" }), children: [_jsx(Route, { index: true, path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/product", element: _jsx(Product, {}) }), _jsx(Route, { path: "/addproduct", element: _jsx(AddProduct, {}) }), _jsx(Route, { path: "/editproduct/:id", element: _jsx(EditProduct, {}) }), _jsx(Route, { path: "/category", element: _jsx(Category, {}) }), _jsx(Route, { path: "/addcategory", element: _jsx(AddEditCategory, {}) }), _jsx(Route, { path: "/supplier", element: _jsx(Supplier, {}) }), _jsx(Route, { path: "/addsupplier", element: _jsx(AddSupplier, {}) }), _jsx(Route, { path: "/pelanggan", element: _jsx(Customers, {}) }), _jsx(Route, { path: "/PembelianList", element: _jsx(PurchaseList, {}) }), _jsx(Route, { path: "/PembelianFrom", element: _jsx(Purchase, {}) }), _jsx(Route, { path: "/Pembelianedit/:id", element: _jsx(PurchaseEdit, {}) }), _jsx(Route, { path: "/Penjualan", element: _jsx(Penjualan, {}) }), _jsx(Route, { path: "/Kasir", element: _jsx(Kasir, {}) })] }) }), _jsx(Route, { element: _jsx(PrivateRoute, { role: "kasir" }), children: _jsx(Route, { path: "/kasir", element: _jsx(Blank, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }) }));
}
