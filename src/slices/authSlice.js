import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,  
        loading: true,
        merchantCounters : []
    },
    reducers: {
        setCurrentUser: (state, action) => {
            const userData = action.payload;
            state.currentUser = userData;
        },
        removeCurrentUser: (state, action) => {
            state.currentUser = null;
        },
        setLoading : (state, action) => {
            state.loading = !!action.payload;
        },
        setMerchantCounters  : (state, action) => {
            state.merchantCounters = action.payload;
        }
    }
});

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectMerchantCounters = (state) => state.auth.merchantCounters

export const { setCurrentUser, removeCurrentUser, setLoading, setMerchantCounters } = authSlice.actions;

export default authSlice.reducer;