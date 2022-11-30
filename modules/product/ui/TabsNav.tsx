import type { FC } from "react";
import { useCategoriesWithProducts } from "../repository";
import {
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
  Chip,
} from "components";
import { PutDeleteForm } from "./forms";

export const TabsNav: FC = () => {
  const { data, isLoading } = useCategoriesWithProducts();
  const dataTab = data
    ? data.map(({ name, Products }) => ({
        label: `${name} (${Products.length})`,
        value: name,
        desc: (
          <div className="space-y-5 py-5">
            <Typography variant="h5">{name}</Typography>
            <ul className=" flex flex-wrap gap-4">
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
                    <PutDeleteForm product={product} />
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
      <TabsHeader className="grid gap-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <Tab
                key={i}
                value={i}
                className="bg-blue-gray-100 animate-pulse rounded-md h-8"
              >
                <></>
              </Tab>
            ))}
          </>
        ) : (
          <>
            {dataTab.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </>
        )}
      </TabsHeader>
      <TabsBody>
        {dataTab.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="text-gray-900">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};
