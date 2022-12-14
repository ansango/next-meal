import { fetcher } from "lib/fetch";
import {
  Category,
  CategoryPopulated,
  PostProduct,
  Product,
  Unit,
} from "../domain";

export const fetchCategoriesPopulated = async () =>
  await fetcher<CategoryPopulated[]>("/api/products/categories");

export const fetchCategories = async () =>
  await fetcher<Category[]>("/api/categories");

export const fetchUnits = async () => await fetcher<Unit[]>("/api/units");

export const postProduct = async (product: PostProduct) =>
  await fetcher<Product>("/api/product", {
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
