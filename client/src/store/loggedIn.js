import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
};
const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    setLogIn(state) {
      state.loggedIn = true;
    },
    setLogOut(state) {
      state.loggedIn = false;
    },
  },
});

export const { setLogIn,setLogOut } = loggedInSlice.actions;
export default loggedInSlice.reducer;