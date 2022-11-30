import {
  Container,
  Breadcrumb,
  Popover,
  PopoverHandler,
  IconButton,
  MdAdd,
  PopoverContent,
} from "components";
import { PostForm, TabsNav } from "modules/product/ui";

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
            <PostForm />
          </PopoverContent>
        </Popover>
      </div>
      <TabsNav />
    </Container>
  );
};

Products.auth = true;

export default Products;
