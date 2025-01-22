export const sizesMap = {
  20: "Маленькая",
  30: "Средняя",
  40: "Большая",
} as const;

export const typesMap = {
  1: "Традиционное",
  2: "Тонкое",
} as const;

export const pizzaSizes = Object.entries(sizesMap).map(([value, name]) => ({
  name,
  value,
}));

export const pizzaTypes = Object.entries(typesMap).map(([value, name]) => ({
  name,
  value,
}));

export type PizzaSize = keyof typeof sizesMap;
export type PizzaType = keyof typeof typesMap;
