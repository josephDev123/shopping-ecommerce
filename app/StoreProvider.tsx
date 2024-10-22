"use client";

import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/store";
import { useRef } from "react";
import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "../lib/store";
import { Persistor, persistStore } from "redux-persist";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  // const persistorRef = useRef<Persistor>({} as Persistor);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  // const persistedStore = persistStore(storeRef.current);
  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={null} persistor={persistedStore}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
