import { FormSelect } from "components";
import { useCategories } from "modules/product/repository";

export const Categories = ({ selectedOption }: { selectedOption?: string }) => {
  const { data } = useCategories();
  return (
    <FormSelect
      name="categoryId"
      optionData={
        (data &&
          data.map((category) => ({
            label: category.name,
            value: category.id,
          }))) ||
        []
      }
      selectProps={{
        label: "Categoría",
        size: "lg",
        value: selectedOption,
      }}
    />
  );
};
