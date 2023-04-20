import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getListChannel = createAsyncThunk(
	'channel/getListChannel',
	async (id: string) => {
		try {
			const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/channels/list/` + id, {withCredentials: true})
			return response.data
		} catch (error: any) {
			return console.error(error)
		}
	}
)

export const postCreateChannel = createAsyncThunk(
	'channel/postCreateChannel',
	async ( {id, name} : {id: string, name: string} , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/channels/create/` + id, { name }, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export const postUpdateChannel = createAsyncThunk(
	'channel/postUpdateChannel',
	async ( {id, name} : {id: string, name: string} , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/channels/update/` + id, { name }, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export const postDeleteChannel = createAsyncThunk(
	'channel/postDeleteChannel',
	async ( id: string , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/channels/delete/` + id, { }, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export interface Channel {
	id: string,
  name: string,
	owner: string, // User ID
  server: string, // Server ID
  avatar: string,
  created: string,
  updated: string,
}

export interface ChannelState {
	statusChannel: "fulfilled" | "rejected" | "pending" | "",
	statusChannelCreate: "fulfilled" | "rejected" | "pending" | "",
	statusChannelUpdate: "fulfilled" | "rejected" | "pending" | "",
	statusChannelDelete: "fulfilled" | "rejected" | "pending" | "",
	channelList: Channel[],
	channelId: string,
	channelError: Object,
}

const initialState: ChannelState = {
	statusChannel: '',
	statusChannelCreate: '',
	statusChannelUpdate: '',
	statusChannelDelete: '',
	channelList: [],
	channelId: '',
	channelError: {}
}

export const channelSlice = createSlice({
	name: 'channel',
	initialState,
	reducers: {
		resetChannelStatus: (state) => {
			state.statusChannel = ""
		},
		resetCreateChannelStatus: (state) => {
			state.statusChannelCreate = ""
		},
		resetUpdateChannelStatus: (state) => {
			state.statusChannelUpdate = ""
		},
		resetDeleteChannelStatus: (state) => {
			state.statusChannelDelete = ""
		},
		setChannelId: (state, action) => {
			state.channelId = action.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(getListChannel.fulfilled, (state, action) => {
			state.statusChannel = "fulfilled"
			state.channelList = action.payload
		})
		builder.addCase(getListChannel.rejected, (state, action) => {
			state.statusChannel = "rejected"
		})
		builder.addCase(postCreateChannel.fulfilled, (state, action) => {
			state.statusChannelCreate = "fulfilled"
			state.channelList.push(action.payload) 
		})
		builder.addCase(postCreateChannel.rejected, (state, action) => {
			state.statusChannelCreate = "rejected"
			state.channelError = action.payload as Object
		})
		builder.addCase(postUpdateChannel.fulfilled, (state, action) => {
			state.statusChannelUpdate = "fulfilled"
			let index = state.channelList.findIndex(s => s.id == action.payload.id)
			if(~!!index) {
				state.channelList[index] = action.payload
			}
		})
		builder.addCase(postUpdateChannel.rejected, (state, action) => {
			state.statusChannelUpdate = "rejected"
			state.channelError = action.payload as Object
		})
		builder.addCase(postDeleteChannel.fulfilled, (state, action) => {
			state.statusChannelDelete = "fulfilled"
			let sl = state.channelList.filter(e => e.id != state.channelId)
			state.channelList = sl
			state.channelId = ""
		})
		builder.addCase(postDeleteChannel.rejected, (state, action) => {
			state.statusChannelDelete = "rejected"
			state.channelError = action.payload as Object
		})
	},
})

export const {
	resetChannelStatus,
	resetCreateChannelStatus,
	resetUpdateChannelStatus,
	resetDeleteChannelStatus,
	setChannelId
} = channelSlice.actions

export default channelSlice.reducer