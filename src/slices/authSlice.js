import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,  
        loading: true,
        merchantCounters : [],
        merchants: [],
        users : []
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
        },
        updateMerchantCounter : (state, action) => {
            const updatedCounter = action.payload;
            const index = state.merchantCounters.findIndex((counter) => counter.id === updatedCounter.id);
            state.merchantCounters[index] = updatedCounter;
        },
        setMerchants : (state, action) => {
            state.merchants = action.payload;
        },
        setUsers : (state, action) => {
            state.users = action.payload
        }
    }
});

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectMerchantCounters = (state) => state.auth.merchantCounters
export const selectloadingState = (state) => state.auth.loading;
export const selectAllMerchants = (state) => state.auth.merchants;
export const selectAllUsers = (state) => state.auth.users;

export const { setCurrentUser, removeCurrentUser, setLoading, setMerchantCounters, updateMerchantCounter, setAllCounters, setMerchants, setUsers } = authSlice.actions;

export default authSlice.reducer;