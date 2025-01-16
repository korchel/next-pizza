"use client";

import { Dialog, DialogContent } from "@/components/ui";
import { Ingredient, Product, ProductVariant } from "@prisma/client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { ProductInfo } from "../productInfo";

interface IProductModalProps {
  product: Product & { variants: ProductVariant[]; ingredients: Ingredient[] };
  className?: string;
}

export const ProductModal: FC<IProductModalProps> = ({ product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060] min-h-[550px] bg-white overflow-hidden">
        <ProductInfo product={product} close={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
