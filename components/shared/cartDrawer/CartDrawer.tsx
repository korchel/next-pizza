"use client";

import { cn } from "@/shared/lib/utils";
import { FC, PropsWithChildren, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button, Sheet } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./CartDrawerItem";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Title } from "../../ui";
import { useCart } from "@/shared/hooks";
import { Routes } from "@/shared/constants/routes";

export const CartDrawer: FC<PropsWithChildren> = ({ children }) => {
  const { totalCost, items, updateItemQuantity, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  const updateQuantity = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const updatedQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, updatedQuantity);
  };

  return (
    <div>
      <Sheet.Sheet>
        <Sheet.SheetTrigger asChild>{children}</Sheet.SheetTrigger>
        <Sheet.SheetDescription>Превью корзины</Sheet.SheetDescription>
        <Sheet.SheetContent
          className={cn(
            "flex flex-col justify-between pb-0 bg-[#F4F1EE]",
            !totalCost && "justify-center"
          )}
        >
          {!totalCost && (
            <div className="flex flex-col mx-auto">
              <Image
                src="/assets/empty-box.png"
                alt="empty cart"
                width={120}
                height={120}
              />
              <Title
                text="Корзина пуста"
                size="sm"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте что-нибудь, чтобы сделать заказ
              </p>
              <Sheet.SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Назад
                </Button>
              </Sheet.SheetClose>
            </div>
          )}
          {totalCost > 0 && (
            <>
              <Sheet.SheetHeader>
                <Sheet.SheetTitle>
                  В корзине{" "}
                  <span className="font-bold">{items.length} товаров</span>
                </Sheet.SheetTitle>
              </Sheet.SheetHeader>
              <div className="-mx-6 mt-5 overflow-hidden flex-1">
                {items.map((item) => (
                  <CartDrawerItem
                    key={item.id}
                    imageUrl={item.imageUrl}
                    id={item.id}
                    details={getCartItemDetails(
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize,
                      item.ingredients
                    )}
                    disabled={item.disabled}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    clickCounter={(type) =>
                      updateQuantity(item.id, item.quantity, type)
                    }
                    className="mb-2"
                    removeItem={() => removeCartItem(item.id)}
                  />
                ))}
              </div>
              <Sheet.SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <div className="flex flex-1 text-lg text-neutral-500">
                      <div>Всего:</div>
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relatove -top-1 mx-2" />
                    </div>
                    <div className="font-bold text-lg">{totalCost} ₽</div>
                  </div>
                  <Link href={Routes.CHECKOUT}>
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформить заказ
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </Sheet.SheetFooter>
            </>
          )}
        </Sheet.SheetContent>
      </Sheet.Sheet>
    </div>
  );
};
