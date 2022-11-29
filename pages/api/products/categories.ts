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
          name: true,
          Products: {
            orderBy: { createdAt: "desc" },
          },
        },
      });
      const data = categories.filter(({ Products }) => Products.length > 0);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

export default router.handler(options);
