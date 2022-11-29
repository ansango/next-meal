import { Product } from "@prisma/client";
import { useQuery, useQueries, useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  CategoryPopulated,
  fetchCategoriesPopulated,
  fetchCategories,
  fetchUnits,
  postProduct,
  PostProduct,
} from "./functions";

const staticConfig = { refetchOnMount: false, refetchOnWindowFocus: false };

export const useCategoriesWithProducts = () =>
  useQuery(["categories-populated"], fetchCategoriesPopulated, {
    refetchOnWindowFocus: true,
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

export const useCategories = () =>
  useQuery(["categories"], fetchCategories, {
    ...staticConfig,
  });

export const useUnits = () =>
  useQuery(["units"], fetchUnits, {
    ...staticConfig,
  });

export const usePostProduct = () =>
  useMutation({
    mutationKey: ["post-product"],
    mutationFn: async (product: PostProduct) => postProduct(product),
  });
