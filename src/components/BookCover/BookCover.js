import styles from './BookCover.module.css';

const BookCover = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      <img
        className={styles.cover}
        src={props.src}
        alt={`${props.alt} book cover`}
      />
    </div>
  );
};

export default BookCover;
