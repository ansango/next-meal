import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  IconButton,
  Button,
  Avatar,
  Container,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "components";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
const navList = (
  <ul className="py-5 lg:py-0 mb-4 mt-2 flex flex-col gap-6 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center"></ul>
);
export const Nav = () => {
  const { data } = useSession();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const { asPath } = useRouter();

  return (
    <header>
      <Container className="py-0">
        <Navbar className="mx-auto max-w-full px-0" shadow={false}>
          <div className="mx-auto flex items-center justify-between text-blue-gray-900">
            <div className="flex items-center space-x-4 lg:space-x-0">
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
              <Link href="/">
                <Button variant="text" className="normal-case text-sm">
                  Next Meal
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block ml-auto">{navList}</div>
            {data?.user ? (
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Avatar
                    src={data.user?.image || ""}
                    size="sm"
                    variant="circular"
                    className="ml-8 cursor-pointer"
                  />
                </MenuHandler>
                <MenuList className="flex flex-col">
                  <Link href="/dashboard">
                    <MenuItem>Dashboard</MenuItem>
                  </Link>
                  <MenuItem onClick={() => signOut()}>Cerrar sesión</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                {!asPath.includes("dashboard") && (
                  <Button
                    className="normal-case text-sm"
                    variant="gradient"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                  >
                    Empezar
                  </Button>
                )}
              </>
            )}
          </div>
          <MobileNav open={openNav}>{navList}</MobileNav>
        </Navbar>
      </Container>
    </header>
  );
};
