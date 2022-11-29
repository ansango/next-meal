import { Button, Container } from "components/common";

type Props = {};

import { Card, CardBody, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FC } from "react";

const CardSubRoute: FC<{
  title: string;
  description: string;
}> = ({ description, title }) => {
  return (
    <Card className="w-full h-40">
      <CardBody>
        <Typography variant="h5" className="mb-2">
          {title}
        </Typography>
        <Typography className="line-clamp-3">{description}</Typography>
      </CardBody>
    </Card>
  );
};

const routesDashboard = [
  {
    title: "Productos",
    description:
      "Consulta la lista de productos que disponibles, añade, edita o elimina los productos que necesites.",
    path: "/dashboard/products",
  },
  {
    title: "Comidas",
    description: "Crea, edita o elimina las comidas que necesites.",
    path: "/dashboard/meals",
  },
  {
    title: "Calendario",
    description:
      "Consulta el calendario de comidas que tienes programadas para los próximos días.",
    path: "/dashboard/calendar",
  },
  {
    title: "Lista de la compra",
    description:
      "Consulta la lista de la compra que tienes programada para los próximos días.",
    path: "/dashboard/shopping-list",
  },
  {
    title: "Perfil",
    description:
      "Consulta y edita la información de tu perfil, como tu nombre, tu email o tu contraseña.",
    path: "/dashboard/profile",
  },
];

const Dashboard = (props: Props) => {
  return (
    <Container className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {routesDashboard.map((route, index) => (
        <Link key={`card-${route.title}-${index}`} href={route.path}>
          <CardSubRoute title={route.title} description={route.description} />
        </Link>
      ))}
    </Container>
  );
};

Dashboard.auth = true;

export default Dashboard;
