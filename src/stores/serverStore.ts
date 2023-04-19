import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getList = createAsyncThunk(
	'server/getList',
	async () => {
		try {
			const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/servers/list`, {withCredentials: true})
			// console.log(response.data)
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

interface Server {
	id: string,
  name: string,
	members: string[],
	created: string,
	updated: string,
	// channels: Array,
}

export interface ServerState {
	status: "fulfilled" | "rejected" | "pending" | "",
	statusCreate: "fulfilled" | "rejected" | "pending" | "",
	statusUpdate: "fulfilled" | "rejected" | "pending" | "",
	statusDelete: "fulfilled" | "rejected" | "pending" | "",
	serverList: Server[],
	server: Server,
	error: Object,
}

const initialState: ServerState = {
	status: '',
	statusCreate: '',
	statusUpdate: '',
	statusDelete: '',
	serverList: [],
	server: { id: '', name: '', members: [], created: '', updated: ''},
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
		setServer: (state, action) => {
			let {id, name, members, created, updated} = action.payload
			state.server.id = id;
			state.server.name = name;
			state.server.members = members;
			state.server.created = created;
			state.server.updated = updated;
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
			state.server = action.payload
		})
		builder.addCase(postUpdateServer.rejected, (state, action) => {
			state.statusUpdate = "rejected"
			state.error = action.payload as Object
		})
		builder.addCase(postDeleteServer.fulfilled, (state, action) => {
			state.statusDelete = "fulfilled"
			let sl = state.serverList.filter(e => e.id != state.server.id)
			state.serverList = sl
			state.server = { id: '', name: '', members: [], created: '', updated: ''}
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
	setServer
} = serverSlice.actions

export default serverSlice.reducer