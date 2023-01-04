/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
};
const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState,
  reducers: {
    setScreenSize(state) {
      state.screenWidth = window.innerWidth;
      state.screenHeight = window.innerHeight;
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;
