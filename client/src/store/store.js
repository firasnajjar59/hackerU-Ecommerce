/** @format */

import { configureStore } from '@reduxjs/toolkit';
import screenSizeReducer from './screenSize';
import themeReducer from './theme';

const store = configureStore({
  reducer: {
    screenSize: screenSizeReducer,
    theme: themeReducer,
  },
});
export default store;
