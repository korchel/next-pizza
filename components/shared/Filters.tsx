"use client";

import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import qs from "qs";
import { Title } from "./Title";
import { Input } from "../ui";
import { RangeSlider } from "./RangeSlider";
import { CheckboxFiltersGroup } from "./CheckboxFiltersGroup";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import { useRouter, useSearchParams } from "next/navigation";

interface IFiltersProps {
  className?: string;
}

interface IPriceRange {
  from?: number;
  to?: number;
}

export const Filters: FC<IFiltersProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(searchParams);

  const [pizzaTypes, { toggle: togglePizzaType }] = useSet<string>(new Set([]));
  const [sizes, { toggle: toggleSizes }] = useSet<string>(new Set([]));
  const { ingredients, loading, onAddId, selectedIngredientIds } =
    useFilterIngredients();
  const [priceRange, setPriceRange] = useState<IPriceRange>({});

  const items = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  const changePriceRange = (name: keyof IPriceRange, value: number) => {
    setPriceRange({
      ...priceRange,
      [name]: value,
    });
  };

  useEffect(() => {
    const currentFilters = {
      ...priceRange,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredientIds),
    };
    const query = qs.stringify(currentFilters, {
      arrayFormat: "comma",
      skipNulls: true,
    });
    router.push(`/?${query}`, { scroll: false });
  }, [priceRange, pizzaTypes, selectedIngredientIds, sizes]);

  return (
    <div className={cn(className)}>
      <Title text="filter" size="sm" className="mb-5 font-bold" />
      <CheckboxFiltersGroup
        name="pizzaTypes"
        title="Pizza types"
        className="mb-5"
        selected={pizzaTypes}
        items={[
          { text: "Thin", value: "1" },
          { text: "Traditional", value: "2" },
        ]}
        onCheck={togglePizzaType}
      />
      <CheckboxFiltersGroup
        name="sizes"
        title="Sizes"
        className="mb-5"
        selected={sizes}
        items={[
          { text: "20cm", value: "20" },
          { text: "30cm", value: "30" },
          { text: "40cm", value: "40" },
        ]}
        onCheck={toggleSizes}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p>Price from to</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
            value={priceRange.from}
            onChange={(e) => changePriceRange("from", +e.target.value)}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={priceRange.to}
            onChange={(e) => changePriceRange("to", +e.target.value)}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[priceRange.from || 0, priceRange.to || 1000]}
          onValueChange={([from, to]) => setPriceRange({ from, to })}
        />
      </div>
      <CheckboxFiltersGroup
        name="ingredients"
        title="ingeridents"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onCheck={onAddId}
        selected={selectedIngredientIds}
      />
    </div>
  );
};
