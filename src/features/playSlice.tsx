import { createSlice } from "@reduxjs/toolkit";

export const playSlice = createSlice({
  name: "play",
  initialState: {
    distribution: false,
    result: [],
    correctCnt: [],
    orderMember: [],
  },
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload.result;
    },
    setCorrectCnt: (state, action) => {
      state.correctCnt = action.payload.correctCnt;
    },
    setOrderMember: (state, action) => {
      state.orderMember = action.payload.orderMember;
    },
    setDistribution: (state, action) => {
      console.log(action);
      state.result = action.payload.result;
      state.correctCnt = action.payload.correctCnt;
      state.distribution = action.payload.distribution;
    },
    setChangeFolder: (state) => {
      state.result = [];
      state.correctCnt = [];
      state.orderMember = [];
      state.distribution = false;
    },
  },
});

export const {
  setResult,
  setCorrectCnt,
  setOrderMember,
  setDistribution,
  setChangeFolder,
} = playSlice.actions;

export const selectResult = (state) => state.play.result;
export const selectCorrectCnt = (state) => state.play.correctCnt;
export const selectOrderMemeber = (state) => state.play.orderMember;
export const selectDistribution = (state) => state.play.distribution;

export default playSlice.reducer;
