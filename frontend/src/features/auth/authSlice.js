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
  },
});

export const { registerUserSuccess, loginUserSuccess } = userSlice.actions;

export default userSlice.reducer;
