import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlist: [],
};
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addArrProductToWishlist(state,{payload}) {
      state.wishlist=payload;
    },
   
  },
});

export const { addArrProductToWishlist,addProductToWishlist,removeProuctFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;