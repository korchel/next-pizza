'use client';

import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { CartDrawer } from "./cartDrawer/CartDrawer";
import { useCartStore } from "@/shared/store";

interface Props {
  className?: string;
}

export const CartButton: FC<Props> = ({ className }) => {
    const { totalCost, loading } = useCartStore();

  return (
    <CartDrawer>
      <Button loading={loading} className={cn(className, "group relative")}>
        <b>{totalCost} p</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} strokeWidth={2} />
          <b>3</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};