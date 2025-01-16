import { FC } from "react";

import { getCartItemDetails, ICartItem } from "@/shared/lib";
import { WhiteBlock } from "../WhiteBlock";
import { CheckoutCartItem } from "./CheckoutCartItem";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CheckoutItemSkeleton } from "./CheckoutItemSkeleton";

interface Props {
  removeCartItem: (id: number) => void;
  updateQuantity: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  items: ICartItem[];
  loading: boolean;
}

export const CheckoutCart: FC<Props> = ({
  items,
  removeCartItem,
  updateQuantity,
  loading,
}) => {
  return (
    <WhiteBlock title="1. Cart">
      <div className="flex flex-col gap-5">
        {loading &&
          [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)}
        {!loading &&
          items.map((item) => (
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
