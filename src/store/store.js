import userReducer from "../features/userSlice";
import themeReducer from "../features/themeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  user: userReducer,
  theme: themeReducer,
  reducer: persistedReducer,
});

export default store;
