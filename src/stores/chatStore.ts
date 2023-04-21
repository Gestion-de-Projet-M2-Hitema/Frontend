import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getChat = createAsyncThunk(
    'chat/getChat',
    async ({ email, password }: { email: string, password: string }, {rejectWithValue}) => {
        try {
            // const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/users/login`, { email, password }, { withCredentials: true })
            // return response.data
            return []
        } catch (error: any) {
            return rejectWithValue(error.response.data.error)            
        }
    }
)

export interface ChatMessage {
    id: string,
    content: string,
    image: string | null,
    user: {
        id: string,
        username: string,
        avatar: string
    },
    date: string,
}

export interface AuthState {
    status: "fulfilled" | "rejected" | "pending" | "",
    messages: ChatMessage[],
}

const initialState: AuthState = {
    status: "",
    messages: [],
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: { },
    //TODO: create new store to receive html document
    extraReducers(builder) {
      builder.addCase(getChat.fulfilled, (state, action) => {
        state.status = "fulfilled"
        state.messages = action.payload
      })
      builder.addCase(getChat.rejected, (state, action) => {
        state.status = "rejected"
      })
    },
})

export default chatSlice.reducer