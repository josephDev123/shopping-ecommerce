import "./globals.css";
import { getServerSession } from "next-auth";
import NextAuthSessionProvider from "./nextAuthSessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto, Inter, Lato, Raleway } from "next/font/google";
import StoreProvider from "./StoreProvider";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  // title: path === "/login" ? "Login" : "Register",
  description: "Shopping commerce | E-commerce | Online shopping",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession();

  return (
    <html lang="en" className={raleway.className}>
      <body>
        <main className="h-full w-full">
          <NextAuthSessionProvider>
            <StoreProvider>
              {/* {JSON.stringify(session, null, 2)} */}
              {children}{" "}
            </StoreProvider>
          </NextAuthSessionProvider>

          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
