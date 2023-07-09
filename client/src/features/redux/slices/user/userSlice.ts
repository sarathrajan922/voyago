import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/Store";


const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{user:any}>){
            state.user = {user:action.payload}
        },
        clearUser(state){
            state.user= {}
        }
    }
})


export const {setUser,clearUser}= userSlice.actions

export const selectUser = (state:RootState)=> state.userData.user

export const userReducer = userSlice.reducer;