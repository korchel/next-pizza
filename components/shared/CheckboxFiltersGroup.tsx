import { cn } from "@/lib/utils";
import { FC } from "react";
import { IFilterChecboxProps } from "./FilterCheckbox";
import { Input } from "../ui";

type Item = IFilterChecboxProps;

interface ICheckboxFiltersGroup {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  placeholder?: string;
  onChange?: (values: string[]) => void;
  className?: string;
}

export const CheckboxFiltersGroup: FC<ICheckboxFiltersGroup> = ({ title, items, defaultItems, limit = 5, onChange, placeholder = "Search...", className }) => {
  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mb-5">
        <Input placeholder={placeholder} className="bg-gray-50 border-none" />
      </div>
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">

      </div>
    </div>
  );
};