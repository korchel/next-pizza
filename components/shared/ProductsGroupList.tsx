"use client";

import { cn } from "@/shared/lib/utils";
import { FC, useEffect, useRef } from "react";
import { useIntersection } from "react-use";

import { Title } from "../ui";
import { ProductCard } from "./ProductCard";
import { useCategoryStore } from "@/shared/store/category";
import { Ingredient, Product, ProductVariant } from "@prisma/client";

interface Props {
  title: string;
  items: (Product & {
    variants: ProductVariant[];
    ingredients: Ingredient[];
  })[];
  listClassName?: string;
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setCurrentCategoryId = useCategoryStore((state) => state.setCurrentId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setCurrentCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={cn(className)} id={`${categoryId}`} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div
        className={cn(
          "grid md:grid-cols-2 xl:grid-cols-3 gap-[50px]",
          listClassName
        )}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variants[0].price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};
