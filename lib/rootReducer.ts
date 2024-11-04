import { combineReducers } from "@reduxjs/toolkit";
import LeftPanelToggleSliceReducer from "./slices/leftpanelSlice";
import cartsReducer from "./slices/addToCartSlice";

export const rootReducer = combineReducers({
  leftPanelState: LeftPanelToggleSliceReducer,
  cartState: cartsReducer,
});
