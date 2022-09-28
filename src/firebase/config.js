import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

const firestoreConfig = {
  apiKey: 'AIzaSyA8P2aTXky5-qc4glMR9Ei2xwrt5UOlKIc',
  authDomain: 'random-pick-f5a38.firebaseapp.com',
  databaseURL: 'https://random-pick-f5a38-default-rtdb.firebaseio.com',
  projectId: 'random-pick-f5a38',
  storageBucket: 'random-pick-f5a38.appspot.com',
  messagingSenderId: '189832921708',
  appId: '1:189832921708:web:deba1afcb766279df98e49',
};

const firebaseConfig = {
  databaseURL: 'https://random-pick-f5a38-default-rtdb.firebaseio.com/',
};

//init firestore
firebase.initializeApp(firestoreConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig, 'firebase');

//init firestore
const projectFirestore = firebase.firestore();
const projectFirebase = firebase.database();

export { projectFirestore, projectFirebase };
