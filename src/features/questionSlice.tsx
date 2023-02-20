import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
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

export const { getQuestion } = questionsSlice.actions;

export const selectQuestions = (state) => state.questions.questions;

export default questionsSlice.reducer;
