import { FC } from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  imageUrl: string;
}

export const ProductImage: FC<Props> = ({ className, imageUrl }) => {
  return (
    <div
      className={cn(
        className,
        "flex items-center justify-center flex-1 relative w-[350px] h-[350px]"
      )}
    >
      <img
        src={imageUrl}
        alt=""
        className={"relative left-2 top-2 transition-all z-10 duration-300"}
      />
    </div>
  );
};
