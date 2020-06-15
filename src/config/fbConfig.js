import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBpvGVf8JNO7QtsSni4c_yaqzS3VFRHVnc",
    authDomain: "cinemaproject-aab7e.firebaseapp.com",
    databaseURL: "https://cinemaproject-aab7e.firebaseio.com",
    projectId: "cinemaproject-aab7e",
    storageBucket: "cinemaproject-aab7e.appspot.com",
    messagingSenderId: "936067587942",
    appId: "1:936067587942:web:df2a0947b9172338e172a7",
    measurementId: "G-7NZWGZ2LB6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//   firebase.analytics();

  export default firebase;