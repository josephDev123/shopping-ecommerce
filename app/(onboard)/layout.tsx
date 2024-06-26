import ".././globals.css";
import NextAuthSessionProvider from "../nextAuthSessionProvider";
import { metadata } from "./metadata";

// export const metadata = {
//   title: "login",
//   description: "Generated by Next.js",
// };

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className=" h-full w-full bg-bg">{children}</section>;
}
