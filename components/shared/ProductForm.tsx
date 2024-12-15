import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { Title } from "./Title";
import { Button } from "../ui";
import { ProuctImage } from "./ProuctImage";

interface IProductFormProps {
  imageUrl: string;
  name: string;
  addToCart: VoidFunction;
  className?: string;
}

export const ProductForm: FC<IProductFormProps> = ({
  imageUrl,
  name,
  addToCart,
  className
}) => {
  const details = '30 cm traditional';
  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProuctImage imageUrl={imageUrl} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{details}</p>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" onClick={addToCart}>
          ffff
        </Button>
      </div>
    </div>
  )
};