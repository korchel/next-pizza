import { cn } from "@/shared/lib";
import React, { FC } from "react";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface ITitleProps {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title: FC<ITitleProps> = ({ text, size = "sm", className }) => {
  const mapTagBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
  } as const;

  const mapClassNameBySize = {
    xs: "text-[16px]",
    sm: "text-[16px] sm:text-[18px] md:text-[22px]",
    md: "text-[26px]",
    lg: "text-[20px] sm:text-[26px] md:text-[32px]",
    xl: "text-[40px]",
    "2xl": "text-[48px]",
  } as const;

  return React.createElement(
    mapTagBySize[size],
    { className: cn(mapClassNameBySize[size], className) },
    text
  );
};
