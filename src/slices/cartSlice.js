import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : [],
    loading : false,
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        updateQuantity : (state, action) => {
            const {id, increment} = action.payload;
            const product = state.items.find((item) => item.id === id)

            if(!product) return;

            product.quantity += increment;
            if(product.quantity === 0){
                state.items = state.items.filter((item) => item.id !== id);
            }
        },
        toggleSelect : (state, action) => {
            const {id} = action.payload;
            const product = state.items.find((item) => item.id === id);
            
            if(!product) return;

            product.selected = !product.selected;
        },
        addToCart : (state, action) => {
            const product = action.payload; // { dish + qunaity }

            const existingProduct = state.items.find((item) => item._id === product._id);
            if(existingProduct) return;

            state.items.push(product);
        },
        removeFromCart : (state, action)=>{
            const {id} = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },
        resetCart : (state)=>{
            state.items = [];
        },
        setCart : (state, action) => {
            state.items = action.payload;
        },
        setLoading : (state, action) => {
            state.loading = !!action.payload;
        }
        
    }
})

export const selectItemsFromCart = (state) => state.cart.items;
export const selectLoadingState = (state) => state.cart.loading;
export const selectCartQantity = (state) => state.cart.items.length

export const {  updateQuantity, toggleSelect, addToCart, removeFromCart, resetCart, setCart, setLoading } = cartSlice.actions

export default cartSlice.reducer;