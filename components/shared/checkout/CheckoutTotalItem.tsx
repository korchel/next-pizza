import { FC, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  title: ReactNode;
  value: ReactNode;
  className?: string;
}

export const CheckoutTotalItem: FC<Props> = ({ title, value, className }) => {
  return (
    <div className={cn(className, "flex my-4")}>
      <div className="flex flex-1 text-lg text-neutral-500">
        {title}:
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </div>
      <span className="font-bold">{value}</span>
    </div>
  );
};
