import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,  
        loading: true,
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
        }
    }
});

export const { setCurrentUser, removeCurrentUser, setLoading } = authSlice.actions;

export default authSlice.reducer;