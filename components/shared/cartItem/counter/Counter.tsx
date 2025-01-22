import { cn } from "@/shared/lib/utils";
import React from "react";
import { PlusMinusButton } from "./PlusMinusButton";

export interface Props {
  value?: number;
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
}

export const Counter: React.FC<Props> = ({ className, onClick, value = 1 }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className
      )}
    >
      <PlusMinusButton
        onClick={() => onClick?.("minus")}
        disabled={value === 1}
        type="minus"
      />

      <b className="text-sm">{value}</b>

      <PlusMinusButton onClick={() => onClick?.("plus")} type="plus" />
    </div>
  );
};
