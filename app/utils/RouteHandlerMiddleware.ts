import { authOptions } from "@/lib/NextAuthOption";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type NextApiHandler = (req: NextRequest, res?: any) => Promise<Response>;

export const RouteHandlerMiddleware = (
  handler: NextApiHandler
): NextApiHandler => {
  return async (
    req: NextRequest,
    res?: NextResponse | NextApiResponse | Response
  ) => {
    const session = await getServerSession(authOptions);
    // ✅this is also correct
    // const session = await getToken({
    //   req,
    //   secret: process.env.NEXTAUTH_SECRET,
    // });

    // console.log("session", session);
    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // console.log(`[${req.method}] ${req.url}`);
    return handler(req);
  };
};
