import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { CategoryPopulated, fetchCategories } from "./functions";

export const useCategoriesWithProducts = () =>
  useQuery(["categories"], fetchCategories, {
    select: useCallback(
      (data: CategoryPopulated[]) => [
        {
          name: "Todos",
          Products: data.flatMap(({ Products }) => Products) ?? [],
        },
        ...data,
      ],
      []
    ),
  });
