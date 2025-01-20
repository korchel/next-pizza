import { axiosInstance } from "./axiosInstance";
import { CartDTO, CreateCartItemDTO } from "./dto/cart.dto";
import { Routes } from "./routes";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(Routes.CART);

  return data;
};

export const updateItemQuantity = async (
  id: number,
  quantity: number
): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>(Routes.CART + "/" + id, {
    quantity,
  });

  return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>(Routes.CART + "/" + id);

  return data;
};

export const addCartItem = async (
  values: CreateCartItemDTO
): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>(Routes.CART, values);

  return data;
};
