import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import Cookies from "js-cookie";

export const postLogin = createAsyncThunk(
    'auth/postLogin',
    async ({ email, password }: { email: string, password: string }, {rejectWithValue}) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/users/login`, { email, password }, { withCredentials: true })
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.error)            
        }
    }
)

export interface AuthState {
    status: "fulfilled" | "rejected" | "pending" | "",
    token: string;
    error: {
        email: string
        password: string
    };
}

const initialState: AuthState = {
    status: "",
    token: Cookies.get("jwt")|| "",
    error: {
        email: "",
        password: "",
    },
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSigninStatus: (state) => {
            state.status = ""
        },
        logout: (state) => {
            state.status = ""
            state.token = ""   
        }
    },
    //TODO: create new store to receive html document
    extraReducers(builder) {
      builder.addCase(postLogin.fulfilled, (state, action) => {
        state.status = "fulfilled"
        state.error = {email: "", password: ""}
        state.token = Cookies.get("jwt")|| ""
      })
      builder.addCase(postLogin.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.payload as {email: string, password: string}
      })
    },
  })

  export const {
    resetSigninStatus,
    logout
  } = authSlice.actions

  export default authSlice.reducer