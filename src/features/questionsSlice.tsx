import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: "Questions",
  initialState: {
    Questions: [],
  },
  reducers: {
    setQuestion: (state, action) => {
      state.Questions = action.payload.Questions;
    },
  },
});

export const { setQuestion } = questionsSlice.actions;

export const selectQuestions = (state) => state.question.Questions;

export default questionsSlice.reducer;
