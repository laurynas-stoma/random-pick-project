import React, { useEffect, useRef } from 'react';
import Pill from '../../Pill/Pill';
import { HiOutlineX } from 'react-icons/hi';
import styles from './SelectedValue.module.css';

const SelectedValue = ({ onValueRemove, value }) => {
  const valueXRef = useRef('');

  useEffect(() => {
    const ref = valueXRef.current;
    const handler = (e) => {
      switch (e.code) {
        case 'Enter':
        case 'Space':
          onValueRemove(value);
          break;
        default:
          break;
      }
    };

    ref.addEventListener('keydown', handler);

    return () => {
      ref.removeEventListener('keydown', handler);
    };
  }, [onValueRemove, value]);

  return (
    <Pill className={styles.container}>
      {value}
      <div
        tabIndex={0}
        ref={valueXRef}
        className={styles.close}
        onClick={() => onValueRemove(value)}
      >
        <HiOutlineX className={styles['close-icon']} />
      </div>
    </Pill>
  );
};

export default SelectedValue;
