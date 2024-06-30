"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

type sessionProviderProps = {
  children: React.ReactNode;
};

export default async function NextAuthSessionProvider({
  children,
}: sessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
