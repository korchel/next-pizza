import { useEffect } from "react";
import { useCartStore } from "../store";
import { CreateCartItemDTO } from "../services/dto/cart.dto";
import { ICartItem } from "../lib";

type IReturnType = {
  totalCost: number;
  items: ICartItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemDTO) => void;
};

export const useCart = (): IReturnType => {
  const cratState = useCartStore((state) => state);

  useEffect(() => {
    cratState.getCartItems();
  }, []);

  return cratState;
};
