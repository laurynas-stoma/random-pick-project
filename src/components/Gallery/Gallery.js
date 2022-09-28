import styles from './Gallery.module.css';

const Gallery = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Gallery;
