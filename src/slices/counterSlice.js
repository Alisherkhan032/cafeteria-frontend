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
    updateCounter : (state, action) => {
      const updatedCounter = action.payload;
      const index = state.counters.findIndex((counter) => counter._id === updatedCounter._id);
      state.counters[index] = updatedCounter;
    },
    addCounter : (state, action) => {
      const newCounter = action.payload;
      state.counters.push(newCounter);
    },
    removeCounter: (state, action) => {
      state.counters = state.counters.filter(counter => counter._id !== action.payload);
    },
    resetCounterSlice: (state, action) => {
      state.counters = [];
      state.dishes = [];
      state.currentCounter = null;
      state.loading = true;
    }
  },
});

export const selectCounters = (state)=> state.counter.counters;
export const selectCurrentCounter = (state)=> state.counter.currentCounter;
export const dishesInCounter = (state)=> state.counter.dishes;
export const selectloadingState = (state)=> state.counter.loading;

export const {addCounter, setCounter,updateCounter, setLoading, setDishes, setCurrentCounter, updateDish, removeDish, addDish, removeCounter, resetCounterSlice } = counterSlice.actions;

export default counterSlice.reducer;
