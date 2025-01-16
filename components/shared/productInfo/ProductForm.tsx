import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { Title } from "../Title";
import { Button } from "../../ui";
import { ProductImage } from "../ProductImage";

interface IProductFormProps {
  imageUrl: string;
  name: string;
  addToCart: () => void;
  className?: string;
  price: number;
  loading: boolean;
}

export const ProductForm: FC<IProductFormProps> = ({
  imageUrl,
  name,
  addToCart,
  className,
  price,
  loading,
}) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage imageUrl={imageUrl} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={addToCart}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Buy for {price}
        </Button>
      </div>
    </div>
  );
};
