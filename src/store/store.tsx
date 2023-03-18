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

const reducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
    folder: folderReducer,
    question: questionReducer,
    member: memberReducer,
    play: playReducer,
})

const rootReducer = persistReducer(persistConfig, reducer)

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
})

export default store
