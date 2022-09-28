import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { postFirebaseItem, postFirestoreItem } from '../../store/store-actions';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input/Input';
import classes from './InsertItem.module.css';

const InsertItem = () => {
  const titleRef = useRef();
  const authorRef = useRef();
  const yearRef = useRef();
  const urlRef = useRef();
  const categoriesRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const uuid = uuidv4();
    let firestoreItem;
    let firebaseItem;
    if (
      titleRef.current.value.length > 0 &&
      authorRef.current.value.length > 0 &&
      yearRef.current.value.length > 0 &&
      urlRef.current.value.length > 0 &&
      categoriesRef.current.value.length > 0 &&
      descriptionRef.current.value.length > 0
    ) {
      firestoreItem = {
        id: uuid,
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: +yearRef.current.value,
        image: urlRef.current.value,
        isPublished: false,
        categories: categoriesRef.current.value
          .split(',')
          .map((item) => item.trim()),
        links: { amazon: '/', apple: '/' },
        description: descriptionRef.current.value,
      };

      firebaseItem = {
        id: uuid,
        year: +yearRef.current.value,
        categories: categoriesRef.current.value
          .split(',')
          .map((item) => item.trim()),
        isPublished: false,
      };

      titleRef.current.value = null;
      authorRef.current.value = null;
      yearRef.current.value = null;
      urlRef.current.value = null;
      categoriesRef.current.value = null;
      descriptionRef.current.value = null;
    }

    dispatch(postFirestoreItem('books', uuid, firestoreItem));
    dispatch(postFirebaseItem('books', uuid, firebaseItem));
  };

  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <div className={classes['input-wrapper']}>
          <label className={classes['label']}>Title</label>
          <Input className={classes['input']} ref={titleRef} />
        </div>
        <div className={classes['input-wrapper']}>
          <label className={classes['label']}>Author</label>
          <Input className={classes['input']} ref={authorRef} />
        </div>
        <div className={classes['input-wrapper']}>
          <label className={classes['label']}>Publish Year</label>
          <Input className={classes['input']} ref={yearRef} type="number" />
        </div>
        <div className={classes['input-wrapper']}>
          <label className={classes['label']}>Cover URL</label>
          <Input className={classes['input']} ref={urlRef} />
        </div>
        <div className={classes['input-wrapper']}>
          <label className={classes['label']}>Categories</label>
          <Input className={classes['input']} ref={categoriesRef} />
        </div>
        <div className={classes['input-wrapper']}>
          <label className={classes['label']}>Description</label>
          <textarea
            className={classes['text-area']}
            rows="5"
            ref={descriptionRef}
          />
        </div>
        <button
          className={`${classes['button--primary']} ${classes['button']}`}
          onClick={formSubmitHandler}
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default InsertItem;
