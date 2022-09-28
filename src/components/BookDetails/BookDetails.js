import Pill from '../Pill/Pill';

import styles from './BookDetails.module.css';

const BookDetails = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{props.book.title}</h1>
      <h2 className={styles.author}>By {props.book.author}</h2>
      <ul className={styles.categories}>
        {props.book.categories.map((category, idx) => (
          <Pill key={idx} className={styles.category}>
            {category}
          </Pill>
        ))}
      </ul>
      <div className={styles.description}>
        {props.book.description.split('\\n').map((item, index) => {
          return (
            <p key={index} className={styles.paragrah}>
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default BookDetails;
