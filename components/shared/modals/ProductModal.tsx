"use client";

import { Dialog, DialogContent } from "@/components/ui";
import { Ingredient, Product, ProductVariant } from "@prisma/client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { ProductForm } from "../ProductForm";
import { PizzaForm } from "../PizzaForm";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface IProductModalProps {
  product: Product & { variants: ProductVariant[]; ingredients: Ingredient[] };
  className?: string;
}

export const ProductModal: FC<IProductModalProps> = ({ product }) => {
  const router = useRouter();
  const { addCartItem, loading } = useCartStore((state) => state);

  const isPizza = product.categoryId === 1;

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      await addCartItem({ productVariantId, ingredients });
      toast.success("Item added to cart");
      router.back();
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error(error);
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060] min-h-[550px] bg-white overflow-hidden">
        {isPizza ? (
          <PizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            addToCart={onSubmit}
            loading={loading}
          />
        ) : (
          <ProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            addToCart={() => onSubmit(product.variants[0].id)}
            price={product.variants[0].price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
