import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import userReducer from '../Features/userSlice'
import themeReducer from '../Features/themeSlice'
import folderReducer from '../Features/folderSlice'
import questionReducer from '../Features/questionsSlice'
import memberReducer from '../Features/memberSlice'
import playReducer from '../Features/playSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    user: userReducer,
    theme: themeReducer,
    folder: folderReducer,
    question: questionReducer,
    member: memberReducer,
    play: playReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    user: userReducer,
    theme: themeReducer,
    folder: folderReducer,
    question: questionReducer,
    reducer: persistedReducer,
    member: memberReducer,
    play: playReducer,
})

export default store
