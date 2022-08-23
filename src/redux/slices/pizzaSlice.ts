import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasByStatus",
  async (params, thunkApi) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get(
      `https://62e3efe83c89b95396d4450b.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    if (data.length === 0) {
      return thunkApi.rejectWithValue("Pizzas are empty");
    }

    return thunkApi.fulfillWithValue(data);
  }
);

const initialState = {
  pizzas: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.pizzas = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.pizzas = [];
    },
  },
});

export const pizzaDataSelector = (state) => state.pizzaSlice

export const { addItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
