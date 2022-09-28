import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navigation.module.css';

const Navigation = () => {
  const navRef = useRef();
  const [navOpen, setNavOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const debouncedWindowWidth = useDebounce(windowWidth, 100);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [debouncedWindowWidth]);

  useEffect(() => {
    if (debouncedWindowWidth > 768) {
      navRef.current.classList.remove(styles['responsive-nav']);
      setNavOpen(false);
    }
  }, [debouncedWindowWidth]);

  const toggleNavigation = () => {
    const newNavOpenState = !navOpen;
    setNavOpen(newNavOpenState);
    newNavOpenState
      ? navRef.current.classList.add(styles['responsive-nav'])
      : navRef.current.classList.remove(styles['responsive-nav']);
  };

  const hideNavigation = () => {
    navRef.current.classList.remove(styles['responsive-nav']);
    setNavOpen(false);
  };

  let navigationButtons = navOpen ? (
    <button
      className={`${styles['nav-btn']} ${styles['nav-btn--close']}`}
      onClick={toggleNavigation}
    >
      <FaTimes />
    </button>
  ) : (
    <button
      className={`${styles['nav-btn']} ${styles['nav-btn--open']}`}
      onClick={toggleNavigation}
    >
      <FaBars />
    </button>
  );

  return (
    <div>
      <nav ref={navRef} className={`${styles.navigation}`}>
        <ul className={styles.list}>
          <li
            className={`${styles.item} ${styles['item--additional']}`}
            onClick={hideNavigation}
          >
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={styles.item} onClick={hideNavigation}>
            <NavLink to="/all-books">All books</NavLink>
          </li>
          <li className={styles.item} onClick={hideNavigation}>
            <NavLink to="/">Submit Book</NavLink>
          </li>
          <li className={styles.item} onClick={hideNavigation}>
            <NavLink to="/">About</NavLink>
          </li>
        </ul>
      </nav>
      {navigationButtons}
    </div>
  );
};

export default Navigation;
