import { useSelector } from 'react-redux';

//Components
import { FiSettings } from 'react-icons/fi';

//Styles
import styles from './BookBottomNav.module.css';

const BookBottomNav = (props) => {
  const collection = useSelector((state) => state.randomBook.collection);
  const currentItem = useSelector((state) => state.randomBook.currentItem);

  const changeItem = (type) => {
    const collectionLength = collection.length;
    const currentItemID = currentItem.id;
    const currentItemIdx = collection.findIndex(
      (item) => item.id === currentItemID
    );

    let newItemIdx;
    let newItemId;

    if (type === 'PREVIOUS_BOOK') {
      if (currentItemIdx === 0) {
        return currentItemID;
      } else {
        newItemIdx = currentItemIdx - 1;
        newItemId = collection[newItemIdx].id;
      }
      return newItemId;
    }
    if (type === 'NEXT_BOOK') {
      if (currentItemIdx === collectionLength - 1) {
        newItemIdx = 0;
        newItemId = collection[newItemIdx].id;
      } else {
        newItemIdx = currentItemIdx + 1;
        newItemId = collection[newItemIdx].id;
      }
      return newItemId;
    }
  };

  const clickNextBtn = () => {
    const newId = changeItem('NEXT_BOOK');
    props.onClickNext(newId);
  };

  const clickPreviousBtn = () => {
    const newId = changeItem('PREVIOUS_BOOK');
    props.onClickPrevious(newId);
  };

  const clickSettingsBtn = () => {
    props.onClickSettings('SETTINGS_OPEN');
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles['btn-previous']} onClick={clickPreviousBtn}>
          Previous
        </button>
        <button className={styles['btn-next']} onClick={clickNextBtn}>
          Next Pick
        </button>
      </div>
      <div className={styles.settings}>
        <button className={styles['btn-settings']} onClick={clickSettingsBtn}>
          <FiSettings className={styles['settings-icon']} />
        </button>
      </div>
    </div>
  );
};

export default BookBottomNav;
