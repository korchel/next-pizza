import { cn } from "@/shared/lib/utils";
import { FC } from "react";

import * as CartIem from "../cartItem";
import { Trash2Icon } from "lucide-react";

interface Props extends CartIem.ICartItemProps {
  clickCounter: (type: "plus" | "minus") => void;
  removeItem: () => void;
  className?: string;
}

export const CartDrawerItem: FC<Props> = ({
  imageUrl,
  details,
  name,
  price,
  quantity,
  clickCounter,
  removeItem,
  disabled,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex bg-white p-5 gap-6",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      <CartIem.Picture src={imageUrl} alt={name} />
      <div className="flex-1">
        <CartIem.Info name={name} details={details} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CartIem.Counter onClick={clickCounter} value={quantity} />
          <div className="flex items-center gap-3">
            <CartIem.Price value={price} />
            <Trash2Icon
              onClick={removeItem}
              className="text-gray-400 cursor-pointer horver:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
