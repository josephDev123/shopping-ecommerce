import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import UserModel, { UserInterface } from "@/models/User";
import { startDb } from "@/lib/startDb";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { UserService } from "../../service/UserService";
import { UserRepo } from "../../repository/UserRepo";
import { Document, Model, Schema } from "mongoose";

// type result = {
//   name: string;
//   email: string;
//   password: string;
// };

interface Credential {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      // id: "Credential",
      name: "auth",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as Credential;

        try {
          await startDb();
          const User_Repo = new UserRepo(UserModel);
          const User_service = new UserService(User_Repo);
          // const User = await UserModel.findOne({ email: email });
          const User = await User_service.FindByEmailService(email);

          if (User) {
            return User;
          } else {
            return null;
          }

          //  authenticate for password
          // const comparePassword = await bcrypt.compare(
          //   credentials.password,
          //   user.password
          // );

          // if (!comparePassword) {
          //   return null;
          // }

          // return;
          // console.log(User);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin

      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);
// export const getServerAuthSession = () => getServerSession(authOptions);
export { handler as GET, handler as POST };
