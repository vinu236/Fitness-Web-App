import {createSlice} from "@reduxjs/toolkit";

const modalSlice=createSlice({
    name:"modal",
    initialState:{
        show:false,
    },
    reducers:{
        setLogin:(state,action)=>{
            state.show=action.payload
        }
    }
});

export const{setLogin}=modalSlice.actions;
export default modalSlice.reducer;