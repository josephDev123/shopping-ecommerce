import { getSession } from "next-auth/react";
import "../globals.css";
import NextAuthSessionProvider from "../nextAuthSessionProvider";
import LeftPanel from "./commons/LeftPanel";
import TopNavbar from "./commons/TopNavbar";
import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardMobileLeftpanel from "./commons/DashboardMobileLeftpanel";
import StoreProvider from "../StoreProvider";

export const metadata = {
  title: "JoeFintech",
  description: "Generated by Next.js",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getServerSession(authOptions);
  // console.log("server call", user?.user);

  return (
    <section className="w-full h-full flex bg-green-400">
      {/* left panel */}
      <div className="bg-darkBlack w-[20%] h-full overflow-y-auto px-2 text-white md:flex hidden flex-col justify-center items-center">
        <LeftPanel />
      </div>
      <div>
        <DashboardMobileLeftpanel />
      </div>

      {/* right panel */}
      <div className="w-full h-full bg-white flex flex-col">
        <TopNavbar />
        <div className="h-full overflow-y-auto">
          <div className=" h-full flex-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
