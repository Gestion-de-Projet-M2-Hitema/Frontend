import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authStore from "./authStore";
import signupStore from "./signupStore";

const appReducer = combineReducers({
    auth: authStore,
    signup: signupStore,
})

export const store = configureStore({
    reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;