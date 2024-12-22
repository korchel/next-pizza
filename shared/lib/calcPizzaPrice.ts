import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Fanction to calculate pizza rpice
 * @param variants - available combinations of size and thikness
 * @param ingredients - available ingredients
 * @param size - chosen size
 * @param type - chosen thickness
 * @param selectedIngredients - added ingredients
 * @returns - total price as number
 */
export const calcPizzaPrice = (
  variants: ProductVariant[],
  ingredients: Ingredient[],
  size: PizzaSize,
  type: PizzaType,
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    variants.find(
      (variant) => variant.pizzaType === type && variant.size === size
    )?.price || 0;

  const ingredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + ingredientsPrice;

  return totalPrice;
};
