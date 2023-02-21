import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;
