import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
  },
  reducers: {
    setMember: (state, action) => {
      state.members = action.payload.members;
    },
  },
});

export const { setMember } = memberSlice.actions;

export const selectMember = (state) => state.member.members;

export default memberSlice.reducer;
