import api from './api';
export const getSuplliers = async () => {
    const response = await api.get('supplier');
    return response.data;
};
export const getProducts = async () => {
    const response = await api.get('products');
    return response.data;
};
export const getPurchases = async () => {
    const response = await api.get('purchases');
    return response.data;
};
export const simpanPembelian = async (supplier_id, items) => {
    await api.post('purchases', { supplier_id, items });
};
export const getPurchasesById = async (id) => {
    const response = await api.get(`purchases/${id}`);
    return response.data;
};
export const updatePurchases = async (id, supplier_id, items) => {
    const response = await api.put(`purchases/${id}`, { supplier_id, items });
    return response.data;
};
export const deletePurchases = async (id) => {
    await api.delete(`purchases/${id}`);
};
