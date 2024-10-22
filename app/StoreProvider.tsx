"use client";

import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/store";
import { useRef } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
