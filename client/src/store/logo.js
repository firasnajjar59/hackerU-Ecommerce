import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dark: "",
  light: "",
};
const logoSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {
    setLogoImg(state,{payload}) {
        state.dark = payload.dark;
        state.light = payload.light;
    }
  },
});

export const { setLogoImg } = logoSlice.actions;
export default logoSlice.reducer;