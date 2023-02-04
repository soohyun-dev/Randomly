import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    email: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.email = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
