import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers:{
        setToken(state, action){
            state.token = action.payload
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;