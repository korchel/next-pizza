import { Product } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { Routes } from "./routes";

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(Routes.SEARCH_PRODUCTS, {
    params: { query },
  });
  return data;
};
