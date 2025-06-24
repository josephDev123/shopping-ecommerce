import { authOptions } from "@/lib/NextAuthOption";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

type NextApiHandler = (
  req: NextRequest,
  res?: any
) => Promise<NextApiResponse | NextResponse | Response>;

export const AuthMiddleware = (handler: NextApiHandler): NextApiHandler => {
  return async (
    req: NextRequest,
    res?: NextResponse | NextApiResponse | Response
  ) => {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    console.log(`[${req.method}] ${req.url}`);
    return handler(req, res);
  };
};
