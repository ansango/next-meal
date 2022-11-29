import type { NextApiRequest, NextApiResponse } from "next";
import {
  unstable_getServerSession,
  type Session as SessionNA,
} from "next-auth";
import authOptions from "lib/api/auth";
import { type User } from "lib/models";

type Session = {
  user: User | null;
} & SessionNA;

export const getSession = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null> => {
  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions
  )) as Session;
  return session;
};
