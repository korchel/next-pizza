import { prisma } from "@/prisma/client";
import { findOrCreateCart } from "@/shared/lib";
import { updateCartTotalCost } from "@/shared/lib/updateCartTotalCost";
import { CreateCartItemDTO } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cartToken = req.cookies.get("cartToken")?.value;

    if (!cartToken) {
      return NextResponse.json({ items: [], totalCost: 0 });
    }
    const userCart = await prisma.cart.findFirst({
      where: { token: cartToken },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
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
      },
    });
    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    const data = (await req.json()) as CreateCartItemDTO;

    if (!token) {
      token = crypto.randomUUID();
    }

    const cart = await findOrCreateCart(token);
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productVariantId: data.productVariantId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    });

    if (existingCartItem) {
      await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
        },
      });
      const updatedCart = await updateCartTotalCost(token);
      const res = NextResponse.json(updatedCart);
      res.cookies.set("cartToken", token);
      return res;
    }

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productVariantId: data.productVariantId,
        quantity: 1,
        ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
      },
    });
    const updatedCart = await updateCartTotalCost(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create cart" },
      { status: 500 }
    );
  }
}
