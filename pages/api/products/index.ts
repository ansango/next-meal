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
      const products = await db.product.findMany({
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

router.post(async (req, res) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const body = JSON.parse(req.body);
      console.log(body);
      const product = await db.product.create({
        data: {
          name: body.name || "",
          description: body.description || "",
          price: parseFloat(body.price) || 0,
          quantity: parseInt(body.quantity) || 0,
          unitId: body.unitId || null,
          categoryId: body.categoryId || null,
        },
      });

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

export default router.handler(options);
