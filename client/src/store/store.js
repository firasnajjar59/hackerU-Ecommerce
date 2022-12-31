/** @format */

import { configureStore } from '@reduxjs/toolkit';
import screenSizeReducer from './screenSize';

const store = configureStore({
  reducer: {
    screenSize: screenSizeReducer,
  },
});
export default store;
