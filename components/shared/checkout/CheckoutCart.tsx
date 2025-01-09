import { FC } from "react";

import { getCartItemDetails, ICartItem } from "@/shared/lib";
import { WhiteBlock } from "../WhiteBlock";
import { CheckoutCartItem } from "./CheckoutCartItem";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

interface Props {
  removeCartItem: (id: number) => void;
  updateQuantity: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  items: ICartItem[];
}

export const CheckoutCart: FC<Props> = ({
  items,
  removeCartItem,
  updateQuantity,
}) => {
  return (
    <WhiteBlock title="1. Cart">
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <CheckoutCartItem
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
            disabled={item.disabled}
          />
        ))}
      </div>
    </WhiteBlock>
  );
};
