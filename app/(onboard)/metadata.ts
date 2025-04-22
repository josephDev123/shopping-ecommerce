"use client";
import { usePathname } from "next/navigation";

const path = usePathname();
export const metadata = {
  // title: path === "/login" ? "Login" : "Register",
  description: "Shopping commerce | E-commerce | Online shopping",
};
