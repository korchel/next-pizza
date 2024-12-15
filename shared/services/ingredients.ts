import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { Routes } from "./routes";

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(Routes.INGREDIENTS);
  return data;
};
