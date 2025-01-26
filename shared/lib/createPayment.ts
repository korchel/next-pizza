import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

export interface PaymentDetails {
  description: string;
  orderId: number;
  amount: number;
}

export const createPayment = async (details: PaymentDetails) => {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.URL + "?paid",
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_SHOP_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
};
