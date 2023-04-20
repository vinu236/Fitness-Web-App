import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";
import trainerSlice from "./trainerSlice";

//configuring store=> and store contains slices

const store = configureStore({
  reducer: {
    user: userSlice, // add userSlice to Redux store
    modal: modalSlice,
    trainer: trainerSlice,
  },
});

export default store;
