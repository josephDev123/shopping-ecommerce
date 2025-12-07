import { DefaultSession } from "next-auth";

interface Session {
  user: {
    id: string;
    // email: string;
    // name: string;
    role: string;
    profile?: string;
    accessToken: string;
    refreshToken: string;
  } & DefaultSession["user"];
}

declare module "next/server" {
  interface NextRequest {
    session: Session | null;
  }
}
