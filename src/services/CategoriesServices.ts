import api from "./api";

interface CategoryPayload {
  name: string;
}

export const setCategory = async () => {
  const response = await api.get("/category");
  return response.data;
};

export const createCategory = async (data: CategoryPayload) => {
  const response = await api.post("/category", data);
  return response.data;
};
