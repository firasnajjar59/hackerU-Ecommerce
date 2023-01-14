import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
};
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    doneLoading(state) {
      state.loading = false;
    },
  },
});

export const { startLoading,doneLoading } = loadingSlice.actions;
export default loadingSlice.reducer;