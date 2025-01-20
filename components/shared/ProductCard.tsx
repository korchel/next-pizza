import Link from "next/link";
import { FC } from "react";
import { Plus } from "lucide-react";

import { Button, Title } from "../ui";
import { Ingredient } from "@prisma/client";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          {ingredients.map((ingredient) => ingredient.name).join(", ")}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span>
            from <b>{price} p</b>
          </span>
          <Button variant="secondary">
            <Plus size={20} className="mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  );
};
