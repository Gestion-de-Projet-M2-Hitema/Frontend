import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getMe = createAsyncThunk(
    'profile/getMe',
    async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/users/me`, {withCredentials: true})
            console.log(response.data)
            return response.data
        } catch (error: any) {
            return console.error(error)
        }
    }
)

export interface ProfileState {
    status: "fulfilled" | "rejected" | "pending" | "",
    avatar: string,
    name: string,
    username: string,
    email: string,
    created: Date | undefined,
    friends: ProfileState[],
}

const initialState: ProfileState = {
    status: '',
    avatar: '',
    name: '',
    username: '',
    email: '',
    created: undefined,
    friends: [],
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.avatar = action.payload.avatar
            state.name = action.payload.name
            state.username = action.payload.username
            state.email = action.payload.email
            state.created = action.payload.created
            state.friends = action.payload.friends
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.status = "rejected"
        })
    },
})

export default profileSlice.reducer