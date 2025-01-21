import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { Paths } from "./paths";

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(Paths.INGREDIENTS);
  return data;
};
