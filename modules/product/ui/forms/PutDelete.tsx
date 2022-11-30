import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Form,
  FormInput,
} from "components";
import { ProductPopulated } from "modules/product/domain";
import { useDeleteProduct, usePutProduct } from "modules/product/repository";
import { useState } from "react";
import { Categories, Units } from "./fields";

export const PutDeleteForm = ({ product }: { product: ProductPopulated }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { mutate } = usePutProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const onSubmit = (data: {
    name: string;
    description: string;
    price: string;
    quantity: string;
    unitId: string;
    categoryId: string;
  }) =>
    mutate({
      ...data,
      price: parseFloat(data.price),
      quantity: parseFloat(data.quantity),
      id: product.id,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  return (
    <>
      <Form onSubmit={onSubmit} className="space-y-5">
        <FormInput
          size="lg"
          name="name"
          label="Nombre"
          defaultValue={product.name}
        />
        <FormInput
          size="lg"
          name="description"
          label="Descripción"
          defaultValue={product.description}
        />
        <FormInput
          size="lg"
          name="price"
          label="Precio"
          defaultValue={`${product.price}`}
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
          defaultValue={`${product.quantity}`}
          options={{
            pattern: {
              message: "numbers only",
              value: /^-?\d*\.?\d*$/,
            },
          }}
        />
        <Units selectedOption={product.Unit?.id} />
        <Categories selectedOption={product.Category?.id} />
        <div className="flex justify-end gap-5">
          <Button
            className="normal-case text-sm"
            color="red"
            variant="text"
            onClick={handleOpen}
          >
            Eliminar
          </Button>{" "}
          <Button className="normal-case text-sm" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
      <Dialog
        open={open}
        handler={handleOpen}
        className="max-w-xs w-full min-w-xs"
      >
        <DialogHeader>Eliminar {product.name}</DialogHeader>
        <DialogBody divider>
          <span>
            Vas a eliminar <span className="font-semibold">{product.name}</span>{" "}
            de tu lista de productos. ¿Estás seguro?
          </span>
        </DialogBody>
        <DialogFooter className="flex justify-end gap-5">
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 normal-case text-sm"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              deleteProduct(product.id);
              handleOpen();
            }}
            className="normal-case text-sm"
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
