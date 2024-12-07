"use client";

import { cn } from "@/lib/utils";
import { ChangeEventHandler, FC, useState } from "react";
import { FilterCheckbox, IFilterChecboxProps } from "./FilterCheckbox";
import { Input } from "../ui";

type Item = IFilterChecboxProps;

interface ICheckboxFiltersGroup {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  placeholder?: string;
  onChange?: (values: string[]) => void;
  className?: string;
}

export const CheckboxFiltersGroup: FC<ICheckboxFiltersGroup> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  onChange,
  placeholder = "Search...",
  className,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);

  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearch}
            placeholder={placeholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={false}
            onCheckedChange={(ids) => console.log(ids)}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="test-primary mt-3"
          >
            {showAll ? "Hide" : "Show"}
          </button>
        </div>
      )}
    </div>
  );
};
