import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { PURGE } from "redux-persist";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    email: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.user = null;
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => "");
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserEmail = (state) => state.user.email;

export default userSlice.reducer;
