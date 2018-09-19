import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUkMIS6dLeGedtF3e9NAjvYVzQJWxJ_KM",
  authDomain: "revents-d9e9a.firebaseapp.com",
  databaseURL: "https://revents-d9e9a.firebaseio.com",
  projectId: "revents-d9e9a",
  storageBucket: "revents-d9e9a.appspot.com",
  messagingSenderId: "61055992546"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;
