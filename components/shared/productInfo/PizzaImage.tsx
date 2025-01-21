import { FC } from "react";
import Image from "next/image";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
  name: string;
}

export const PizzaImage: FC<Props> = ({ className, imageUrl, size, name }) => {
  const imageSizes = {
    20: 300,
    30: 400,
    40: 500,
  };
  return (
    <div
      className={cn(
        className,
        "flex items-center justify-center flex-1 relative"
      )}
    >
      <Image
        height={imageSizes[size]}
        width={imageSizes[size]}
        src={imageUrl}
        alt={name}
        className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
      />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        border-dashed border-2 rounded-full border-gray-200
        w-[450px] h-[450px]`}
      />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        border-dashed border-2 rounded-full border-gray-200
        w-[370px] h-[370px]`}
      />
    </div>
  );
};
