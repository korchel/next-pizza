"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import { Dialog } from "@/components/ui";
import { Ingredient, Product, ProductVariant } from "@prisma/client";
import { ProductInfo } from "../productInfo";

interface Props {
  product: Product & { variants: ProductVariant[]; ingredients: Ingredient[] };
  className?: string;
}

export const ProductModal: FC<Props> = ({ product }) => {
  const router = useRouter();

  return (
    <Dialog.Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <Dialog.DialogContent className="p-0 w-[1060px] max-w-[1060] min-h-[550px] bg-white overflow-hidden">
        <ProductInfo product={product} close={() => router.back()} />
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
};
