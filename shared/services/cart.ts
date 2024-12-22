import { axiosInstance } from "./axiosInstance"
import { CartDTO } from "./dto/cart.dto";



export const gethCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>('/cart');

  return data;
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>('/cart/' + id, { quantity });

  return data;
};