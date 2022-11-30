import { Product, Category, Unit } from "@prisma/client";
import { fetcher } from "./fetcher";

export type ProductPopulated = Omit<Product, "categoryId" | "unitId"> & {
  Category: Category;
  Unit: Unit;
};

export type CategoryPopulated = {
  name: string;
  id: string;
  Products: ProductPopulated[];
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

export const putProduct = async (product: Product) =>
  await fetcher<Product>(`/api/product/${product.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

export const deleteProduct = async (id: string) =>
  await fetcher<Product>(`/api/product/${id}`, {
    method: "DELETE",
  });
