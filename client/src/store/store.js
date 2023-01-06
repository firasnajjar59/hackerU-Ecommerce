/** @format */

import { configureStore } from '@reduxjs/toolkit';
import screenSizeReducer from './screenSize';
import themeReducer from './theme';
import setLogOutReducer from './loggedIn';
import popupHandlerReducer from './popupHandler';

const store = configureStore({
  reducer: {
    screenSize: screenSizeReducer,
    theme: themeReducer,
    setLogOut: setLogOutReducer,
    popupHandler: popupHandlerReducer,
  },
});
export default store;
