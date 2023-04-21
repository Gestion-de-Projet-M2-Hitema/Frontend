import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Server } from "./serverStore";
import axios from 'axios';

export const getListAllServer = createAsyncThunk(
	'sR/getListAllServer',
	async () => {
		try {
			const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/servers/getAll`, {withCredentials: true})
			return response.data
		} catch (error: any) {
			return console.error(error)
		}
	}
)

export const getListSrForUser = createAsyncThunk(
	'sR/getListSrForUser',
	async () => {
		try {
			const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/server_requests/get`, {withCredentials: true})
			return response.data
		} catch (error: any) {
			return console.error(error)
		}
	}
)

export const getListSrForServer = createAsyncThunk(
	'sR/getListSrForServer',
	async ({id, page, limit} : {id : string, page: number, limit: number}) => {
		try {
			const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `/server_requests/list/` + id + "?page=" + page + "&limit=" + limit, {withCredentials: true})
			return response.data
		} catch (error: any) {
			return console.error(error)
		}
	}
)

export const postCreateSr = createAsyncThunk(
	'sR/postCreateSr',
	async ( to: string , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/server_requests/create`, { to }, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export const postAcceptSr = createAsyncThunk(
	'sR/postAcceptSr',
	async ( idSr: string , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/server_requests/accept/` + idSr, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export const postDeclineSr = createAsyncThunk(
	'sR/postDeclineSr',
	async ( idSr: string , {rejectWithValue}) => {
		try {
			const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/server_requests/decline/` + idSr, { withCredentials: true })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.error)
		}
	}
)

export interface Sr {
	id: string,
  from: string,
  to: string,
  created: string,
  updated: string,
}

export interface paginate {
	items: Sr[],
	page: number,
	perPage: number,
	totalItems: number,
	totalPages: number,
}

export interface SrState {
	statusSr: "fulfilled" | "rejected" | "pending" | "",
	statusSrCreate: "fulfilled" | "rejected" | "pending" | "",
	statusSrAccept: "fulfilled" | "rejected" | "pending" | "",
	statusSrDecline: "fulfilled" | "rejected" | "pending" | "",
	allServerList: Server[],
	srUserList: Sr[],
	srServerList: paginate,
}

const initialState: SrState = {
	statusSr: '',
	statusSrCreate: '',
	statusSrAccept: '',
	statusSrDecline: '',
	allServerList: [],
	srUserList: [],
	srServerList: {items: [], page: 0, perPage: 0, totalItems: 0, totalPages: 0}
}

export const srSlice = createSlice({
	name: 'sr',
	initialState,
	reducers: {
		resetSrStatus: (state) => {
			state.statusSr = ""
		},
		resetCreateSrStatus: (state) => {
			state.statusSrCreate = ""
		},
		resetAcceptSrStatus: (state) => {
			state.statusSrAccept = ""
		},
		resetDeclineSrStatus: (state) => {
			state.statusSrDecline = ""
		},
	},
	extraReducers(builder) {
		builder.addCase(getListAllServer.fulfilled, (state, action) => {
			state.statusSr = "fulfilled"
			state.allServerList = action.payload
		})
		builder.addCase(getListAllServer.rejected, (state, action) => {
			state.statusSr = "rejected"
		})
		builder.addCase(getListSrForUser.fulfilled, (state, action) => {
			state.statusSr = "fulfilled"
			state.srUserList = action.payload
		})
		builder.addCase(getListSrForUser.rejected, (state, action) => {
			state.statusSr = "rejected"
		})
		builder.addCase(getListSrForServer.fulfilled, (state, action) => {
			state.statusSr = "fulfilled"
			state.srServerList = action.payload
		})
		builder.addCase(getListSrForServer.rejected, (state, action) => {
			state.statusSr = "rejected"
		})

		builder.addCase(postCreateSr.fulfilled, (state, action) => {
			state.statusSrCreate = "fulfilled"
			state.srUserList.push(action.payload) 
		})
		builder.addCase(postCreateSr.rejected, (state, action) => {
			state.statusSrCreate = "rejected"
		})

		builder.addCase(postAcceptSr.fulfilled, (state, action) => {
			state.statusSrAccept = "fulfilled"
		})
		builder.addCase(postAcceptSr.rejected, (state, action) => {
			state.statusSrAccept = "rejected"
			// state.channelError = action.payload as Object
		})
		builder.addCase(postDeclineSr.fulfilled, (state, action) => {
			state.statusSrDecline = "fulfilled"
		})
		builder.addCase(postDeclineSr.rejected, (state, action) => {
			state.statusSrDecline = "rejected"
			// state.channelError = action.payload as Object
		})
	},
})

export const {
	resetSrStatus,
	resetCreateSrStatus,
	resetAcceptSrStatus,
	resetDeclineSrStatus,
} = srSlice.actions

export default srSlice.reducer