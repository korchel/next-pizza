"use server";

import { CheckoutFormType } from "@/components/shared/checkout/checkoutSchema";
import { PayOrderTemplate } from "@/components/shared/checkout/email/PayOrderTemplate";
import { VerificationTemplate } from "@/components/shared/checkout/email/VerificationTemplate";
import { prisma } from "@/prisma/client";
import { createPayment, getUserSession, sendEmail } from "@/shared/lib";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
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
    console.log("CREATE ORDER ERROR", error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      throw new Error("USER NOT FOUND");
    }
    const foundUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });
    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : foundUser?.password,
      },
    });
  } catch (error) {
    console.log("UPDATE USER ERROR", error);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (foundUser) {
      if (!foundUser.verified) {
        throw new Error("Email not found");
      }

      throw new Error("User already exists");
    }
    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password as string, 10),
      },
    });

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await prisma.verificationCode.create({
      data: {
        code: verificationCode,
        userId: createdUser.id,
      },
    });
    await sendEmail(
      createdUser.email,
      "Next pizza | Registration confirmation",
      VerificationTemplate({ code: verificationCode })
    );
  } catch (error) {
    console.log("CREATE USER ERROR", error);
  }
}
