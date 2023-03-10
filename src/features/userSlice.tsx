import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'

const initialState = {
    user: null,
    email: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.email = action.payload.email
        },
        logout: (state) => {
            state.user = null
            state.email = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState)
    },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state) => state.user.user
export const selectUserEmail = (state) => state.user.email

export default userSlice.reducer
