import { Product, Category, Unit } from "@prisma/client";
import { fetcher } from "./fetcher";

export type CategoryPopulated = {
  name: string;
  Products: Product[];
};
export const fetchCategoriesPopulated = async () =>
  await fetcher<CategoryPopulated[]>("/api/products/categories");

export const fetchCategories = async () =>
  await fetcher<Category[]>("/api/categories");

export const fetchUnits = async () => await fetcher<Unit[]>("/api/units");

export type PostProduct = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "image"
>;

export const postProduct = async (product: PostProduct) =>
  await fetcher<Product>("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
