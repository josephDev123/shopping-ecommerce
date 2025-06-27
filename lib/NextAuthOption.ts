// authConfig.ts
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import UserModel from "@/models/User";
import { startDb } from "@/lib/startDb";
import { UserService } from "@/app/api/service/UserService";
import { UserRepo } from "@/app/api/repository/UserRepo";

interface Credential {
  email: string;
  password: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      profile?: string;
      accessToken: string;
      refreshToken: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "auth",
      credentials: {},
      async authorize(credentials) {
        const { email } = credentials as Credential;
        try {
          await startDb();
          const User_Repo = new UserRepo(UserModel);
          const User_service = new UserService(User_Repo);
          const User = await User_service.FindByEmailService(email);
          // console.log("from create", User);
          if (User) {
            return {
              id: User._id.toString(),
              email: User.email,
              name: User.name,
              role: User.role as string,
            };
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        token.id = account.userId;
        // token.name = profile?.name;
        // token.email = profile?.email;
        token.profile = profile?.image;
        token.accessToken = account?.access_token;
        account.refresh_token = account?.refresh_token;

        // Remove assignment since 'profile' does not exist on 'User' or 'AdapterUser'
      }
      if (account?.provider === "credentials") {
        token.id = user?.id;
        token.role = user?.role;
        token.accessToken = account?.access_token;
        account.refresh_token = account?.refresh_token;
      }

      // if (user) {
      //   token.id = user.id;
      //   token.role = user.role;
      // }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.profile = token.picture as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refresh_token as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};
