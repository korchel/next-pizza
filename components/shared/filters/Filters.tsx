"use client";

import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import qs from "qs";
import { Title } from "../Title";
import { Input } from "../../ui";
import { RangeSlider } from "./RangeSlider";
import { CheckboxFiltersGroup } from "./CheckboxFiltersGroup";
import { useGetIngredients } from "@/shared/hooks/useGetIngredients";
import { useRouter, useSearchParams } from "next/navigation";

interface IFiltersProps {
  className?: string;
}

interface IPriceRange {
  from: number;
  to: number;
}

export const Filters: FC<IFiltersProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const chosenPriceRange = {
    from: searchParams?.get("from"),
    to: searchParams?.get("to"),
  };
  const chosenPizzaTypes = new Set(searchParams?.get("pizzaTypes")?.split(","));
  const chosenPizzaSizes = new Set(searchParams?.get("pizzaSizes")?.split(","));
  const chosenIngredientIds = new Set(
    searchParams?.get("ingredients")?.split(",")
  );

  const { ingredients, loading } = useGetIngredients();
  const displayIngredients = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  const changePriceRange = (key: keyof IPriceRange, value: number) => {
    const newPriceRange = { ...chosenPriceRange, [key]: String(value) };
    const query = getCurrentQuery(
      newPriceRange,
      chosenPizzaTypes,
      chosenPizzaSizes,
      chosenIngredientIds
    );
    router.push(`/?${query}`, { scroll: false });
  };

  const onSliderMove = ([from, to]: number[]) => {
    const newPriceRange = { from: String(from), to: String(to) };
    const query = getCurrentQuery(
      newPriceRange,
      chosenPizzaTypes,
      chosenPizzaSizes,
      chosenIngredientIds
    );
    router.push(`/?${query}`, { scroll: false });
  };

  const onTogglePizzaType = (value: string) => {
    const newPizzaTypes = toggleSet(chosenPizzaTypes, value);
    const query = getCurrentQuery(
      chosenPriceRange,
      newPizzaTypes,
      chosenPizzaSizes,
      chosenIngredientIds
    );
    router.push(`/?${query}`, { scroll: false });
  };

  const onTogglePizzaSize = (value: string) => {
    const newPizzaSizes = toggleSet(chosenPizzaSizes, value);
    const query = getCurrentQuery(
      chosenPriceRange,
      chosenPizzaTypes,
      newPizzaSizes,
      chosenIngredientIds
    );
    router.push(`/?${query}`, { scroll: false });
  };

  const onToggleIngredient = (value: string) => {
    const newIngredientIds = toggleSet(chosenIngredientIds, value);
    const query = getCurrentQuery(
      chosenPriceRange,
      chosenPizzaTypes,
      chosenPizzaSizes,
      newIngredientIds
    );
    router.push(`/?${query}`, { scroll: false });
  };

  return (
    <div className={cn(className)}>
      <Title text="filter" size="sm" className="mb-5 font-bold" />
      <CheckboxFiltersGroup
        name="pizzaTypes"
        title="Pizza types"
        className="mb-5"
        selected={chosenPizzaTypes || []}
        items={[
          { text: "Thin", value: "1" },
          { text: "Traditional", value: "2" },
        ]}
        onCheck={onTogglePizzaType}
      />
      <CheckboxFiltersGroup
        name="sizes"
        title="Sizes"
        className="mb-5"
        selected={chosenPizzaSizes}
        items={[
          { text: "20cm", value: "20" },
          { text: "30cm", value: "30" },
          { text: "40cm", value: "40" },
        ]}
        onCheck={onTogglePizzaSize}
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
            value={chosenPriceRange.from || 0}
            onChange={(e) => changePriceRange("from", +e.target.value)}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={chosenPriceRange.to || 1000}
            onChange={(e) => changePriceRange("to", +e.target.value)}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            +(chosenPriceRange.from || 0),
            +(chosenPriceRange.to || 1000),
          ]}
          onValueChange={onSliderMove}
        />
      </div>
      <CheckboxFiltersGroup
        name="ingredients"
        title="ingeridents"
        className="mt-5"
        limit={6}
        defaultItems={displayIngredients.slice(0, 6)}
        items={displayIngredients}
        loading={loading}
        onCheck={onToggleIngredient}
        selected={chosenIngredientIds}
      />
    </div>
  );
};

const getCurrentQuery = (
  priceRange: { from: string | null; to: string | null },
  pizzaTypes: Set<string>,
  pizzaSizes: Set<string>,
  chosenIngredientIds: Set<string>
) => {
  const currentFilters = {
    ...priceRange,
    pizzaTypes: Array.from(pizzaTypes),
    pizzaSizes: Array.from(pizzaSizes),
    ingredients: Array.from(chosenIngredientIds),
  };
  const query = qs.stringify(currentFilters, {
    arrayFormat: "comma",
    skipNulls: true,
  });
  return query;
};

const toggleSet = (set: Set<string>, value: string): Set<string> => {
  const newSet = new Set(set);
  if (set.has(value)) {
    newSet.delete(value);
  } else {
    newSet.add(value);
  }
  return newSet;
};
