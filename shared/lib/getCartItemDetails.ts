import { PizzaSize, PizzaType, pizzaTypes, typesMap } from "../constants/pizza";
import { ICartItem } from "./getCartDetails";

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: ICartItem['ingredients'],

): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = typesMap[pizzaType];
    details.push(`${typeName} ${pizzaSize} cm`)
  }

  if (ingredients.length > 0) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }
  return details.join(', ');
};