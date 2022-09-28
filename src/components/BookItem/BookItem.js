import BuyLink from '../BuyLinks/BuyLink';
import BuyLinksContainer from '../BuyLinks/BuyLinksContainer';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import { ReactComponent as AmazonSVG } from '../../assets/buy-amazon-books.svg';
import { ReactComponent as AppleSVG } from '../../assets/buy-apple-books.svg';

//Styles
import styles from './BookItem.module.css';

const BookItem = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles['left-container']}>
        <BookCover
          className={styles.cover}
          src={props.book.image}
          alt={`${props.book.title} book cover`}
        />
        <BuyLinksContainer className={styles['buy-links-container']}>
          <BuyLink link={props.book.links.amazon}>
            <AmazonSVG />
          </BuyLink>
          <BuyLink link={props.book.links.apple}>
            <AppleSVG />
          </BuyLink>
        </BuyLinksContainer>
      </div>
      <div className={styles['right-container']}>
        <BookDetails book={props.book} />
      </div>
    </div>
  );
};

export default BookItem;
