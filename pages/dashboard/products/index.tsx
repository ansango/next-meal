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
} from "components/common";
import { useQuery } from "@tanstack/react-query";
import { type Product } from "@prisma/client";
import { type ReactNode } from "react";

const TabsNav = ({
  data,
  defaultTab,
}: {
  defaultTab?: string | number;
  data: {
    label: string;
    value: string | number;
    desc?: ReactNode;
  }[];
}) => {
  return (
    <Tabs value={defaultTab}>
      <TabsHeader className="grid gap-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="text-gray-900">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

const Products = () => {
  const { data } = useQuery<{ name: string; Products: Product[] }[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products/categories");
      return res.json();
    },
  });
  const allProducts = {
    name: "Todos",
    Products: data?.flatMap((category) => category.Products) ?? [],
  };
  const dataTab =
    (data &&
      [allProducts, ...data].map(({ name, Products }) => ({
        label: `${name} (${Products.length})`,
        value: name,
        desc: (
          <div className="space-y-5 py-5">
            <Typography variant="h5">{name}</Typography>
            <ul className="flex flex-wrap gap-4">
              {Products.map((product, index) => (
                <Typography as="li" key={`${product.name}-${index}`}>
                  <Chip
                    value={product.name}
                    variant="gradient"
                    className="rounded-full normal-case text-sm"
                    color="blue-gray"
                  />
                </Typography>
              ))}
            </ul>
          </div>
        ),
      }))) ||
    [];

  return (
    <Container className="space-y-10">
      <Breadcrumb />
      <TabsNav data={dataTab} defaultTab="Todos" />
    </Container>
  );
};

Products.auth = true;

export default Products;
