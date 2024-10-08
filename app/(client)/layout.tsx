import { ReactNode } from "react";
import Navbar from "./generic/Navbar";
import Footer from "./generic/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col w-full">
      <div className="h-full w-full sticky top-0 z-30 bg-white">
        <Navbar />
      </div>
      <div className="min-h-full">{children}</div>

      <div className="h-full">
        <Footer />
      </div>
    </section>
  );
}
