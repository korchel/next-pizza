import { cn } from "@/shared/lib/utils";
import { FC, useState } from "react";
import { useSet } from "react-use";

import { PizzaImage } from "./PizzaImage";
import { Title } from "./Title";
import { Button } from "../ui";
import { PizzaTypeSelector } from "./PizzaTypeSelector";
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductVariant } from "@prisma/client";
import { IngredientTag } from "./IngredientTag";

interface IPizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  addToCart: VoidFunction;
  className?: string;
}

export const PizzaForm: FC<IPizzaFormProps> = ({
  imageUrl,
  name,
  ingredients,
  variants,
  addToCart,
  className
}) => {
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const pizzaPrice = variants.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const ingredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice + ingredientsPrice;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">30 cm traditional</p>
        <PizzaTypeSelector
          items={pizzaSizes}
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
        
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" onClick={addToCart}>
          Add to cart for {totalPrice}
        </Button>
      </div>
    </div>
  )
};