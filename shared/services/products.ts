import { Product } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { Paths } from "./paths";

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(Paths.SEARCH_PRODUCTS, {
    params: { query },
  });
  return data;
};
