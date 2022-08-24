import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  pizzas: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
  pizzas: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasByStatus",
  async (params: Record<string, string>, thunkApi) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62e3efe83c89b95396d4450b.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    if (data.length === 0) {
      return thunkApi.rejectWithValue("Pizzas are empty");
    }

    return thunkApi.fulfillWithValue(data);
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addItems(state: any, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.pizzas = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state: any, action) => {
      state.pizzas = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.pizzas = [];
    });
  },
});

export const pizzaDataSelector = (state: RootState) => state.pizzaSlice;

export const { addItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
