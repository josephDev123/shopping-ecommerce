import "./globals.css";
import { getServerSession } from "next-auth";
import NextAuthSessionProvider from "./nextAuthSessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto, Inter, Lato, Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = getServerSession();
  return (
    <html lang="en" className={raleway.className}>
      <body>
        <main>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
