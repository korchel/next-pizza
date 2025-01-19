"use client";

import { cn } from "@/shared/lib";
import { FC } from "react";

import { PizzaImage } from "../PizzaImage";
import { Title } from "../Title";
import { Button } from "../../ui";
import { PizzaTypeSelector } from "../PizzaTypeSelector";
import { PizzaSize, PizzaType, pizzaTypes, typesMap } from "@/shared/constants";
import { Ingredient, ProductVariant } from "@prisma/client";
import { IngredientTag } from "../IngredientTag";
import { calcPizzaPrice } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface IPizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  addToCart: (itemId: number, ingredients?: number[]) => void;
  loading: boolean;
  className?: string;
}

export const PizzaForm: FC<IPizzaFormProps> = ({
  imageUrl,
  name,
  ingredients,
  variants,
  addToCart,
  loading,
  className,
}) => {
  const {
    type,
    size,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(variants);

  const totalPrice = calcPizzaPrice(
    variants,
    ingredients,
    size,
    type,
    selectedIngredients
  );

  const handleClick = () => {
    if (currentItemId) {
      addToCart(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{`${size} cm, ${typesMap[type]}`}</p>
        <PizzaTypeSelector
          items={availableSizes}
          selectedValue={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
        />
        <PizzaTypeSelector
          items={pizzaTypes}
          selectedValue={String(type)}
          onClick={(value) => setType(Number(value) as PizzaType)}
        />
        <div className="pg-gray-50 p-5 mt-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientTag
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClick}
        >
          Add to cart for {totalPrice}
        </Button>
      </div>
    </div>
  );
};
