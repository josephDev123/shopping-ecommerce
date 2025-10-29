import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type NextApiHandler = (req: NextRequest, res?: any) => Promise<Response>;

export const RouteHandlerMiddleware = (
  handler: NextApiHandler
): NextApiHandler => {
  return async (
    req: NextRequest,
    res?: NextResponse | NextApiResponse | Response
  ) => {
    const Cookie = req.cookies.get("next-auth.session-token");

    if (!Cookie?.value) {
      return new Response(
        JSON.stringify({ error: "Unauthorized user. Pls Login" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return handler(req);
  };
};
