"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { ICartItemProps } from "../cartItem/props";
import * as CartItem from "../cartItem";
import { Ingredient } from "@prisma/client";

interface Props extends ICartItemProps {
  clickCounter: (type: "plus" | "minus") => void;
  removeItem: () => void;
  ingredients?: Ingredient[];
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  clickCounter,
  removeItem,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} details={details} />
      </div>

      <CartItem.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItem.Counter onClick={clickCounter} value={quantity} />
        <button type="button" onClick={removeItem}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
