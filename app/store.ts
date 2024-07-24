"use client";

import { configureStore } from "@reduxjs/toolkit";
import LeftPanelToggleSliceReducer from "./slices/leftpanelSlice";

export const stores = configureStore({
  reducer: {
    leftPanelState: LeftPanelToggleSliceReducer,
  },
});

export type RootState = ReturnType<typeof stores.getState>;
export type AppDispatch = typeof stores.dispatch;
