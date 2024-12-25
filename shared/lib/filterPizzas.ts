import { prisma } from "@/prisma/client";

export interface SearchParams {
  query?: string;
  sortBy?: string;
  pizzaSizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  minPrice?: string;
  maxPrice?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const filterPizzas = async (params: SearchParams) => {
  const pizzaSizes = params.pizzaSizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIds = params.ingredients?.split(",").map(Number);
  const minPrice = Number(params.minPrice) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.minPrice) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientsIds
            ? { some: { id: { in: ingredientsIds } } }
            : undefined,
        },
        include: {
          ingredients: true,
          variants: true,
        },
      },
    },
  });

  return categories;
};
