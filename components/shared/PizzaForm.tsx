import { cn } from "@/shared/lib/utils";
import { FC, useState } from "react";
import { PizzaImage } from "./PizzaImage";
import { Title } from "./Title";
import { Button } from "../ui";
import { PizzaTypeSelector } from "./PizzaTypeSelector";
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";

interface IPizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  addToCart: VoidFunction;
  className?: string;
}

export const PizzaForm: FC<IPizzaFormProps> = ({
  imageUrl,
  name,
  ingredients,
  items,
  addToCart,
  className
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
   const [type, setType] = useState<PizzaType>(1);
  const details = '30 cm traditional';


  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{details}</p>
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
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" onClick={addToCart}>
          ffff
        </Button>
      </div>
    </div>
  )
};