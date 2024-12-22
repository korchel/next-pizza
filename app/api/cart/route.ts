import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cartToken = req.cookies.get('cartToken')?.value;

    if (!cartToken) {
      return NextResponse.json({ items: [], totalCost: 0 });
    }
    const userCart = await prisma.cart.findFirst({
      where: {token: cartToken},
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
    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error)
  }
}
