import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    tToken: null,
    isBlocked:true
  },
  //when are these reducers called? on the dispatch of an actions
  reducers: {
    setUserId: (state, action) => {
      state.uid = action.payload;
    },
    setIsBlocked:(state,action)=>{
      state.isBlocked=action.payload
    },
    setToken: (state, action) => {
      state.tToken = action.payload;
    },
  },
});

//exporting actions
export const { setUserId, setToken,setIsBlocked } = userSlice.actions;
//exporting reducers
export default userSlice.reducer;

// the job of the useSelector is give access to the store . which is imported from react-redux(bridge b/w redux and react)
