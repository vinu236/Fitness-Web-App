import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    tToken: null,
  },
  //when are these reducers called? on the dispatch of an actions
  reducers: {
    setUserId: (state, action) => {
      state.uid = action.payload;
    },
    setToken: (state, action) => {
      state.tToken = action.payload;
    },
  },
});

//exporting actions
export const { setUserId, setToken } = userSlice.actions;
//exporting reducers
export default userSlice.reducer;

// the job of the useSelector is give access to the store . which is imported from react-redux(bridge b/w redux and react)
