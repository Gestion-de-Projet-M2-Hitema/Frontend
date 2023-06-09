import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getList = createAsyncThunk(
	'server/getList',
	async () => {
		try {
			const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/servers/list`, {withCredentials: true})
			return response.data
		} catch (error: any) {
			return console.error(error)
		}
	}
)

export const postCreateServer = createAsyncThunk(
	'server/postCreateServer',
	async ( name:string , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/servers/create`, { name }, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export const postUpdateServer = createAsyncThunk(
	'server/postUpdateServer',
	async ( {id, name} : {id: string, name: string} , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/servers/update/` + id, { name }, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export const postDeleteServer = createAsyncThunk(
	'server/postDeleteServer',
	async ( id: string , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/servers/remove/` + id, { }, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export interface Server {
	id: string,
  name: string,
	members: string[],
	created: string,
	updated: string,
}

export interface ServerState {
	status: "fulfilled" | "rejected" | "pending" | "",
	statusCreate: "fulfilled" | "rejected" | "pending" | "",
	statusUpdate: "fulfilled" | "rejected" | "pending" | "",
	statusDelete: "fulfilled" | "rejected" | "pending" | "",
	serverList: Server[],
	serverId: string,
	error: Object,
}

const initialState: ServerState = {
	status: '',
	statusCreate: '',
	statusUpdate: '',
	statusDelete: '',
	serverList: [],
	serverId: '',
	error: {}
}

export const serverSlice = createSlice({
	name: 'server',
	initialState,
	reducers: {
		resetCreateStatus: (state) => {
			state.statusCreate = ""
		},
		resetUpdateStatus: (state) => {
			state.statusUpdate = ""
		},
		resetDeleteStatus: (state) => {
			state.statusDelete = ""
		},
		setServerId: (state, action) => {
			state.serverId = action.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(getList.fulfilled, (state, action) => {
			state.status = "fulfilled"
			state.serverList = action.payload
		})
		builder.addCase(getList.rejected, (state, action) => {
			state.status = "rejected"
		})
		builder.addCase(postCreateServer.fulfilled, (state, action) => {
			state.statusCreate = "fulfilled"
			state.serverList.push(action.payload) 
		})
		builder.addCase(postCreateServer.rejected, (state, action) => {
			state.statusCreate = "rejected"
			state.error = action.payload as Object
		})
		builder.addCase(postUpdateServer.fulfilled, (state, action) => {
			state.statusUpdate = "fulfilled"
			let index = state.serverList.findIndex(s => s.id == action.payload.id)
			if(~!!index) {
				state.serverList[index] = action.payload
			}
		})
		builder.addCase(postUpdateServer.rejected, (state, action) => {
			state.statusUpdate = "rejected"
			state.error = action.payload as Object
		})
		builder.addCase(postDeleteServer.fulfilled, (state, action) => {
			state.statusDelete = "fulfilled"
			let sl = state.serverList.filter(e => e.id != state.serverId)
			state.serverList = sl
			state.serverId = ""
		})
		builder.addCase(postDeleteServer.rejected, (state, action) => {
			state.statusDelete = "rejected"
			state.error = action.payload as Object
		})
	},
})

export const {
	resetCreateStatus,
	resetUpdateStatus,
	resetDeleteStatus,
	setServerId
} = serverSlice.actions

export default serverSlice.reducer