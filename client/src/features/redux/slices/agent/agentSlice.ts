import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/Store";
import { Agent } from "http";


const initialState= {
    agent: {}
}


const agentSlice = createSlice({
    name: 'agentData',
    initialState,
    reducers: {
        setAgent(state,action: PayloadAction<{agent: any}>){
            state.agent = {agent: action.payload}
        },
        clearAgent(state){
            state.agent= {}
        }
    }
})

export const { setAgent,clearAgent} = agentSlice.actions
export const selectAgent = (state:RootState)=> state.agentData.agent

export const agentReducer = agentSlice.reducer;