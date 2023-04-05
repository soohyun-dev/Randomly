import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: false,
        isModalOpen: false,
        isFolderModalOpen: false,
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload.theme
        },

        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload.isModalOpen
        },

        setIsFolderModalOpen: (state, action) => {
            state.isFolderModalOpen = action.payload.isFolderModalOpen
        },
    },
})

export const { setTheme, setIsModalOpen, setIsFolderModalOpen } = themeSlice.actions

export const selectTheme = (state) => state.theme.theme

export const selectIsModalOpen = (state) => state.theme.isModalOpen

export const selectIsFolderModalOpen = (state) => state.theme.isFolderModalOpen

export default themeSlice.reducer
