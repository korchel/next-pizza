import { CartDTO } from "../services/dto/cart.dto";
import { getCartItemPrice } from "./getCartItemPrice";

export type ICartItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: { name: string; price: number }[];
}

interface ICartDetails {
  items: ICartItem[];
  totalCost: number;
}

export const getCartDetails = (data: CartDTO): ICartDetails => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariant.product.name,
    imageUrl: item.productVariant.product.imageUrl,
    price: getCartItemPrice(item),
    pizzaSize: item.productVariant.size,
    pizzaType: item.productVariant.pizzaType,
    ingredients: item.ingredients.map(({name, price}) => ({name, price})),
  }));


  const {totalCost} = data;
  return {
    totalCost,
    items,
  }
};