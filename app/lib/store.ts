import { configureStore } from "@reduxjs/toolkit";
import LeftPanelToggleSliceReducer from "./slices/leftpanelSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      leftPanelState: LeftPanelToggleSliceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
