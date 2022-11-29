import { Input, InputProps } from "@material-tailwind/react";
import { FC } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";

type Props = { name: string; options?: RegisterOptions } & InputProps;

const FormInput: FC<Props> = ({ name, options, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return <Input {...rest} {...register(name, { ...options })} />;
};

export default FormInput;
