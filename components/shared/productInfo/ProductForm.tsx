import { FC } from "react";

import { cn } from "@/shared/lib/utils";
import { Button, Title } from "../../ui";
import { ProductImage } from "./ProductImage";

interface Props {
  imageUrl: string;
  name: string;
  addToCart: () => void;
  className?: string;
  price: number;
  loading: boolean;
}

export const ProductForm: FC<Props> = ({
  imageUrl,
  name,
  addToCart,
  className,
  price,
  loading,
}) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage imageUrl={imageUrl} name={name} />
      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={addToCart}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-auto"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
