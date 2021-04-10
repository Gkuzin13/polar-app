import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDQ7KvZKlduIeTLsZF_WRskFalR5DINL2o',
  authDomain: 'reddit-like-app-fb64b.firebaseapp.com',
  databaseURL:
    'https://reddit-like-app-fb64b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'reddit-like-app-fb64b',
  storageBucket: 'reddit-like-app-fb64b.appspot.com',
  messagingSenderId: '70865456722',
  appId: '1:70865456722:web:0e9638d3bc2c769d87598b',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export default db;
