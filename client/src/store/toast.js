/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
};
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, { payload }) {
      state.message = payload;
    },
    resetMessage(state) {
      state.message = '';
    },
  },
});

export const { setMessage,resetMessage } = messageSlice.actions;
export default messageSlice.reducer;
