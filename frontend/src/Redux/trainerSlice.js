import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    tid: null,
    trToken: null,
  },
  reducers: {
    setTrainerId: (state, action) => {
      state.tid = action.payload;
    },
    setTrainerToken: (state, action) => {
      state.trToken = action.payload;
    },
  },
});

export const { setTrainerId, setTrainerToken } = trainerSlice.actions;
export default trainerSlice.reducer;
