/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'theme-light',
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.theme = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
