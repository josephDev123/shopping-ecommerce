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

// interface User {
//   _id: string;
//   email: string;
//   name: string;
// }

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
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
          if (User) {
            return {
              id: User._id.toString(),
              email: User.email,
              name: User.name,
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
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};
