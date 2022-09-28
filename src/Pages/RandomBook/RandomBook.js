import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFirebaseCollection,
  fetchFirestoreItem,
} from '../../store/store-actions';
import { shuffleArray } from '../../util/shuffleArray';
import { randomBookActions } from '../../store/randomBookStore';

//Components
import BookItem from '../../components/BookItem/BookItem';
import BookFilters from '../../components/BookFilters/BookFilters';
import BookBottomNav from '../../components/BottomNavigation/BookBottomNav';
import SettingsBottomNav from '../../components/BottomNavigation/SettingsBottomNav';

const RandomBook = () => {
  const dispatch = useDispatch();
  const categoriesFilter = useSelector(
    (state) => state.randomBook.categoriesFilter
  );
  const minYearFilter = useSelector((state) => state.randomBook.minYearFilter);
  const maxYearFilter = useSelector((state) => state.randomBook.maxYearFilter);
  const [filtersSelected, setFiltersSelected] = useState({
    categories: [],
    minYear: '',
    maxYear: '',
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const collection = useSelector((state) => state.randomBook.collection);
  const currentItem = useSelector((state) => state.randomBook.currentItem);

  useEffect(() => {
    setIsSettingsOpen(false);
    const fetchRandomItem = (collection) => {
      return async (dispatch) => {
        const collectionResult = await dispatch(
          fetchFirebaseCollection(collection)
        );
        const shuffledCollection = shuffleArray(collectionResult);
        dispatch(
          randomBookActions.setCollection({ collection: shuffledCollection })
        );
        const firstItem = shuffledCollection[0];
        return firstItem;
      };
    };

    const fetchItem = (collection) => {
      return async (dispatch) => {
        const firstItem = await dispatch(fetchRandomItem(collection));
        const fullItemData = await dispatch(
          fetchFirestoreItem(collection, firstItem.id)
        );
        dispatch(randomBookActions.setCurrentItem({ item: fullItemData }));
      };
    };

    if (collection.length === 0) dispatch(fetchItem('books'));
  }, [dispatch, collection.length]);

  useEffect(() => {
    setFiltersSelected({
      categories: categoriesFilter,
      minYear: minYearFilter,
      maxYear: maxYearFilter,
    });
  }, [categoriesFilter, minYearFilter, maxYearFilter]);

  const clickNext = async (id) => {
    if (!isLoading) {
      const fullItemData = await dispatch(fetchFirestoreItem('books', id));
      dispatch(randomBookActions.setCurrentItem({ item: fullItemData }));
    }
  };

  const clickPrevious = async (id) => {
    if (!isLoading) {
      const fullItemData = await dispatch(fetchFirestoreItem('books', id));
      dispatch(randomBookActions.setCurrentItem({ item: fullItemData }));
    }
  };

  const setFilters = (filters) => {
    setFiltersSelected(filters);
  };

  const clickSettingsAction = (action) => {
    if (!isLoading) {
      if (action === 'SETTINGS_OPEN') setIsSettingsOpen(true);
      if (action === 'SETTINGS_CANCEL') {
        setFiltersSelected({
          categories: categoriesFilter,
          minYear: minYearFilter,
          maxYear: maxYearFilter,
        });
        setIsSettingsOpen(false);
      }
      if (action === 'SETTINGS_CONFIRM') {
        if (
          filtersSelected.categories !== categoriesFilter ||
          filtersSelected.minYear !== minYearFilter ||
          filtersSelected.maxYear !== maxYearFilter
        ) {
          dispatch(
            randomBookActions.setFilters({ filtersSelected: filtersSelected })
          );
          setIsSettingsOpen(false);
        } else {
          setIsSettingsOpen(false);
        }
      }
    }
  };

  return (
    <div>
      {currentItem && !isLoading && !isSettingsOpen && (
        <BookItem book={currentItem} />
      )}
      {isSettingsOpen && (
        <BookFilters
          onSetFilters={setFilters}
          filtersSelected={filtersSelected}
        />
      )}
      {!isSettingsOpen && (
        <BookBottomNav
          onClickNext={clickNext}
          onClickPrevious={clickPrevious}
          onClickSettings={clickSettingsAction}
        />
      )}
      {isSettingsOpen && (
        <SettingsBottomNav onClickSettings={clickSettingsAction} />
      )}
    </div>
  );
};

export default RandomBook;
