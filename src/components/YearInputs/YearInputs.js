import { useEffect, useRef } from 'react';
import Input from '../Input/Input';

//Styles
import styles from './YearInputs.module.css';

const YearInputs = (props) => {
  const { minYear, maxYear } = props.years;
  const minYearRef = useRef('');
  const maxYearRef = useRef('');

  useEffect(() => {
    minYearRef.current.value = minYear;
    maxYearRef.current.value = maxYear;
  }, [minYear, maxYear]);

  const changeMinYear = (e) => {
    if (!Number.isNaN(+e.target.value)) {
      minYearRef.current.value = e.target.value;
      props.onChangeYears(e.target.value, maxYearRef.current.value);
    }
  };

  const changeMaxYear = (e) => {
    if (!Number.isNaN(+e.target.value)) {
      maxYearRef.current.value = e.target.value;
      props.onChangeYears(minYearRef.current.value, e.target.value);
    }
  };

  const blurMinYear = (e) => {
    // if (
    //   +e.target.value > +maxYearRef.current.value &&
    //   maxYearRef.current.value.length > 0 &&
    //   e.target.value.length > 0
    // ) {
    //   props.yearErrorHandler('minYear');
    // }
  };

  const blurMaxYear = (e) => {
    // if (
    //   +e.target.value < +minYearRef.current.value &&
    //   minYearRef.current.value.length > 0 &&
    //   e.target.value.length > 0
    // ) {
    //   props.yearErrorHandler('maxYear');
    // }
  };

  return (
    <div className={styles.container}>
      <Input
        ref={minYearRef}
        placeholder="From"
        maxLength="4"
        onBlur={blurMinYear}
        onChange={changeMinYear}
        value={minYearRef.current.value}
        type="text"
      />
      <Input
        ref={maxYearRef}
        placeholder="To"
        maxLength="4"
        onBlur={blurMaxYear}
        onChange={changeMaxYear}
        value={maxYearRef.current.value}
        type="text"
      />
    </div>
  );
};

export default YearInputs;
