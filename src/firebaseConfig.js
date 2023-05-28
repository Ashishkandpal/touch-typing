import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi-_P0cPYlcM9yi1qpcQJ-ylC79PFnYnY",
  authDomain: "typing-test-d5318.firebaseapp.com",
  projectId: "typing-test-d5318",
  storageBucket: "typing-test-d5318.appspot.com",
  messagingSenderId: "448300402205",
  appId: "1:448300402205:web:87b88432aaad50f086a8f4",
  measurementId: "G-S654Y9V397",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };
