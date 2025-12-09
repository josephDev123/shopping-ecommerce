import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { DefaultSession, getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";

type NextApiHandler = (req: NextRequest, res?: any) => Promise<Response>;

export const RouteHandlerMiddleware = (
  handler: NextApiHandler
): NextApiHandler => {
  return async (
    req: NextRequest,
    res?: NextResponse | NextApiResponse | Response
  ) => {
    const session = await getServerSession(authOptions);
    //  this part is confusing. pls remember that cookie key are different base on environment
    const token =
      req.cookies.get("__Host-next-auth.session-token") ??
      req.cookies.get("next-auth.session-token") ??
      req.cookies.get("__Secure-next-auth.session-token");

    if (!token?.value) {
      return new Response(
        JSON.stringify({ error: "Unauthorized user. Pls Login" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // console.log("token", token);

    req.session = session;

    return handler(req);
  };
};
