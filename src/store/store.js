import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import userReducer from '../features/userSlice'
import themeReducer from '../features/themeSlice'
import folderReducer from '../features/folderSlice'
import questionReducer from '../features/questionsSlice'
import memberReducer from '../features/memberSlice'
import playReducer from '../features/playSlice'

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
