import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    collection: [],
    currentItem: null,
    availableCategories: [],
    categoriesFilter: [],
    minYearFilter: '',
    maxYearFilter: '',
    filtersCounter: 0,
  },
  reducers: {
    setCollection(state, action) {
      state.collection = action.payload.collection;
    },
    setCurrentItem(state, action) {
      state.currentItem = action.payload.item;
    },
    setAvailableCategories(state, action) {
      state.availableCategories = action.payload.categories;
    },
    setFilters(state, action) {
      state.categoriesFilter = [...action.payload.filtersSelected.categories];
      state.minYearFilter = action.payload.filtersSelected.minYear;
      state.maxYearFilter = action.payload.filtersSelected.maxYear;
      state.filtersCounter = 0;
      state.filtersCounter =
        state.filtersCounter + state.categoriesFilter.length;
      if (state.minYearFilter !== '' || state.maxYearFilter !== '') {
        state.filtersCounter = state.filtersCounter + 1;
      }
    },
  },
});

export const booksStoreActions = booksSlice.actions;
export default booksSlice;
