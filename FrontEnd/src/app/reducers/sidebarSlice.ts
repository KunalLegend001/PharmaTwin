import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { setToggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;