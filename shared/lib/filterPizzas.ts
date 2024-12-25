import { prisma } from "@/prisma/client";

export interface SearchParams {
  query?: string;
  sortBy?: string;
  pizzaSizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  from?: string;
  to?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const filterPizzas = async (params: SearchParams) => {
  const pizzaSizes = params.pizzaSizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIds = params.ingredients?.split(",").map(Number);
  const minPrice = Number(params.from) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.to) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIds
            ? {
                some: {
                  id: {
                    in: ingredientsIds,
                  },
                },
              }
            : undefined,
          variants: {
            some: {
              size: {
                in: pizzaSizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          variants: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
};
