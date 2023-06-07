import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/auth.slice'

export interface RootState {
	auth: auth
  }


  type auth = {
	userInfo: string
  }

const store = configureStore({
	reducer: {
		auth: authReducer
	},
	devTools: true
})


export default store