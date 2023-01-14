import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addArrProductToCart(state,{payload}) {
      state.cart=payload;
    },
    addProductToCart(state,{payload}) {
      let cartArr=state.cart.filter(product=>product==payload)
      if(!cartArr.length>0){
        state.cart.push(payload);
      }
    },
    removeProuctFromCart(state,{payload}) {
      state.cart.splice(payload,1);
    },
  },
});

export const { addArrProductToCart,addProductToCart,removeProuctFromCart } = cartSlice.actions;
export default cartSlice.reducer;