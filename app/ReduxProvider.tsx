"use client";

import { Provider } from "react-redux";
import { stores } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={stores}>{children}</Provider>;
}
