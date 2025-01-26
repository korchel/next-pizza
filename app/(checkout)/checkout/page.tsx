"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  CheckoutSidebar,
  CheckoutCart,
  CheckoutPersonalDataForm,
  CheckoutAddressForm,
} from "@/components/shared";
import { useCart } from "@/shared/hooks";
import {
  CheckoutFormType,
  checkoutSchema,
} from "@/components/shared/checkout/checkoutSchema";
import { cn } from "@/shared/lib";
import { createOrder } from "@/app/actions";
import { api } from "@/shared/services/apiClient";
import { Container, Title } from "@/components/ui";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const { totalCost, items, updateItemQuantity, removeCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: session?.user.name || "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const updateQuantity = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const updatedQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, updatedQuantity);
  };

  const onSubmit: SubmitHandler<CheckoutFormType> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success("Заказ создан");
      if (url) {
        location.href = url;
      }
    } catch (error) {
      setSubmitting(false);
      toast.error("Ошибка при создании заказа");
      console.error(error);
    }
  };

  return (
    <Container className="mt-10">
      <Title text="Order" size="lg" className="font-extrabold mb-8" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                updateQuantity={updateQuantity}
                loading={loading}
              />
              <CheckoutPersonalDataForm
                className={cn(loading && "opacity-35 pointer-events-none")}
              />
              <CheckoutAddressForm
                className={cn(loading && "opacity-35 pointer-events-none")}
              />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar
                totalCost={totalCost}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
