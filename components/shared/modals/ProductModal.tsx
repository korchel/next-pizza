'use client';

import { Dialog, DialogContent } from "@/components/ui";
import { Ingredient, Product, ProductVariant } from "@prisma/client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { ProductForm } from "../ProductForm";
import { PizzaForm } from "../PizzaForm";
import { useCartStore } from "@/shared/store";

interface IProductModalProps {
  product: Product & { variants: ProductVariant[]; ingredients: Ingredient[] };
  className?: string;
}

export const ProductModal: FC<IProductModalProps> = ({ product }) => {
  const router = useRouter();
  const { addCartItem } = useCartStore(state => state);

  const productVariant = product.variants[0];
  const isPizza = product.categoryId === 1;

  const addProduct = () => {
    addCartItem({
      productVariantId: productVariant.id,
    });
  };

  const addPizza = (productVariantId: number, ingredients: number[]) => {
    addCartItem({
      itemsId: productVariantId,
      ingredients,
    })
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060] min-h-[550px] bg-white overflow-hidden">
        {isPizza ? (
          <PizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            addToCart={addPizza}
          />
        ) : (
            <ProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              addToCart={addProduct}
              price={productVariant.price}
            />
        )}
      </DialogContent>
      
    </Dialog>
  )
};