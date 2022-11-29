import { PrismaClient } from "@prisma/client";
import { options, router } from "lib/api/middleware/router";
import { getSession } from "lib/api/middleware/session";

const client = new PrismaClient();

router.get(async (req, res) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const products = await client.product.findMany({
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

export default router.handler(options);
