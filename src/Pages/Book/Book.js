import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFirestoreItem } from '../../store/store-actions';
import { useEffect, useState } from 'react';
import BookItem from '../../components/BookItem/BookItem';

const Book = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(fetchFirestoreItem('books', bookId)).then((data) => setData(data));
  }, [dispatch, bookId]);

  return <div>{data && !isLoading && !error && <BookItem book={data} />}</div>;
};

export default Book;
