import React, { FC, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        `mx-auto px-2 sm:px-3 md:px-4 lg-px-5
        max-w-[400px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]`,
        className
      )}
    >
      {children}
    </div>
  );
};
