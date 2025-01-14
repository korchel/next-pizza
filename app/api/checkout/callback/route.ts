import { PaymentCallbackData } from "@/@types/yookassa";
import { OrderSucessTemplate } from "@/components/shared/checkout/email/OrderSucessTemplate";
import { prisma } from "@/prisma/client";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isPaymentSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isPaymentSucceeded
          ? OrderStatus.SUCCEEDED
          : OrderStatus.CANCELLED,
      },
    });
    const items = JSON.parse(order.items as string) as CartItemDTO[];

    if (isPaymentSucceeded) {
      await sendEmail(
        order.email,
        "Nxet pizza | Success",
        OrderSucessTemplate({ orderId: order.id, items })
      );
    } else {
      //send email about failed payment
    }
  } catch (error) {
    console.log("Checkout callback error", error);
    return NextResponse.json({ error: "Srver Error" });
  }
}
