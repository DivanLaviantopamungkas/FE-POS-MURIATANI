import api from "./api";

interface SupplierPayload {
  name: string;
  phone: string;
  address: string;
}

export const getSuppliers = async () => {
  const response = await api.get("/supplier");
  return response.data;
};

export const createSupplier = async (data: SupplierPayload) => {
  const response = await api.post("/supplier", data);
  return response.data;
};

// export const updateSupplier = async (id: number, data: SupplierPayload) => {
//   const Response = await api.post("/supplier", id);
//   return Response.data;
// };
