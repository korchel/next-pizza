"use client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";
import { FC } from "react";

interface ICategoriesProps {
  items: Category[];
  className?: string;
}

export const Categories: FC<ICategoriesProps> = ({ items, className }) => {
  const currentId = useCategoryStore((state) => state.currentId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map((item) => (
        <a
          key={item.id}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            currentId === item.id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`#${item.id}`}
        >
          <button>{item.name}</button>
        </a>
      ))}
    </div>
  );
};
