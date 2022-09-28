import { useRef } from 'react';
import './InputBook.css';

const InputBook = () => {
  const titleRef = useRef('');
  const authorRef = useRef('');
  const descriptionRef = useRef('');
  const bookCoverRef = useRef('');
  const amazonRef = useRef('');
  const appleRef = useRef('');
  const categoriesRef = useRef('');
  const yearRef = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();

    const book = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef.current.value,
      bookCover: bookCoverRef.current.value,
      links: { amazon: amazonRef.current.value, apple: appleRef.current.value },
      categories: categoriesRef.current.value.split(', '),
      yearPublished: +yearRef.current.value,
    };

    async function addBookHandler(book) {
      const response = await fetch(
        'https://random-pick-f5a38-default-rtdb.firebaseio.com/books.json',
        {
          method: 'POST',
          body: JSON.stringify(book),
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      console.log(data);
    }

    addBookHandler(book);
  };

  return (
    <div className="form-div">
      <form onSubmit={submitHandler}>
        <div>
          <label>title</label>
          <input ref={titleRef} />
        </div>
        <div>
          <label>author</label>
          <input ref={authorRef} />
        </div>
        <div>
          <label>description</label>
          <textarea ref={descriptionRef}></textarea>
        </div>
        <div>
          <label>bookCover link</label>
          <input ref={bookCoverRef} rows="10" />
        </div>
        <div>
          <label>amazon link</label>
          <input ref={amazonRef} />
        </div>
        <div>
          <label>apple link</label>
          <input ref={appleRef} />
        </div>
        <div>
          <label>categories</label>
          <input ref={categoriesRef} />
        </div>
        <label>year</label>
        <input ref={yearRef} />
        <button>Upload</button>
      </form>
    </div>
  );
};

export default InputBook;
