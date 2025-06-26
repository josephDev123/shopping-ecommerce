import { authOptions } from "@/lib/NextAuthOption";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type NextApiHandler = (req: NextRequest, res?: any) => Promise<Response>;

export const AuthMiddleware = (handler: NextApiHandler): NextApiHandler => {
  return async (
    req: NextRequest,
    res?: NextResponse | NextApiResponse | Response
  ) => {
    const session = await getServerSession(authOptions);

    // const session = await getToken({
    //   req,
    //   secret: process.env.NEXTAUTH_SECRET,
    // });

    console.log("Session:", session);

    // console.log(`[${req.method}] ${req.url}`);
    return handler(req);
  };
};
