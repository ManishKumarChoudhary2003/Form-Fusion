import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    userId: null, 
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setAuthentication(state) {
      state.isAuthenticated = state.isAuthenticated = true;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
