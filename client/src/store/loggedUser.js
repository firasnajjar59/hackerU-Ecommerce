import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
};
const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    setUser(state,{payload}) {
        state.user = payload;
    },
    removeUser(state) {
        state.user = {};
    }
  },
});

export const { setUser,removeUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;