import { createSlice } from "@reduxjs/toolkit";
import { ProductDataType } from "@/app/types/productsType";

interface type {
  carts: ProductDataType[];
}

const initialState: type = {
  carts: [],
};

export const cartSlice = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    setCart: (state, action) => {
      // Check if the product already exists in the state
      const productExists = state.carts.some(
        (product) => product._id === action.payload._id
      );

      // If the product does not exist, add it to the products array
      if (!productExists) {
        state.carts.push(action.payload);
      }
    },
    getCarts: (state) => {
      state.carts;
    },
    deleteCart: (state, action) => {
      state.carts = state.carts.filter((cart) => action.payload !== cart._id);
    },
  },
});

export const { setCart, getCarts, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
