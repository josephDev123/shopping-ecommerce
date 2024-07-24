import "./globals.css";
import { getServerSession } from "next-auth";
import NextAuthSessionProvider from "./nextAuthSessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto, Inter, Lato, Raleway } from "next/font/google";
import ReduxProvider from "./ReduxProvider";

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
        <ReduxProvider>
          <main className="h-full w-full">
            <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
            <ToastContainer />
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
