import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: false,
        isModalOpen: false,
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload.theme
        },

        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload.isModalOpen
        },
    },
})

export const { setTheme, setIsModalOpen } = themeSlice.actions

export const selectTheme = (state) => state.theme.theme

export const selectIsModalOpen = (state) => state.theme.isModalOpen

export default themeSlice.reducer
