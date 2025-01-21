import { axiosInstance } from "./axiosInstance";
import { CartDTO, CreateCartItemDTO } from "./dto/cart.dto";
import { Paths } from "./paths";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(Paths.CART);

  return data;
};

export const updateItemQuantity = async (
  id: number,
  quantity: number
): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>(Paths.CART + "/" + id, {
    quantity,
  });

  return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>(Paths.CART + "/" + id);

  return data;
};

export const addCartItem = async (
  values: CreateCartItemDTO
): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>(Paths.CART, values);

  return data;
};
