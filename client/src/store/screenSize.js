/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screenSize: window.innerWidth,
};
const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState,
  reducers: {
    setScreenSize(state, { payload }) {
      state.screenSize = payload;
      console.log(payload);
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;
