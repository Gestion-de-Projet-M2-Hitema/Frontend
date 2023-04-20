import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getFriends = createAsyncThunk(
    'profile/getFriends',
    async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/friends/list`, {withCredentials: true})
            return response.data
        } catch (error: any) {
            return console.error(error)
        }
    }
)

export interface Friend {
    id: string,
    username: string,
    avatar: string,
}

interface FriendState {
    status: string,
    friendList: Friend[],
}

const initialState: FriendState = {
    status: '',
    friendList: [],
}

export const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getFriends.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.friendList = action.payload
        })
        builder.addCase(getFriends.rejected, (state, action) => {
            state.status = "rejected"
        })
    },
})

export default friendSlice.reducer