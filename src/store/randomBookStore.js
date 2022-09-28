import { createSlice } from '@reduxjs/toolkit';

const randomBookSlice = createSlice({
  name: 'random-books',
  initialState: {
    currentItem: null,
    nextItem: null,
    previousItem: null,
    categoriesFilter: [],
    minYearFilter: '',
    maxYearFilter: '',
    filtersCounter: 0,
    filtersError: false,
    collection: [],
  },
  reducers: {
    setCurrentItem(state, action) {
      state.currentItem = action.payload.item;
    },
    setCollection(state, action) {
      let collection = action.payload.collection;
      function filterCollection(collection, filters) {
        return collection.filter((val) =>
          filters.some((filter) => val.areas.includes(filter))
        );
      }
      if (state.categoriesFilter.length > 0) {
        collection = filterCollection(collection, state.categoriesFilter);
      }
      if (state.minYearFilter !== '') {
        collection = collection.filter(
          (val) => val.year >= state.minYearFilter
        );
      }
      if (state.maxYearFilter !== '') {
        collection = collection.filter(
          (val) => val.year <= state.maxYearFilter
        );
      }
      state.collection = collection;
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
    setFilterError(state, action) {
      state.filtersError = action.payload.state;
    },
  },
});

export const randomBookActions = randomBookSlice.actions;
export default randomBookSlice;
