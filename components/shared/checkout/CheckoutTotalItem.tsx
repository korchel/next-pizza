import { cn } from "@/shared/lib/utils";
import { FC, ReactNode } from "react";

interface Props {
  title: ReactNode;
  value: number;
  className?: string;
}

export const CheckoutTotalItem: FC<Props> = ({ title, value, className }) => {
  return (
    <div className={cn(className, "flex my-4")}>
      <div className="flex flex-1 text-lg text-neutral-500">
        {title}:
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </div>
      <span className="font-bold">{value} p</span>
    </div>
  );
};
