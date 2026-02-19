import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    resetAuth: (state) => {
      state.auth = null;
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;