"use server";

import { CheckoutFormType } from "@/components/shared/checkout/checkoutSchema";
import { PayOrderTemplate } from "@/components/shared/checkout/email/PayOrderTemplate";
import { prisma } from "@/prisma/client";
import { createPayment, sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormType) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("Cart token not found");
    }
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    if (!userCart) {
      throw new Error("Cart not found");
    }
    if (userCart?.totalCost === 0) {
      throw new Error("Cart is empty");
    }

    const newOrder = await prisma.order.create({
      data: {
        token: cartToken,
        totalCost: userCart.totalCost,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalCost: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: newOrder.totalCost,
      orderId: newOrder.id,
      description: "Order #" + newOrder.id,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    await prisma.order.update({
      where: {
        id: newOrder.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      "Next Pizza | order #" + newOrder.id,
      PayOrderTemplate({
        orderId: newOrder.id,
        totalCost: newOrder.totalCost,
        paymentUrl,
      })
    );
    return paymentUrl;
  } catch (error) {
    console.error("Create order server error", error);
  }
}
