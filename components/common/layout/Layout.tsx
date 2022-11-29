import { type FC, type ReactNode } from "react";
import { Footer } from "..";
import { Nav } from "./Nav";

type Props = { children: ReactNode };

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};
