import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authStore from "./authStore";
import signupStore from "./signupStore";
import profileStore from "./profileStore";
import serverStore from "./serverStore";
import friendStore from "./friendStore";
import channelStore from "./channelStore";

const appReducer = combineReducers({
    auth: authStore,
    signup: signupStore,
    profile: profileStore,
    server: serverStore,
    friend: friendStore,
    channel: channelStore,
})

export const store = configureStore({
    reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;