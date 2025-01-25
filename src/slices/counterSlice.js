import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counters: [],
    dishes: [],
    currentCounter: null,
    loading: true,
  },
  reducers: {
    setCounter: (state, action) => {
      state.counters = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
    setDishes : (state, action) => {
      state.dishes = action.payload;
    },
    setCurrentCounter : (state, action) => {
      state.currentCounter = action.payload;
    }
  },
});

export const selectCounters = (state)=> state.counter.counters;
export const selectCurrentCounter = (state)=> state.counter.currentCounter;
export const dishesInCounter = (state)=> state.counter.dishes;
export const loadingState = (state)=> state.counter.loading;

export const { setCounter, setLoading, setDishes, setCurrentCounter } = counterSlice.actions;

export default counterSlice.reducer;
