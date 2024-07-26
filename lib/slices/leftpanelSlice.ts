import { createSlice } from "@reduxjs/toolkit";

export interface leftPaneLToggleStateType {
  value: boolean;
}

const initialState: leftPaneLToggleStateType = {
  value: false,
};

export const leftPanelSlice = createSlice({
  name: "leftPanelToggle",
  initialState,
  reducers: {
    toggleLeftPanel: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleLeftPanel } = leftPanelSlice.actions;
export default leftPanelSlice.reducer;
