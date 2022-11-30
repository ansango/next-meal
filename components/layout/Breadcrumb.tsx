import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Breadcrumb = () => {
  const { asPath } = useRouter();
  const routes = asPath.split("/").filter((route) => route !== "");

  return (
    <Breadcrumbs>
      {routes.map((route, index) => {
        const isLast = index === routes.length - 1;
        return (
          <Link
            href={`/${routes.slice(0, index + 1).join("/")}`}
            key={index}
            className={!isLast ? "opacity-60" : ""}
          >
            {route.charAt(0).toUpperCase() + route.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
