"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
      <VisuallyHidden>
        <Dialog.DialogTitle>Информация о продукте и заказ</Dialog.DialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <Dialog.DialogDescription>
          Информация о продукте и заказ
        </Dialog.DialogDescription>
      </VisuallyHidden>
      <Dialog.DialogContent className="p-0  lg:min-w-[1000px] min-h-[550px] bg-white overflow-hidden">
        <ProductInfo product={product} close={() => router.back()} />
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
};
