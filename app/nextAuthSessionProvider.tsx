"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { authOptions } from "./api/auth/[...nextauth]/route";

type sessionProviderProps = {
  children: React.ReactNode;
};

export default function NextAuthSessionProvider({
  children,
}: sessionProviderProps) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
