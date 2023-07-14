import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '../slices/user/userSlice'
import { agentReducer } from '../slices/agent/agentSlice'
import { userBookReducer } from '../slices/user/userBookingSlice'
export const store = configureStore({
    reducer: {
        userData: userReducer,
        agentData: agentReducer,
        userBookData: userBookReducer
    }
})


export type State = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store