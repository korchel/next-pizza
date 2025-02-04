"use client";

import { FC } from "react";
import toast from "react-hot-toast";

import { useCartStore } from "@/shared/store";
import { Ingredient, Product, ProductVariant } from "@prisma/client";
import { PizzaForm } from "./PizzaForm";
import { ProductForm } from "./ProductForm";

interface Props {
  product: Product & { variants: ProductVariant[]; ingredients: Ingredient[] };
  close?: VoidFunction;
  className?: string;
}

export const ProductInfo: FC<Props> = ({ product, close }) => {
  const isPizza = product.categoryId === 1;

  const { addCartItem, loading } = useCartStore((state) => state);

  const onSubmit = async (
    productVariantId?: number,
    ingredients?: number[]
  ) => {
    try {
      await addCartItem({ productVariantId, ingredients });
      toast.success("Товар добавлен в корзину", {
        icon: "✅",
      });
      close?.();
    } catch (error) {
      toast.error("Ошибка при добавлении товара в корзину", {
        icon: "❌",
      });
      console.error(error);
    }
  };

  if (isPizza) {
    return (
      <PizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        addToCart={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      addToCart={() => onSubmit(product.variants[0].id)}
      price={product.variants[0].price}
      loading={loading}
    />
  );
};
