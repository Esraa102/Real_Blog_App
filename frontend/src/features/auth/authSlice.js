import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    registerUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    loginUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    googleAuthSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logOutUserSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  registerUserSuccess,
  loginUserSuccess,
  googleAuthSuccess,
  updateProfileSuccess,
  logOutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
