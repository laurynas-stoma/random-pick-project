import { uiActions } from './uiStore';
import { projectFirebase, projectFirestore } from '../firebase/config';
import { shuffleArray } from '../util/shuffleArray';

export const fetchFirebaseCollection = (collection) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading({ state: true }));
    const dbRef = projectFirebase.ref();
    try {
      const snapshot = await dbRef.child(collection).get();
      if (!snapshot.exists) {
        console.log('ERROR: No data available in the collection!');
        dispatch(uiActions.setIsLoading({ state: false }));
        return;
      } else {
        let results = [];
        snapshot.forEach((doc) => {
          results.push(doc.val());
        });
        dispatch(uiActions.setIsLoading({ state: false }));
        return results;
      }
    } catch (err) {
      dispatch(uiActions.setError({ error: err.message }));
      dispatch(uiActions.setIsLoading({ state: false }));
    }
  };
};

export const fetchFirestoreCollection = (collection) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading({ state: true }));
    try {
      const snapshot = await projectFirestore.collection(collection).get();
      if (snapshot.empty) {
        console.log('ERROR: No items could be found!');
        dispatch(uiActions.setIsLoading({ state: false }));
        return;
      } else {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({
            ...doc.data(),
          });
        });
        dispatch(uiActions.setIsLoading({ state: false }));
        return results;
      }
    } catch (err) {
      dispatch(uiActions.setError({ error: err.message }));
      dispatch(uiActions.setIsLoading({ state: false }));
    }
  };
};

export const fetchFirestoreItem = (collection, id) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading({ state: true }));
    try {
      const doc = await projectFirestore.collection(collection).doc(id).get();
      if (!doc.exists) {
        console.log('ERROR: The item could not be found!');
        dispatch(uiActions.setIsLoading({ state: false }));
        return;
      } else {
        let results = { id: id, ...doc.data() };
        dispatch(uiActions.setIsLoading({ state: false }));
        return results;
      }
    } catch (err) {
      dispatch(uiActions.setError({ error: err.message }));
      dispatch(uiActions.setIsLoading({ state: false }));
    }
  };
};

export const postFirestoreItem = (collection, id, data) => {
  return (dispatch) => {
    dispatch(uiActions.setIsLoading({ state: true }));
    try {
      projectFirestore.collection(collection).doc(id).set(data);
      dispatch(uiActions.setIsLoading({ state: false }));
    } catch (err) {
      dispatch(uiActions.setError({ error: err.message }));
      dispatch(uiActions.setIsLoading({ state: false }));
    }
  };
};

export const postFirebaseItem = (collection, id, data) => {
  return (dispatch) => {
    dispatch(uiActions.setIsLoading({ state: true }));
    try {
      projectFirebase.ref(`${collection}/${id}`).set(data);
      dispatch(uiActions.setIsLoading({ state: false }));
    } catch (err) {
      dispatch(uiActions.setError({ error: err.message }));
      dispatch(uiActions.setIsLoading({ state: false }));
    }
  };
};

// export const fetchRandomItem = (collection) => {
//   return (dispatch) => {
//     return dispatch(fetchFirebaseCollection(collection)).then(() => {
//       const id = useSelector((state) => state.randomBookSettings.currentItem);
//       dispatch(fetchFirestoreItem(collection, ));
//     });
//   };
// };

export const fetchRandomItem = (collection) => {
  return async (dispatch) => {
    const collectionResult = await dispatch(fetchFirebaseCollection(collection));
    const shuffledArray = shuffleArray(collectionResult);
    const firstItem = shuffledArray[0];
    return firstItem;
  };
};
