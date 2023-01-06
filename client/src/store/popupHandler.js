import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginHidden:true,
  registerHidden:true,
  cartHidden:true,
  hamburgerMenuHidden:true,
  productImgHidden:true,
};
const popupHandlerSlice = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    setShow(state,{payload}) {
      state[payload] = false;
    },
    setHidden(state,{payload}) {
      state[payload] = true;
    },
  },
});

export const { setShow,setHidden } = popupHandlerSlice.actions;
export default popupHandlerSlice.reducer;