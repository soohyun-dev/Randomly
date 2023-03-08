import { createSlice } from '@reduxjs/toolkit'

export const questionsSlice = createSlice({
    name: 'Questions',
    initialState: {
        Questions: [],
        catagoryList: [],
        selectedCatagory: '분류없음',
    },
    reducers: {
        setQuestion: (state, action) => {
            state.Questions = action.payload.Questions
        },
        setCatagoryList: (state, action) => {
            state.catagoryList = action.payload.catagoryList
        },
        setSelectedCatagory: (state, action) => {
            state.selectedCatagory = action.payload.selectedCatagory
        },
    },
})

export const { setQuestion } = questionsSlice.actions

export const selectQuestions = (state) => state.question.Questions
export const selectCatagoryList = (state) => state.question.catagoryList
export const selectSelectedCatagory = (state) => state.question.selectedCatagory

export default questionsSlice.reducer
