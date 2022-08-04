import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryType: 0,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action;
    },
  },
});

export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
