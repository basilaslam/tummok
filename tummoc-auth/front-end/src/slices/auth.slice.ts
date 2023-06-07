import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem('userInfo') || null
const initialState = {
	userInfo: user
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers:{
		logIn: (state, action) => {
			state.userInfo = action.payload

			localStorage.setItem('userInfo', JSON.stringify(action.payload))
		},
		logOut:(state) => {
			state.userInfo = null
			localStorage.removeItem('userInfo')
		}
	}
})


export default authSlice.reducer
export const { logIn, logOut } = authSlice.actions
