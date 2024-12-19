import { ProductVariant } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";

/**
 * Function to get available sizes of a given pizza
 * @param variants - available combinations of size and thikness
 * @param type - chosen thickness
 * @returns - available sizes as { name, value, disabled }
 */

export const getAvailablePizzaSizes = (
  variants: ProductVariant[],
  type: PizzaType
) => {
  const availableVariants = variants.filter(
    (variant) => variant.pizzaType === type
  );
  const availableSizes = pizzaSizes.map(({ name, value }) => ({
    name,
    value,
    disabled: !availableVariants.some((type) => type.size === Number(value)),
  }));
  return availableSizes;
};
