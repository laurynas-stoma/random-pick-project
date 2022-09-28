import { forwardRef } from 'react';

import styles from './Input.module.css';

const Input = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className={styles.input}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      type={props.type}
      min={props.minValue}
      max={props.maxValue}
      value={props.value}
      maxLength={props.maxLength}
    />
  );
});

export default Input;
