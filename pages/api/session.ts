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
    res.status(200).json(session);
  }
});

export default router.handler(options);
