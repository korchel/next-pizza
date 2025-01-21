import { FC } from "react";

import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
}

export const ProductImage: FC<Props> = ({ className, imageUrl, name }) => {
  return (
    <div
      className={cn(
        className,
        "flex items-center justify-center flex-1 relative w-[350px] h-[350px]"
      )}
    >
      <Image
        src={imageUrl}
        alt={name}
        width={350}
        height={350}
        className={"relative left-2 top-2 transition-all z-10 duration-300"}
      />
    </div>
  );
};
