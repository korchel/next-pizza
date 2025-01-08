"use client";

import {
  CheckoutItem,
  CheckoutTotalItem,
  Container,
  Title,
  WhiteBlock,
} from "@/components/shared";
import { Button, Input, Textarea } from "@/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { totalCost, items, updateItemQuantity, removeCartItem } = useCart();

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
          <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize,
                    item.ingredients
                  )}
                  price={item.price}
                  quantity={item.quantity}
                  name={item.name}
                  clickCounter={(type) =>
                    updateQuantity(item.id, item.quantity, type)
                  }
                  removeItem={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>
          <WhiteBlock title="2. User's data">
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="Name"
              />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Last name"
              />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Phone" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Address">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="address"
              />

              <Textarea
                rows={5}
                className="text-base"
                placeholder="comment to the order"
              />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total: </span>
              <span className="text-xl font-extrabold">{totalCost} P </span>
            </div>
            <CheckoutTotalItem
              title={
                <div className="flex items-center">
                  <Package size={20} className="mr-2  text-gray-300" />
                  Cost
                </div>
              }
              value={3000}
            />
            <CheckoutTotalItem
              title={
                <div className="flex items-center">
                  <Percent size={20} className="mr-2  text-gray-300" />
                  Taxes
                </div>
              }
              value={120}
            />
            <CheckoutTotalItem
              title={
                <div className="flex items-center">
                  <Truck size={20} className="mr-2  text-gray-300" />
                  Delivary
                </div>
              }
              value={500}
            />
            <Button
              type="submit"
              className="w-full h-14 rounded-xl mt-6 text-base"
            >
              Pay
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
