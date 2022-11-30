import { Button, Form, FormInput } from "components";
import { PostProduct } from "modules/product/domain";
import { usePostProduct } from "modules/product/repository";
import { Categories, Units } from "./fields";

export const PostForm = () => {
  const { mutate } = usePostProduct();
  const onSubmit = (data: PostProduct) => mutate(data);
  return (
    <Form onSubmit={onSubmit} className="space-y-5">
      <FormInput name="name" label="Nombre" size="lg" />
      <FormInput name="description" label="Descripción" size="lg" />
      <FormInput
        size="lg"
        name="price"
        label="Precio"
        options={{
          pattern: {
            message: "numbers only",
            value: /^-?\d*\.?\d*$/,
          },
        }}
      />
      <FormInput
        size="lg"
        name="quantity"
        label="Cantidad"
        options={{
          pattern: {
            message: "numbers only",
            value: /^-?\d*\.?\d*$/,
          },
        }}
      />
      <Units />
      <Categories />
      <div className="flex justify-end">
        <Button className="normal-case text-sm" type="submit">
          Crear
        </Button>
      </div>
    </Form>
  );
};
