import {
  Select,
  Option,
  SelectProps,
  SelectOptionProps,
  useSelect,
  Button,
} from "@material-tailwind/react";
import { FC } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import FormInput from "./Input";

type Props = {
  name: string;
  options?: RegisterOptions;
  selectProps?: Omit<SelectProps, "children">;
  optionProps?: SelectOptionProps;
  optionData: {
    label: string;
    value: string;
  }[];
};

const FormSelect: FC<Props> = ({
  name,
  options,
  selectProps,
  optionProps,
  optionData,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const selected = (data: any) => {
    data && setValue(name, data.key);
    return data?.props.children;
  };
  return (
    <>
      <input {...register(name, { ...options })} className="hidden" />
      {/*@ts-ignore*/}
      <Select {...selectProps} selected={selected}>
        {optionData.map(({ label, value }) => (
          <Option key={value} {...optionProps}>
            {label}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default FormSelect;
