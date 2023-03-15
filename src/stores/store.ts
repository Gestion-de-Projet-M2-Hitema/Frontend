import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authStore from "./authStore";

const appReducer = combineReducers({
    auth: authStore,
})

export const store = configureStore({
    reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;