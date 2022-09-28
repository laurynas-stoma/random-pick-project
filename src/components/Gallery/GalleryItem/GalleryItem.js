import BookCover from '../../BookCover/BookCover';

import styles from './GalleryItem.module.css';

const GalleryItem = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <BookCover src={props.image} alt={props.title} />
      </div>
      <div className={styles.details}>
        <h4 className={styles.title}>{props.title}</h4>
        <p className={styles.subtitle}>{props.subtitle}</p>
      </div>
    </div>
  );
};

export default GalleryItem;