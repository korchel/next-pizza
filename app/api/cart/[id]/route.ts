import { prisma } from "@/prisma/client";
import { updateCartTotalCost } from "@/shared/lib/updateCartTotalCost";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });
    const updatedCart = await updateCartTotalCost(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to edit cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    const updatedCart = await updateCartTotalCost(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete item" },
      { status: 500 }
    );
  }
}
