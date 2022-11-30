import { FormSelect } from "components";
import { useUnits } from "modules/product/repository";

export const Units = ({ selectedOption }: { selectedOption?: string }) => {
  const { data } = useUnits();
  return (
    <FormSelect
      name="unitId"
      optionData={
        (data &&
          data.map((unit) => ({
            label: unit.name,
            value: unit.id,
          }))) ||
        []
      }
      selectProps={{
        size: "lg",
        label: "Unidad",
        value: selectedOption,
      }}
    />
  );
};
