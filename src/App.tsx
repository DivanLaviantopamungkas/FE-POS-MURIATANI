import { BrowserRouter as Router, Routes, Route } from 'react-router';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';
import UserProfiles from './pages/UserProfiles';
import Videos from './pages/UiElements/Videos';
import Images from './pages/UiElements/Images';
import Alerts from './pages/UiElements/Alerts';
import Badges from './pages/UiElements/Badges';
import Avatars from './pages/UiElements/Avatars';
import Buttons from './pages/UiElements/Buttons';
import LineChart from './pages/Charts/LineChart';
import BarChart from './pages/Charts/BarChart';
import Calendar from './pages/Calendar';
import BasicTables from './pages/Tables/BasicTables';
import FormElements from './pages/Forms/FormElements';
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
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Blank />} />

          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route element={<PrivateRoute role="manager" />}>
              <Route index path="/" element={<Home />} />

              <Route path="/product" element={<Product />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/editproduct/:id" element={<EditProduct />} />

              <Route path="/category" element={<Category />} />
              <Route path="/addcategory" element={<AddEditCategory />} />

              <Route path="/supplier" element={<Supplier />} />
              <Route path="/addsupplier" element={<AddSupplier />} />

              <Route path="/pelanggan" element={<Customers />} />

              <Route path="/PembelianList" element={<PurchaseList />} />
              <Route path="/PembelianFrom" element={<Purchase />} />
              <Route path="/Pembelianedit/:id" element={<PurchaseEdit />} />

              <Route path="/Penjualan" element={<Penjualan />} />

              <Route path="/Kasir" element={<Kasir />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute role="kasir" />}>
            <Route path="/kasir" element={<Blank />} />
            {/* tambahkan route kasir lain di sini */}
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
