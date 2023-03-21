import { createSlice } from '@reduxjs/toolkit'

export const playSlice = createSlice({
    name: 'play',
    initialState: {
        distribution: false,
        result: [],
        correctCnt: [],
    },
    reducers: {
        setResult: (state, action) => {
            state.result = action.payload.result
        },
        setCorrectCnt: (state, action) => {
            state.correctCnt = action.payload.correctCnt
        },
        setDistribution: (state, action) => {
            state.result = action.payload.result
            state.correctCnt = action.payload.correctCnt
            state.distribution = action.payload.distribution
        },
        setChangeFolder: (state) => {
            state.result = []
            state.correctCnt = []
            state.distribution = false
        },
    },
})

export const { setResult, setCorrectCnt, setDistribution, setChangeFolder } = playSlice.actions

export const selectResult = (state) => state.play.result
export const selectCorrectCnt = (state) => state.play.correctCnt
export const selectDistribution = (state) => state.play.distribution

export default playSlice.reducer
