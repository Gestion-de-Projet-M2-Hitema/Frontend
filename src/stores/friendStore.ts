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

export const addFriend = createAsyncThunk(
    'profile/addFriend',
    async ({id}: {id: number}) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/friends/invite`, {user: id}, {withCredentials: true})
            return response.data
        } catch (error: any) {
            return console.error(error)
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

export const getUsers = createAsyncThunk(
    'profile/getUsers',
    async ({page = 1, limit = 1}: {page: number, limit: number}) => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/users/list?page=${page}&limit=${limit}`, {withCredentials: true})
            return response.data
        } catch (error: any) {
            return console.error(error)
        }
    }
)

export const getFriendRequest = createAsyncThunk(
    'profile/getFriendRequest',
    async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/friends/list-request`, {withCredentials: true})
            return response.data
        } catch (error: any) {
            return console.error(error)
        }
    }
)

export const acceptFriendRequest = createAsyncThunk(
    'profile/acceptFriendRequest',
    async ({idRequest, id}: {idRequest: string, id: string}) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/friends/accept/${idRequest}`, {}, {withCredentials: true})
            return {idRequest, id}
        } catch (error: any) {
            console.error(error)
            return {idRequest, id}
        }
    }
)

export const declineFriendRequest = createAsyncThunk(
    'profile/declineFriendRequest',
    async ({idRequest, id}: {idRequest: string, id: string}) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/friends/decline/${idRequest}`, {}, {withCredentials: true})
            return {idRequest, id}
        } catch (error: any) {
            console.error(error)
            return {idRequest, id}
        }
    }
)

export interface Friend {
    id: string,
    username: string,
    avatar: string,
}

export interface FriendRequest extends Friend {
    idRequest: string,
}

export interface User extends Friend {}

interface FriendState {
    status: string,
    friendList: Friend[],
    users: User[],
    friendRequests: FriendRequest[]
}

const initialState: FriendState = {
    status: '',
    friendList: [],
    users: [],
    friendRequests: []
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

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.users = action.payload.items
        })

        builder.addCase(getFriendRequest.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.friendRequests = action.payload
        })

        builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
            state.status = "fulfilled"
            const currentFriends = JSON.parse(JSON.stringify(state.friendRequests))
            const friendToAdd = currentFriends.find((item: FriendRequest) => item.id == action.payload.id)
            state.friendList.push(friendToAdd)
            state.friendRequests = currentFriends.filter((item: FriendRequest) => item.idRequest != action.payload.idRequest)
        })
    },
})

export default friendSlice.reducer