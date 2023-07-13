import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/Store";

interface BookData{
    firstName: string,
      lastName: string,
      Email:string,
      person: string,
      packageId: string|undefined,
      travelDate: string
}

const initialState = {
    bookedData: {}
}

const userBookingSlice = createSlice({
    name: 'userBookedData',
    initialState,
    reducers: {      
        setBookingDetails(state,action:PayloadAction<BookData>){
            state.bookedData = {bookedData: action.payload}
        }
    }
})



export const {setBookingDetails} = userBookingSlice.actions
export const selectBookedData = (state: RootState)=> state.userBookData.bookedData
export const userBookReducer = userBookingSlice.reducer;