import { Product } from "@prisma/client";
import { fetcher } from "./fetcher";

export type CategoryPopulated = {
  name: string;
  Products: Product[];
};
export const fetchCategories = async () =>
  await fetcher<CategoryPopulated[]>("/api/products/categories");
