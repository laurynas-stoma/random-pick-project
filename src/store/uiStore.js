import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'store',
  initialState: {
    error: null,
    isLoading: false,
  },
  reducers: {
    //Add book to a viewed books list
    setIsLoading(state, action) {
      state.isLoading = action.payload.state;
    },

    //Remove book from a viewed books list
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
