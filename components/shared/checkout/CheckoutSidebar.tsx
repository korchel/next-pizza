import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { FC } from "react";

import { WhiteBlock } from "../WhiteBlock";
import { CheckoutTotalItem } from "./CheckoutTotalItem";
import { Button, Skeleton } from "@/components/ui";
import { cn } from "@/shared/lib";

const TAX = 15;
const DELIVERY_PRICE = 250;

interface Props {
  totalCost: number;
  loading: boolean;
  className?: string;
}

export const CheckoutSidebar: FC<Props> = ({
  totalCost,
  loading,
  className,
}) => {
  const taxes = (totalCost * TAX) / 100;
  const costIncludingTaxesAndDelivary = totalCost + taxes + DELIVERY_PRICE;

  return (
    <WhiteBlock className={cn("p-6 sticky top-4 h-[370px]", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-7 w-full" />
        ) : (
          <span className="text-xl font-extrabold">
            {costIncludingTaxesAndDelivary} ₽
          </span>
        )}
      </div>
      <CheckoutTotalItem
        title={
          <div className="flex items-center">
            <Package size={20} className="mr-2  text-gray-300" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-7 w-14 rounded-[6px]" />
          ) : (
            `${totalCost} ₽`
          )
        }
      />
      <CheckoutTotalItem
        title={
          <div className="flex items-center">
            <Percent size={20} className="mr-2 text-gray-300" />
            Налоги:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-7 w-14 rounded-[6px]" />
          ) : (
            `${taxes} ₽`
          )
        }
      />
      <CheckoutTotalItem
        title={
          <div className="flex items-center">
            <Truck size={20} className="mr-2  text-gray-300" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-7 w-14 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₽`
          )
        }
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-xl mt-6 text-base"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
