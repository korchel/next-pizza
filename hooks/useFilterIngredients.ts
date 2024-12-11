import { api } from "@/services/apiClient";
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface IFilteredIngredients {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): IFilteredIngredients => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, { toggle }] = useSet<string>(new Set([]));

  useEffect(() => {
    setLoading(true);
    api.ingredients
      .getAll()
      .then((data) => {
        setIngredients(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false)
      });
  }, []);

  return { ingredients, loading, selectedIds, onAddId: toggle };
};