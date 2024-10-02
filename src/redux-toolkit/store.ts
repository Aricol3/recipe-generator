import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./slices/recipesSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
  recipes: recipesReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export default store;