import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPurchasesById, getProducts, getSuplliers, updatePurchases, } from '../../services/PurchasesService';
import Swal from 'sweetalert2';
const PembelianEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier_id, setSupplierId] = useState(0);
    const [items, setItems] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [supplierData, productData, purchaseData] = await Promise.all([
                    getSuplliers(),
                    getProducts(),
                    getPurchasesById(Number(id)),
                ]);
                setSuppliers(supplierData);
                setProducts(productData);
                setSupplierId(purchaseData.supplier_id);
                const formattedItems = purchaseData.detail.map((d) => ({
                    product_id: d.product_id,
                    quantity: d.quantity,
                    price: d.price,
                }));
                setItems(formattedItems);
            }
            catch (error) {
                console.error('Gagal ambil data:', error);
            }
        };
        fetchData();
    }, [id]);
    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] =
            field === 'product_id' || field === 'quantity' || field === 'price' ? Number(value) : value;
        setItems(newItems);
    };
    const addItem = () => {
        setItems([...items, { product_id: 0, quantity: 1, price: 0 }]);
    };
    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updatePurchases(Number(id), supplier_id, items);
            setLoading(false);
            Swal.fire({
                title: 'Berhasil',
                text: 'Data pembelian berhasil diperbarui!',
                icon: 'success',
                confirmButtonText: 'Oke',
            }).then(() => navigate('/PembelianList'));
        }
        catch (error) {
            setLoading(false);
            Swal.fire('Gagal', 'Terjadi kesalahan saat update data', 'error');
        }
    };
    return (_jsxs("div", { className: "p-4 max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Edit Pembelian" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-semibold mb-1", children: "Supplier" }), _jsxs("select", { value: supplier_id, onChange: (e) => setSupplierId(Number(e.target.value)), className: "w-full border rounded p-2", required: true, children: [_jsx("option", { value: "", children: "Pilih Supplier" }), suppliers.map((s) => (_jsx("option", { value: s.id, children: s.name }, s.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold mb-2", children: "Items" }), items.map((item, index) => (_jsxs("div", { className: "grid grid-cols-3 gap-2 mb-2 items-center", children: [_jsxs("select", { value: item.product_id, onChange: (e) => handleItemChange(index, 'product_id', e.target.value), className: "border rounded p-2", required: true, children: [_jsx("option", { value: "", children: "Pilih Produk" }), products.map((p) => (_jsx("option", { value: p.id, children: p.name }, p.id)))] }), _jsx("input", { type: "number", value: item.quantity, onChange: (e) => handleItemChange(index, 'quantity', e.target.value), className: "border rounded p-2", placeholder: "Jumlah", required: true }), _jsx("input", { type: "number", value: item.price, onChange: (e) => handleItemChange(index, 'price', e.target.value), className: "border rounded p-2", placeholder: "Harga", required: true }), _jsx("button", { type: "button", onClick: () => removeItem(index), className: "text-red-500 text-sm col-span-3 text-right", children: "Hapus" })] }, index))), _jsx("button", { type: "button", onClick: addItem, className: "bg-blue-600 text-white px-3 py-1 rounded text-sm mt-2", children: "+ Tambah Item" })] }), _jsx("button", { type: "submit", className: "bg-green-600 text-white px-4 py-2 rounded font-semibold", disabled: loading, children: loading ? 'Menyimpan...' : 'Simpan Perubahan' })] })] }));
};
export default PembelianEdit;
