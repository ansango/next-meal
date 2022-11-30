import { Product, Category, Unit } from "@prisma/client";
export type { Product, Category, Unit };
export type ProductPopulated = Omit<Product, "categoryId" | "unitId"> & {
  Category: Category;
  Unit: Unit;
};

export type CategoryPopulated = {
  name: string;
  id: string;
  Products: ProductPopulated[];
};

export type PostProduct = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "image"
>;
