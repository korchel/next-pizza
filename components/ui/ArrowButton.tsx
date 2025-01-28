import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

import { cn } from "@/shared/lib";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "right" | "left";
  className?: string;
}

export const ArrowButton: FC<Props> = ({ direction, className, ...props }) => {
  const arrows = {
    right: <ChevronRight />,
    left: <ChevronLeft />,
    ...props,
  };
  return (
    <button
      className={cn(
        className,
        "rounded-full h-10 w-10 shadow-lg flex items-center justify-center bg-white hover:bg-gray-200 z-10 text-gray-500"
      )}
      {...props}
    >
      {arrows[direction]}
    </button>
  );
};
