import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const postSignup = createAsyncThunk(
    'auth/postSignin',
    async ({ username, name, email, password, passwordConfirm }: { username: string, name: string, email: string, password: string, passwordConfirm: string }, {rejectWithValue}) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_ENDPOINT + `/users/register`, { username, name, email, password, passwordConfirm }, { withCredentials: true })
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.error)            
        }
    }
)

export interface SignupState {
    status: "fulfilled" | "rejected" | "pending" | "",
    error: {
			username: string,
			email: string,
			password: string,
			passwordConfirm: string,
			name: string,
    };
}

const initialState: SignupState = {
		status: "",
    error: {
			username: '',
			email: '',
			password: '',
			passwordConfirm: '',
			name: '',
    },
}

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(postSignup.fulfilled, (state, action) => {
        state.status = "fulfilled"
        state.error = {username: '', email: '', password: '', passwordConfirm: '', name: ''}
      })
      builder.addCase(postSignup.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.payload as {username: string, email: string, password: string, passwordConfirm: string, name: string}
      })
    },
  })

  export default signupSlice.reducer