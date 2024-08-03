// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDv--NjCJu59bFtfH243-gPi0qHxKFnCU4",
    authDomain: "chessjs-42d1e.firebaseapp.com",
    projectId: "chessjs-42d1e",
    storageBucket: "chessjs-42d1e.appspot.com",
    messagingSenderId: "1007244419744",
    appId: "1:1007244419744:web:1b8aa6c20615e93bc35fc5",
    measurementId: "G-55M0MBG0Q7"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
