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
} from "components/common";

import {
  useCategories,
  useCategoriesWithProducts,
  usePostProduct,
  useUnits,
} from "lib/fetching/hooks";
import { MdAdd } from "react-icons/md";

import { PostProduct } from "lib/fetching/functions";
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
                <Popover key={`${product.name}-${index}`} placement="bottom-start">
                  <PopoverHandler>
                    <Typography as="li">
                      <Chip
                        value={product.name}
                        variant="gradient"
                        className="rounded-full normal-case text-sm"
                        color="blue"
                      />
                    </Typography>
                  </PopoverHandler>
                  <PopoverContent className="max-w-lg w-full z-30">
                    <div className="p-5">
                      <Typography variant="h5">{product.name}</Typography>
                      <Typography variant="body1">
                        {product.description}
                      </Typography>
                    </div>
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

const Categories = () => {
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
      }}
    />
  );
};

const Units = () => {
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
        label: "Unidad",
      }}
    />
  );
};

const PostProductForm = () => {
  const { mutate } = usePostProduct();
  const onSubmit = (data: PostProduct) => mutate(data);
  return (
    <Form onSubmit={onSubmit} className="space-y-5">
      <FormInput name="name" label="Nombre" />
      <FormInput name="description" label="Descripción" />
      <FormInput
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
      <Button className="normal-case text-sm" type="submit">
        Crear
      </Button>
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
