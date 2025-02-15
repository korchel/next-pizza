import { FC, PropsWithChildren, ReactNode } from "react";

import { Title } from "../ui";
import { cn } from "@/shared/lib/utils";

interface Props {
  title?: string;
  endAdornment?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const WhiteBlock: FC<PropsWithChildren<Props>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("p-4 sm:px-5 sm:py-4", contentClassName)}>
        {children}
      </div>
    </div>
  );
};
