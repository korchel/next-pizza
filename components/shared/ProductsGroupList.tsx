"use client";

import { cn } from "@/lib/utils";
import { FC, useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { Title } from "./Title";
import { ProductCard } from "./ProductCard";
import { useCategoryStore } from "@/store/category";

interface IProductsGroupListProps {
  title: string;
  items: any[];
  listClassName?: string;
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: FC<IProductsGroupListProps> = ({
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
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};