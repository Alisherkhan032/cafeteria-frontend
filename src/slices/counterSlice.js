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
    },
    addDish : (state, action)=>{
      const newDish = action.payload;
      state.dishes.push(newDish);
    },
    updateConter : (state, action) => {
      const updatedCounter = action.payload;
      const index = state.counters.findIndex((counter) => counter._id === updatedCounter._id);
      state.counters[index] = updatedCounter;
    },
  },
});

export const selectCounters = (state)=> state.counter.counters;
export const selectCurrentCounter = (state)=> state.counter.currentCounter;
export const dishesInCounter = (state)=> state.counter.dishes;
export const selectloadingState = (state)=> state.counter.loading;

export const { setCounter,updateConter, setLoading, setDishes, setCurrentCounter, updateDish, removeDish, addDish } = counterSlice.actions;

export default counterSlice.reducer;
