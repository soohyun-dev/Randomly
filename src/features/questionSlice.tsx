import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: null,
  },
  reducers: {
    getQuestion: (state, action) => {
      state.questions = action.payload.questions;
    },
  },
});

export const { getQuestion } = questionSlice.actions;

export const selectQuestions = (state) => state.questions.questions;

export default questionSlice.reducer;
