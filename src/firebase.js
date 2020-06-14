import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCutTYGaVK6DQCfod2WfGhZIw4VJUSCyrk",
  authDomain: "slack-app-2f207.firebaseapp.com",
  databaseURL: "https://slack-app-2f207.firebaseio.com",
  projectId: "slack-app-2f207",
  storageBucket: "slack-app-2f207.appspot.com",
  messagingSenderId: "959035688353",
  appId: "1:959035688353:web:485ae98e84984abcebb7e0",
  measurementId: "G-DR4WJE720Y",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
