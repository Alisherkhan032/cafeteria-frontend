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
    },
    updateDish : (state, action) => {
      const updatedDish = action.payload;
      const index = state.dishes.findIndex((dish) => dish._id === updatedDish._id);
      state.dishes[index] = updatedDish;
    },
    removeDish : (state, action)=>{
      const deletedDish = action.payload;
      console.log(deletedDish);
      const index = state.dishes.findIndex((dish) => dish._id === deletedDish._id);
      if(index !== -1){
        state.dishes.splice(index, 1);
      }
    }
  },
});

export const selectCounters = (state)=> state.counter.counters;
export const selectCurrentCounter = (state)=> state.counter.currentCounter;
export const dishesInCounter = (state)=> state.counter.dishes;
export const loadingState = (state)=> state.counter.loading;

export const { setCounter, setLoading, setDishes, setCurrentCounter, updateDish, removeDish } = counterSlice.actions;

export default counterSlice.reducer;
