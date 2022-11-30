import { db } from "lib/api/db/prisma";
import { getSession } from "lib/api/middleware/session";

import { options } from "lib/api/middleware/router";
import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
const router = createRouter<NextApiRequest, NextApiResponse>();

router.put(async (req, res) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const body = JSON.parse(req.body);
      const productId = req.query.id as string;
      const product = await db.product.update({
        where: { id: productId },
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

router.delete(async (req, res) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const productId = req.query.id as string;
      const product = await db.product.delete({
        where: { id: productId },
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

export default router.handler(options);