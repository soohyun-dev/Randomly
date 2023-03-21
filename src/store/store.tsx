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

const folderMiddleware = (store) => (next) => (action) => {
    if (action.type === 'folders/setFolder') {
        const folders = action.payload.folders.map((folder) => {
            return {
                ...folder,
                time: new Date(folder.time.seconds * 1000 + folder.time.nanoseconds / 1000000),
            }
        })

        const newAction = {
            ...action,
            payload: {
                folders,
            },
        }

        return next(newAction)
    }

    return next(action)
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
    middleware: [folderMiddleware],
})

export default store
