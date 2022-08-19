import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
