import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './booksStore';
import randomBookSlice from './randomBookStore';
import uiSlice from './uiStore';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    books: booksSlice.reducer,
    randomBook: randomBookSlice.reducer,
  },
});

export default store;
