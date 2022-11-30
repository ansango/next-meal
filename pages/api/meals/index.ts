import { db } from "lib/api/db/prisma";
import { getSession } from "lib/api/middleware/session";

import { options } from "lib/api/middleware/router";
import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const session = await getSession(req, res);
  if (session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const meals = await db.meal.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          CategoryMeal: true,
          ProductsOnMeals: {
            select: {
              quantity: true,
              Unit: true,
              Product: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  image: true,
                  price: true,
                  Category: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      res.status(200).json(meals);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

export default router.handler(options);
