import { Product } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";

export const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product>("/products/search", {
    params: { query },
  });
  return data;
};
