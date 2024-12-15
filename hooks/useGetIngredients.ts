import { api } from "@/services/apiClient";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

interface IFilteredIngredients {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useGetIngredients = (): IFilteredIngredients => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.ingredients
      .getAll()
      .then((data) => {
        setIngredients(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { ingredients, loading };
};
