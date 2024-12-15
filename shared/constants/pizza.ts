const sizesMap = {
  20: 'small',
  30: 'medium',
  40: 'large',
} as const;

const typesMap = {
  1: 'traditional',
  2: 'thin',
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