import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { getAvailablePizzaSizes } from "../lib";
import { ProductVariant } from "@prisma/client";
import { useSet } from "react-use";

type SizeVariant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface IReturnType {
  type: PizzaType;
  size: PizzaSize;
  selectedIngredients: Set<number>;
  availableSizes: SizeVariant[];
  currentItemId: number | undefined;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductVariant[]): IReturnType => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailablePizzaSizes(variants, type);

  const currentItemId = variants.find((variant) => variant.pizzaType === type && variant.size === size)?.id;

  useEffect(() => {
    const isCurrentSizeAvailable = availableSizes.find(
      (availableSize) =>
        Number(availableSize.value) === size && !availableSize.disabled
    );
    const availableSize = availableSizes.find(
      (availableSize) => !availableSize.disabled
    );
    if (!isCurrentSizeAvailable && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    type,
    size,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
