import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LeftPanelToggleSliceReducer from "./slices/leftpanelSlice";
import cartsReducer from "./slices/addToCartSlice";
import { storage } from "./slices/persistStorage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const productsPersistConfig = {
  key: "carts",
  storage,
  whitelist: ["cartState"],
};

const rootReducer = combineReducers({
  leftPanelState: LeftPanelToggleSliceReducer,
  cartState: cartsReducer,
});

const persistedReducer = persistReducer(productsPersistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// export let persistor = persistStore(makeStore());

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
