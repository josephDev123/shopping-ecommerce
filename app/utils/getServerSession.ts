// import type {
//   GetServerSidePropsContext,
//   NextApiRequest,
//   NextApiResponse,
// } from "next";
// import type { NextAuthOptions } from "next-auth";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";

// // You'll need to import and pass this
// // to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
// // export const config = {
// // providers: [], // rest of your config

// // }

// const config = authOptions satisfies NextAuthOptions;

// // Use it in server contexts
// export function auth(
//   ...args:
//     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   return getServerSession(...args, config);
// }
