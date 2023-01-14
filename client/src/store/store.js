/** @format */

import { configureStore } from '@reduxjs/toolkit';
import screenSizeReducer from './screenSize';
import themeReducer from './theme';
import setLogOutReducer from './loggedIn';
import loggedInReducer from './loggedIn';
import loggedUserReducer from './loggedUser';
import loadingReducer from './loading';
import cartReducer from './cart';
import wishlistReducer from './wishlist';

const store = configureStore({
  reducer: {
    screenSize: screenSizeReducer,
    loggedIn:loggedInReducer,
    theme: themeReducer,
    setLogOut: setLogOutReducer,
    loggedUser: loggedUserReducer,
    loading: loadingReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
export default store;
