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

interface Server {
	id: String,
  name: String,
	members: String[],
}


export interface ServerState {
	status: "fulfilled" | "rejected" | "pending" | "",
	statusCreate: "fulfilled" | "rejected" | "pending" | "",
	serverList: Server[],
	error: Object,
}

const initialState: ServerState = {
	status: '',
	statusCreate: '',
	serverList: [],
	error: {}
}

export const serverSlice = createSlice({
	name: 'server',
	initialState,
	reducers: {
		resetCreateStatus: (state) => {
			state.statusCreate = ""
		},
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
	},
})

export const {
	resetCreateStatus
} = serverSlice.actions

export default serverSlice.reducer