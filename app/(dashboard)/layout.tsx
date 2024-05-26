import "../globals.css";
import NextAuthSessionProvider from "../nextAuthSessionProvider";
import LeftPanel from "./dashboard/commonComponents/LeftPanel";
import TopNavbar from "./dashboard/commonComponents/TopNavbar";

export const metadata = {
  title: "JoeFintech",
  description: "Generated by Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    //bg-bg
    <section className="w-full h-screen flex">
      {/* left panel */}
      <div className="bg-darkBlack w-[20%] px-2 text-white flex flex-col justify-center items-center">
        <LeftPanel />
      </div>
      {/* right panel */}
      <div className="w-full h-full bg-white flex flex-col">
        <TopNavbar />
        <div className="overflow-y-auto h-full">{children}</div>
      </div>
    </section>
  );
}
