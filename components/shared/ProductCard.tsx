import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { Title } from "./Title";
import { Plus } from "lucide-react";
import { Button } from "../ui";

interface IProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: FC<IProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">ingredient1, ingredient2</p>
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