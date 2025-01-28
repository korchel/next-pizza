import React, { FC, PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mx-auto md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]",
        className
      )}
    >
      {children}
    </div>
  );
};
