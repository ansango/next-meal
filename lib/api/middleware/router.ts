import type { NextApiResponse, NextApiRequest } from "next";
import { createRouter } from "next-connect";

export const router = createRouter<NextApiRequest, NextApiResponse>();
export const options = {
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
};
