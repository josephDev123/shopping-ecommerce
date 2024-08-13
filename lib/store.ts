import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LeftPanelToggleSliceReducer from "./slices/leftpanelSlice";
import cartsReducer from "./slices/addToCartSlice";
import { storage } from "./slices/persistStorage";
import { persistReducer } from "redux-persist";

const productsPersistConfig = {
  key: "carts",
  storage,
  whitelist: ["cartState"],
};

const persistedReducer = persistReducer(productsPersistConfig, cartsReducer);

const rootReducer = combineReducers({
  leftPanelState: LeftPanelToggleSliceReducer,
  cartState: cartsReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
