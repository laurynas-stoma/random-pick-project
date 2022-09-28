import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import Dropdown from '../Dropdown/Dropdown';
import YearInputs from '../YearInputs/YearInputs';
import SelectedValue from './SelectedValue/SelectedValue';

//Styles
import styles from './BookFilters.module.css';


const BookFilters = (props) => {
  const availableCategoriesList = useSelector(
    (state) => state.books.availableCategories
  );
  const filtersSelected = props.filtersSelected;

  const addCategory = (item) => {
    const itemsArray = [...filtersSelected.categories, item];
    const categoriesUpdated = [...new Set(itemsArray)];
    const filtersUpdated = {
      ...filtersSelected,
      categories: categoriesUpdated,
    };
    props.onSetFilters(filtersUpdated);
  };

  const removeCategory = (item) => {
    const categoriesUpdated = filtersSelected.categories.filter(
      (category) => category !== item
    );
    const filtersUpdated = {
      ...filtersSelected,
      categories: categoriesUpdated,
    };
    props.onSetFilters(filtersUpdated);
  };

  const changeYears = (minYear, maxYear) => {
    const filtersUpdated = {
      ...filtersSelected,
      minYear: minYear,
      maxYear: maxYear,
    };
    props.onSetFilters(filtersUpdated);
  };

  return (
    <div className={styles.container}>
      <h1>Filters</h1>
      <h2>Select filters to get random picks to your taste</h2>
      <div className={styles.filters}>
        <Card className={`${styles.categories} ${styles.card}`}>
          <div className={styles.filter}>
            <div>
              <h3>Categories</h3>
              <p>Select one or more categories</p>
            </div>
            <Dropdown
              header="Select categories"
              onItemAdd={addCategory}
              dropdownItems={availableCategoriesList}
              dropdownItemsSelected={filtersSelected.categories}
            />
            {filtersSelected.categories.length > 0 && (
              <ul className={styles.list}>
                {filtersSelected.categories.map((category, idx) => {
                  return (
                    <SelectedValue
                      key={idx}
                      value={category}
                      onValueRemove={() => removeCategory(category)}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </Card>
        <Card className={`${styles.years} ${styles.card}`}>
          <div className={styles.filter}>
            <div>
              <h3>Year published</h3>
              <p>Select the range of book publishing years</p>
            </div>
            <YearInputs
              onChangeYears={changeYears}
              years={{
                minYear: filtersSelected.minYear,
                maxYear: filtersSelected.maxYear,
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookFilters;
