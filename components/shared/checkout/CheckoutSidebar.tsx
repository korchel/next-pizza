import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { FC } from "react";

import { WhiteBlock } from "../WhiteBlock";
import { CheckoutTotalItem } from "./CheckoutTotalItem";
import { Button } from "@/components/ui";
import { cn } from "@/shared/lib";

const TAX = 15;
const DELIVERY_PRICE = 250;

interface Props {
  totalCost: number;
  className?: string;
}

export const CheckoutSidebar: FC<Props> = ({ totalCost, className }) => {
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total: </span>
        <span className="text-xl font-extrabold">
          {totalCost + (totalCost * TAX) / 100 + DELIVERY_PRICE} P
        </span>
      </div>
      <CheckoutTotalItem
        title={
          <div className="flex items-center">
            <Package size={20} className="mr-2  text-gray-300" />
            Cost
          </div>
        }
        value={totalCost}
      />
      <CheckoutTotalItem
        title={
          <div className="flex items-center">
            <Percent size={20} className="mr-2 text-gray-300" />
            Taxes
          </div>
        }
        value={(totalCost * TAX) / 100}
      />
      <CheckoutTotalItem
        title={
          <div className="flex items-center">
            <Truck size={20} className="mr-2  text-gray-300" />
            Delivary
          </div>
        }
        value={DELIVERY_PRICE}
      />
      <Button type="submit" className="w-full h-14 rounded-xl mt-6 text-base">
        Pay
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
