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

import { type ReactNode } from "react";
import { useCategoriesWithProducts } from "lib/fetching/hooks";

const TabsNav = ({
  data,
  defaultTab = "",
  isLoading,
}: {
  defaultTab?: string | number;
  isLoading?: boolean;
  data: {
    label: string;
    value: string | number;
    desc?: ReactNode;
  }[];
}) => {
  return (
    <Tabs value={defaultTab}>
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
        </>
      )}
    </Tabs>
  );
};

const Products = () => {
  const { data, isLoading, isFetching } = useCategoriesWithProducts();
  const dataTab = data
    ? data.map(({ name, Products }) => ({
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
      }))
    : [];

  return (
    <Container className="space-y-10">
      <Breadcrumb />
      <TabsNav data={dataTab} defaultTab="Todos" isLoading={isLoading || isFetching} />
    </Container>
  );
};

Products.auth = true;

export default Products;
