import { db } from "lib/api/db/prisma";

import { getSession } from "lib/api/middleware/session";

import { options } from "lib/api/middleware/router";
import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const categories = await db.category.findMany({
        select: {
          id: true,
          name: true,
          Products: {
            orderBy: { createdAt: "desc" },
            select: {
              name: true,
              id: true,
              Category: true,
              Unit: true,
              price: true,
              quantity: true,
              description: true,
              image: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        orderBy: { name: "asc" },
      });

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

export default router.handler(options);
