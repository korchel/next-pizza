import { prisma } from "@/prisma/client";
import { getCartItemPrice } from "./getCartItemPrice";
import { CartDTO } from "../services/dto/cart.dto";

export const updateCartTotalCost = async (token: string): Promise<CartDTO | number> => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    }
  });

  if (!userCart) {
    return 0;
  }

  const totalCost = userCart.items.reduce((acc, item) => {
    return acc + getCartItemPrice(item);
  }, 0);

  const updatedCart = await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalCost,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    }
  })

  return updatedCart;
};