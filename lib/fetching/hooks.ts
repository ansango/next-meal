import { Product } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  CategoryPopulated,
  fetchCategoriesPopulated,
  fetchCategories,
  fetchUnits,
  postProduct,
  PostProduct,
  putProduct,
  deleteProduct,
} from "./functions";

const staticConfig = { refetchOnMount: false, refetchOnWindowFocus: false };

export const useCategoriesWithProducts = () =>
  useQuery(["categories-populated"], fetchCategoriesPopulated, {
    refetchOnWindowFocus: true,
    select: useCallback(
      (data: CategoryPopulated[]) => [
        {
          name: "Todos",
          Products:
            data
              .flatMap(({ Products }) => Products)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              ) ?? [],
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

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["post-product"],
    mutationFn: async (product: PostProduct) => postProduct(product),
    onSuccess: (data) => {
      queryClient.setQueryData(["post-product", data.id], data);
      queryClient.invalidateQueries(["categories-populated"]);
    },
  });
};

export const usePutProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["put-product"],
    mutationFn: async (product: Product) => putProduct(product),
    onSuccess: (data) => {
      queryClient.setQueryData(["put-product", data.id], data);
      queryClient.invalidateQueries(["categories-populated"]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async (id: string) => deleteProduct(id),
    onSuccess: (data) => {
      queryClient.setQueryData(["delete-product", data.id], undefined);
      queryClient.invalidateQueries(["categories-populated"]);
    },
  });
};
