import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const postLogin = createAsyncThunk(
    'auth/postLogin',
    async ({ email, password }: { email: string, password: string }) => {
        const response = await axios.post(process.env.REACT_APP_API_ENDPOINT + `/users/login`, { email: "frat@test.com", password: "testtest" })
        console.log(response)
        return response.data
    }
)

export interface AuthState {
    email: string;
    password: string;
    name: string;
    avatar: string;
    created?: Date;
    updated?: Date;
}

const initialState: AuthState = {
    email: "",
    password: "",
    name: "",
    avatar: "",
    created: undefined,
    updated: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    //TODO: create new store to receive html document
    extraReducers(builder) {
      builder.addCase(postLogin.fulfilled, (state, action) => {
        state = action.payload
      })
    },
  })

  export default authSlice.reducer