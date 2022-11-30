import {
  Container,
  Typography,
  Chip,
  Breadcrumb,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Form,
  FormInput,
  Button,
  FormSelect,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "components/common";

import {
  useCategories,
  useCategoriesWithProducts,
  useDeleteProduct,
  usePostProduct,
  usePutProduct,
  useUnits,
} from "lib/fetching/hooks";
import { MdAdd } from "react-icons/md";

import { PostProduct, ProductPopulated } from "lib/fetching/functions";
import { useState } from "react";

const EditDeleteFormProduct = ({ product }: { product: ProductPopulated }) => {
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

const TabsNav = () => {
  const { data, isLoading } = useCategoriesWithProducts();
  const dataTab = data
    ? data.map(({ name, Products }) => ({
        label: `${name} (${Products.length})`,
        value: name,
        desc: (
          <div className="space-y-5 py-5">
            <Typography variant="h5">{name}</Typography>
            <ul className="flex flex-wrap gap-4">
              {Products.map((product, index) => (
                <Popover
                  key={`${product.name}-${index}`}
                  placement="bottom-start"
                >
                  <PopoverHandler>
                    <Typography as="li" className="cursor-pointer">
                      <Chip
                        value={product.name}
                        variant="gradient"
                        className="rounded-full normal-case text-sm"
                        color="blue"
                      />
                    </Typography>
                  </PopoverHandler>
                  <PopoverContent className="max-w-lg w-full z-30">
                    <EditDeleteFormProduct product={product} />
                  </PopoverContent>
                </Popover>
              ))}
            </ul>
          </div>
        ),
      }))
    : [];
  return (
    <Tabs value="Todos">
      {isLoading ? (
        <>
          <TabsHeader className="grid gap-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 20 }, (_, i) => (
              <Tab
                key={i}
                value={i}
                className="bg-blue-gray-100 animate-pulse rounded-md h-8"
              >
                <></>
              </Tab>
            ))}
          </TabsHeader>
        </>
      ) : (
        <>
          <TabsHeader className="grid gap-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dataTab.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {dataTab.map(({ value, desc }) => (
              <TabPanel key={value} value={value} className="text-gray-900">
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </>
      )}
    </Tabs>
  );
};

const Categories = ({ selectedOption }: { selectedOption?: string }) => {
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

const Units = ({ selectedOption }: { selectedOption?: string }) => {
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

const PostProductForm = () => {
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

const Products = () => {
  return (
    <Container className="space-y-10">
      <div className="flex justify-between">
        <Breadcrumb />
        <Popover placement="bottom-end">
          <PopoverHandler>
            <IconButton>
              <MdAdd className="text-base" />
            </IconButton>
          </PopoverHandler>
          <PopoverContent className="max-w-lg w-full z-30">
            <PostProductForm />
          </PopoverContent>
        </Popover>
      </div>
      <TabsNav />
    </Container>
  );
};

Products.auth = true;

export default Products;
