import { Link } from 'react-router-dom';
import styles from './DiscoverBanner.module.css';

const DiscoverBanner = (props) => {
  return (
    <div className={styles.container}>
      {props.text}{' '}
      <span className={styles.link}>
        <Link to={props.linkTo}>{props.ctaText}</Link>
      </span>
    </div>
  );
};

export default DiscoverBanner;
