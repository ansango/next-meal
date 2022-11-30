import { Meal, CategoryMeal, Product, Unit } from "@prisma/client";

export type MealProductCategory = Omit<Meal, "categoryId"> & {
  category: CategoryMeal;
  products: Omit<Product[], "unitId"> & { unit: Unit };
};
