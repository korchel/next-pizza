import { create } from "zustand";
import { api } from "../services/apiClient";
import { getCartDetails, ICartItem } from "../lib";



export interface CartState {
  loading: boolean;
  error: boolean;
  totalCost: number;
  items: ICartItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  loading: true,
  error: false,
  totalCost: 0,
  items: [],
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await api.cart.gethCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    console.log(id, '!!!!!!')
    try {
      set({ loading: true, error: false });
      const data = await api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: any) => {},
  removeCartItem: async (id: number) => {},
}));