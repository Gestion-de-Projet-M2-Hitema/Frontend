import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getFriends = createAsyncThunk(
    'profile/getFriends',
    async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/friends/list`, {withCredentials: true})
            return response.data
            // return [
            //     {id: "pxfjt6bzfd08e6b", username: "frat", avatar: ""},
            //     {id: "e2ssm69eh0tvsh1", username: "MrCookie78", avatar: ""},
            //     {id: "9pf96upgmw98vv4", username: "gturyz", avatar: ""},
            //     {id: "lzcbax0f1aftwj6", username: "Shifu", avatar: ""},
            // ]
        } catch (error: any) {
            return console.error(error)
            // return []
        }
    }
)

export const deleteFriends = createAsyncThunk(
    'profile/deleteFriends',
    async ({id}: {id: string}) => {
        try {
            const response = await axios.delete(import.meta.env.VITE_API_ENDPOINT + `/friends/${id}`, {withCredentials: true})
            // return response.data
            return id
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
        builder.addCase(deleteFriends.fulfilled, (state, action) => {
            state.status = "fulfilled"
            let currentFriends = JSON.parse(JSON.stringify(state.friendList))
            state.friendList = currentFriends.filter((item: Friend) => item.id != action.payload)
        })
    },
})

export default friendSlice.reducer