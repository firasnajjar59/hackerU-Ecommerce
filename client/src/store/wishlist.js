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
    addProductToWishlist(state,{payload}) {
      let wishlistArr=state.wishlist.filter(product=>product==payload)
      if(!wishlistArr.length>0){
        state.wishlist.push(payload);
      }
    },
    removeProuctFromWishlist(state,{payload}) {
      state.wishlist.splice(+payload,1);
    },
  },
});

export const { addArrProductToWishlist,addProductToWishlist,removeProuctFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;