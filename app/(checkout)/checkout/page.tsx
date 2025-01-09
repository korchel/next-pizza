"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutCart,
  CheckoutPersonalDataForm,
  CheckoutAddressForm,
} from "@/components/shared";
import { useCart } from "@/shared/hooks";

export default function CheckoutPage() {
  const { totalCost, items, updateItemQuantity, removeCartItem } = useCart();

  const from = useForm({
    resolver: zodResolver(),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const updateQuantity = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const updatedQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, updatedQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Order" size="lg" className="font-extrabold mb-8" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart
            items={items}
            removeCartItem={removeCartItem}
            updateQuantity={updateQuantity}
          />
          <CheckoutPersonalDataForm />
          <CheckoutAddressForm />
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar totalCost={totalCost} />
        </div>
      </div>
    </Container>
  );
}
