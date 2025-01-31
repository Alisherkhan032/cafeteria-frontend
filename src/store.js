import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./slices/counterSlice";
import CartReducer from "./slices/cartSlice";
import AuthReducer from "./slices/authSlice";

const store = configureStore({
    reducer : {
        counter : CounterReducer,
        cart : CartReducer,
        auth : AuthReducer
    }
})

export default store;