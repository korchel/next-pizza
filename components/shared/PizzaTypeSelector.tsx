"use client";

import { cn } from "@/shared/lib/utils";
import { FC } from "react";

type Type = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface IPizzaTypeSelectorProps {
  items: readonly Type[];
  onClick: (value: Type["value"]) => void;
  selectedValue: Type["value"];
  className?: string;
}

export const PizzaTypeSelector: FC<IPizzaTypeSelectorProps> = ({
  items,
  onClick,
  selectedValue,
  className,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none"
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": item.value === selectedValue,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
