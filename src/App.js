import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchFirebaseCollection } from './store/store-actions';
import { booksStoreActions } from './store/booksStore';

//Components
import RandomBook from './Pages/RandomBook/RandomBook';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import AllBooks from './Pages/AllBooks/AllBooks';
import InsertItem from './Pages/InputBook/InsertItem';
import Book from './Pages/Book/Book';

//Styles
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const collectionResult = await dispatch(fetchFirebaseCollection('books'));
      let collectionCategories = [];
      collectionResult.map((res) =>
        res.categories.map((categories) =>
          collectionCategories.push(categories)
        )
      );
      const categoriesSet = [...new Set(collectionCategories)];
      dispatch(
        booksStoreActions.setAvailableCategories({ categories: categoriesSet })
      );
    };
    fetchCategories();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <div className="content-wrapper">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/random-book">
            <RandomBook />
          </Route>
          <Route path="/all-books" exact>
            <AllBooks />
          </Route>
          <Route path="/book/:bookId">
            <Book />
          </Route>
          <Route path="/insert" exact>
            <InsertItem />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
