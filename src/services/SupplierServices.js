import api from "./api";
export const getSuppliers = async () => {
    const response = await api.get("/supplier");
    return response.data;
};
export const createSupplier = async (data) => {
    const response = await api.post("/supplier", data);
    return response.data;
};
// export const updateSupplier = async (id: number, data: SupplierPayload) => {
//   const Response = await api.post("/supplier", id);
//   return Response.data;
// };
