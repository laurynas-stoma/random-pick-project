import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={`${styles.header} ${styles.scrolled}`}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <NavLink to="/">
            Random<span>Pick</span>
          </NavLink>
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
