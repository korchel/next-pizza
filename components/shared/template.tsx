import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  className?: string;
}

export const Template: FC<Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      
    </div>
  )
};