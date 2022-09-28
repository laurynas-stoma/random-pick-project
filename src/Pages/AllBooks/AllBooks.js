import { useEffect, useState } from 'react';
import { fetchFirestoreCollection } from '../../store/store-actions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from '../../components/Gallery/Gallery';
import GalleryItem from '../../components/Gallery/GalleryItem/GalleryItem';
import { FiSearch, FiSettings } from 'react-icons/fi';
import DiscoverBanner from '../../components/DiscoverBanner/DiscoverBanner';
import BookFilters from '../../components/BookFilters/BookFilters';
import SettingsBottomNav from '../../components/BottomNavigation/SettingsBottomNav';
import { booksStoreActions } from '../../store/booksStore';

//Styles
import styles from './AllBooks.module.css';

const AllBooks = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [data, setData] = useState();
  const categoriesFilter = useSelector((state) => state.books.categoriesFilter);
  const minYearFilter = useSelector((state) => state.books.minYearFilter);
  const maxYearFilter = useSelector((state) => state.books.maxYearFilter);
  const [filtersSelected, setFiltersSelected] = useState({
    categories: [],
    minYear: '',
    maxYear: '',
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFirestoreCollection('books')).then((data) => setData(data));
  }, [dispatch]);

  useEffect(() => {
    setFiltersSelected({
      categories: categoriesFilter,
      minYear: minYearFilter,
      maxYear: maxYearFilter,
    });
  }, [categoriesFilter, minYearFilter, maxYearFilter]);

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
            booksStoreActions.setFilters({ filtersSelected: filtersSelected })
          );
          setIsSettingsOpen(false);
        } else {
          setIsSettingsOpen(false);
        }
      }
      console.log(categoriesFilter);
    }
  };

  return (
    <div className={styles.container}>
      {!isSettingsOpen && (
        <div className={styles.header}>
          <h1>All books</h1>
          <div className={styles['header-actions']}>
            <button className={`${styles['btn-container']}`}>
              <FiSearch className={`${styles.search} ${styles.icon}`} />
            </button>
            <button
              className={`${styles['btn-container']}`}
              onClick={() => clickSettingsAction('SETTINGS_OPEN')}
            >
              <FiSettings className={`${styles.settings} ${styles.icon}`} />
            </button>
          </div>
        </div>
      )}
      {!isSettingsOpen && !isLoading && data && (
        <>
          <Gallery>
            {data.map((item) => {
              return (
                <Link to={`/book/${item.id}`} key={item.id}>
                  <GalleryItem
                    image={item.image}
                    title={item.title}
                    subtitle={item.author}
                    id={item.id}
                  />
                </Link>
              );
            })}
          </Gallery>

          <DiscoverBanner
            text="Would you like others to discover your favorite book?"
            ctaText="Submit a book"
            linkTo="/submit-book"
          />
        </>
      )}
      {isSettingsOpen && (
        <BookFilters
          onSetFilters={setFilters}
          filtersSelected={filtersSelected}
        />
      )}
      {isSettingsOpen && (
        <SettingsBottomNav onClickSettings={clickSettingsAction} />
      )}
    </div>
  );
};

export default AllBooks;